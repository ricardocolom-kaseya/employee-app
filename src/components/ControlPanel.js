import React, { useState } from 'react'
import { Avatar, Select, Text, HStack, VStack, Heading, Input, Button, Icon, IconButton, Divider, useDisclosure, useColorMode, useColorModeValue, LightMode, ButtonGroup, InputGroup, InputLeftElement, useToast, Box, CloseButton } from '@chakra-ui/react'
import {
    FormControl,
} from '@chakra-ui/react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import { SearchIcon, SunIcon, WarningIcon } from '@chakra-ui/icons'
import { MdHelp, MdOutlineLogout, MdHistory } from 'react-icons/md'
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs"

import { useNavigate } from 'react-router-dom'


import { faker } from '@faker-js/faker';

import AddNewEmployeeButton from './AddNewEmployeeButton'
import ViewEditSkillsButton from './ViewEditSkillsButton'

const font1 = 'Inter';

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

export default function ControlPanel({
    token,
    changeToken,
    changeSearch,
    changeSearchSkill,
    changeSortAsc,
    employees,
    changeEmployees,
    skills,
    changeSkills }) {

    const navigate = useNavigate();
    const toast = useToast();

    const { colorMode, toggleColorMode } = useColorMode()

    const [panelSortAsc, changePanelSortAsc] = useState(true)
    const [panelSearch, changePanelSearch] = useState("");
    const [panelSearchSkill, changePanelSearchSkill] = useState("")

    function goPressed() {
        changeSearch(panelSearch)
        changeSearchSkill(panelSearchSkill)
        changeSortAsc(panelSortAsc)
    }

    let toEmployees = employees
    let toSkills = skills
    const AddDummyEmployee = () => {
        // console.log("Adding dummy employee")

        let f_name = faker.name.firstName()
        let l_name = faker.name.lastName()
        let dob = faker.date.birthdate()
        let yyyy = dob.getFullYear()
        let mm = ((dob.getMonth() + 1) < 10) ? `0${dob.getMonth() + 1}` : dob.getMonth() + 1
        let dd = (dob.getDate() < 10) ? `0${dob.getDate()}` : dob.getDate()
        let email = faker.internet.email(f_name, l_name)
        let skill_id = (skills[randomInt(skills.length)]).skill_id
        let is_active = Math.round(Math.random())

        // If either name contains an apostrophe, "double up" the apostrophe
        f_name = f_name.replace("'", "''")
        l_name = l_name.replace("'", "''")

        let employee = { f_name, l_name, yyyy, mm, dd, email, skill_id, is_active }
        let body = { employee }

        // console.log("Attempting to create " + f_name + " " + l_name + "...")

        fetch("http://localhost:4000/employees", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        }).then(
            response => {
                if (response.status != 200)
                    throw new Error(response.status)
                console.log("POST /employees Status Code: " + response.status);
                return response.json()
            }
        ).then(
            data => {
                let newEmployee = {
                    employee_id: data, f_name, l_name, dob, email, skill_id, is_active
                }

                let toEmployees = [...employees]

                toEmployees.push(newEmployee)
                changeEmployees(toEmployees);
            }
        ).catch((err) => {
            if (!toast.isActive('sessionExpiredToast')) {
                toast({
                    id: 'sessionExpiredToast',
                    render: () => (
                        <Box color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="red.500">
                            <HStack position="relative" align="center" minH="26px">
                                <WarningIcon w={5} h={5} m="0.5" />
                                <Text fontWeight="bold" fontSize="md" fontFamily="Inter" pr="8">
                                    Session Expired. Log out.
                                </Text>
                                <CloseButton size="sm" pos="absolute" right="-8px" top="-8px" onClick={() => toast.closeAll()} />
                            </HStack>
                        </Box>
                    ), status: 'error', duration: 3000
                })
            }
        })
    }

    const DeleteAllEmployeesButton = () => {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const cancelRef = React.useRef()

        const handleDeleteAllEmployees = () => {

            // console.log("Going to delete all employees... ");

            fetch("http://localhost:4000/employees", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }).then(
                response => {
                    if (response.status != 200)
                        throw new Error(response.status)
                    console.log("DELETE /employees Status Code: " + response.status);
                    return response.json()
                }
            ).then(
                data => {
                    // console.log(data);
                    toEmployees = [];
                    onClose();
                }
            ).catch((err) => {
                if (!toast.isActive('sessionExpiredToast')) {
                    toast({
                        id: 'sessionExpiredToast',
                        render: () => (
                            <Box color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="red.500">
                                <HStack position="relative" align="center" minH="26px">
                                    <WarningIcon w={5} h={5} m="0.5" />
                                    <Text fontWeight="bold" fontSize="md" fontFamily="Inter" pr="8">
                                        Session Expired. Please log out.
                                    </Text>
                                    <CloseButton size="sm" pos="absolute" right="-8px" top="-8px" onClick={() => toast.closeAll()} />
                                </HStack>
                            </Box>
                        ), status: 'error', duration: 3000
                    })
                }
            })
        }

        return (
            <>
                <LightMode>
                    <Button colorScheme="red" onClick={onOpen} w="100%">
                        <Text w="100%" textAlign="center" fontWeight="normal" fontFamily="Inter">
                            Delete All Employees
                        </Text>
                    </Button>
                </LightMode>
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isCentered
                    motionPreset="slideInBottom"
                    preserveScrollBarGap
                    onCloseComplete={() => { changeEmployees(toEmployees) }}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='medium'>
                                Delete All Employees
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                <Text>Are you sure you would like to delete <strong>all employees</strong>?</Text>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <LightMode>
                                    <Button colorScheme='red' onClick={handleDeleteAllEmployees} ml={3}>
                                        Delete All
                                    </Button>
                                </LightMode>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </>
        )
    }

    const DeleteAllSkillsButton = () => {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const cancelRef = React.useRef()

        const handleDeleteAllSkills = () => {

            console.log("Going to delete all skills... ");

            fetch("http://localhost:4000/skills", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }).then(
                response => {
                    if (response.status != 200)
                        throw new Error(response.status)
                    console.log("DELETE /skills Status Code: " + response.status);
                    return response.json()
                }
            ).then(
                data => {
                    // console.log(data);
                    toSkills = [];
                    onClose();
                }
            ).catch((err) => {
                if (!toast.isActive('sessionExpiredToast')) {
                    toast({
                        id: 'sessionExpiredToast',
                        render: () => (
                            <Box color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="red.500">
                                <HStack position="relative" align="center" minH="26px">
                                    <WarningIcon w={5} h={5} m="0.5" />
                                    <Text fontWeight="bold" fontSize="md" fontFamily="Inter" pr="8">
                                        Session Expired. Log out.
                                    </Text>
                                    <CloseButton size="sm" pos="absolute" right="-8px" top="-8px" onClick={() => toast.closeAll()} />
                                </HStack>
                            </Box>
                        ), status: 'error', duration: 3000
                    })
                }
            })
        }

        return (
            <>
                <LightMode>
                    <Button colorScheme="red" onClick={onOpen} w="100%">
                        <Text w="100%" textAlign="center" fontWeight="normal" fontFamily="Inter">
                            Delete All Skills
                        </Text>
                    </Button>
                </LightMode>
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isCentered
                    motionPreset="slideInBottom"
                    preserveScrollBarGap
                    onCloseComplete={() => { changeSkills(toSkills) }}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='medium'>
                                Delete All Skills
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                <Text>Are you sure you would like to delete <strong>all skills</strong>?</Text>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <LightMode>
                                    <Button colorScheme='red' onClick={handleDeleteAllSkills} ml={3}>
                                        Delete All
                                    </Button>
                                </LightMode>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </>
        )
    }

    const primary = useColorModeValue('white', 'gray.800')

    const LogOutButton = () => {

        const { isOpen, onOpen, onClose } = useDisclosure()
        const cancelRef = React.useRef()

        const [willLogOut, changeWillLogOut] = useState(false)

        function doLogOut() {
            changeWillLogOut(true);
            setTimeout(function () { navigate("/") }, 1000)
        }

        return (
            <>

                <LightMode>
                    <Button variant="link" size="sm" colorScheme="red" rightIcon={<MdOutlineLogout />} onClick={onOpen}>
                        Log out
                    </Button>
                </LightMode>
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isCentered
                    motionPreset="slideInBottom"
                    preserveScrollBarGap
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='medium'>
                                Log out
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                <Text>Are you sure you would like to <strong>log out</strong>?</Text>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <LightMode>
                                    <Button colorScheme='red' ml={3} isLoading={willLogOut} onClick={() => { doLogOut() }}>
                                        Log out
                                    </Button>
                                </LightMode>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </>
        )
    }

    const handleChangeSkill = () => {
        let dropDownIndex = document.getElementById("panelSkillsDropDown").selectedIndex;
        if (dropDownIndex != 0)
            changePanelSearchSkill(skills[dropDownIndex - 1].skill_id);
        else
            changePanelSearchSkill("");
    }

    function resetSearch() {
        changePanelSearchSkill("")
        changePanelSearch("")
        changePanelSortAsc("ASC")

        changeSearch("")
        changeSearchSkill("")
        changeSortAsc("ASC")
    }

    return (
        <VStack pos="fixed" right="0" w="320px" h="100vh" bg={primary}>
            <HStack w="100%" p="2" justify="right">
                <HStack>
                    <IconButton icon={<SunIcon />} onClick={toggleColorMode} variant="outline" />
                </HStack>
            </HStack>
            <VStack py="9" spacing="1">
                <VStack>
                    <Avatar size="lg" label="Admin" />
                    <Heading fontSize="2xl" fontFamily={font1}>
                        Admin
                    </Heading>
                </VStack>
                <LogOutButton />
            </VStack>
            <Divider w="90%" />
            <VStack align="left" w="100%" px="6" h="100%" justify="space-between">
                <VStack w="100%" align="end">
                    <Heading fontSize="2xl" fontFamily={font1} py="4" w="100%" textAlign="left">
                        Controls
                    </Heading>
                    <HStack w="100%">
                        <FormControl w="100%">
                            <InputGroup>
                                <InputLeftElement children={<SearchIcon />} />
                                <Input fontFamily="Inter" type="search" placeholder="Name..." value={panelSearch}
                                    onChange={(e) => changePanelSearch(e.target.value)} />
                            </InputGroup>
                        </FormControl>
                    </HStack>
                    <HStack w="100%">
                        <Select placeholder="Any skill" id="panelSkillsDropDown" onChange={handleChangeSkill}>
                            {skills.map((skill, i) => {
                                return (<option key={i}>{skill.skill_name}</option>)
                            })}
                        </Select>
                        <ButtonGroup isAttached variant="outline" w="122px">
                            <IconButton variant={panelSortAsc ? "solid" : "outline"} icon={<Icon as={BsSortAlphaDown} w={6} h={6} />} onClick={() => changePanelSortAsc(true)} />
                            <IconButton variant={!panelSortAsc ? "solid" : "outline"} icon={<Icon as={BsSortAlphaDownAlt} w={6} h={6} />} onClick={() => { changePanelSortAsc(false) }} />
                        </ButtonGroup>
                    </HStack>
                    <HStack justify="space-between" w="100%">
                        <LightMode>
                            <Button colorScheme="red" w="100%" onClick={() => resetSearch()}>
                                Reset Search
                            </Button>
                        </LightMode>
                        <Button w="100%" variant="solid" onClick={() => { goPressed() }}>
                            Search
                        </Button>
                    </HStack>
                </VStack>
                <VStack w="100%" pb="56">
                    <AddNewEmployeeButton token={token} employees={[...employees]} changeEmployees={changeEmployees} skills={[...skills]} />
                    <Button variant="outline" pos="relative" rightIcon={<Icon as={MdHelp} w={6} h={6} />} onClick={() => AddDummyEmployee()} w="100%">
                        <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                            Add a dummy employee
                        </Text>
                    </Button>
                    <ViewEditSkillsButton token={token} skills={skills} changeSkills={changeSkills} />
                </VStack>
                <VStack w="100%" spacing="2" pb="8">
                    <Button variant="outline" w="100%" rightIcon={<Icon as={MdHistory} w={6} h={6} />} onClick={() => changeToken("none")}>
                        <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">Force invalidate JWT</Text>
                    </Button>
                    <DeleteAllEmployeesButton />
                    <DeleteAllSkillsButton />
                </VStack>
            </VStack>
        </VStack>
    )
}
