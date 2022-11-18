import React, { useState, useEffect } from 'react'
import { Avatar, Box, Text, HStack, VStack, Heading, Input, Button, Icon, IconButton, Switch, Divider, useDisclosure, useColorMode, useColorModeValue, LightMode, ButtonGroup, InputGroup, InputLeftElement } from '@chakra-ui/react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, SearchIcon, SunIcon, MoonIcon, ChevronDownIcon, CheckIcon } from '@chakra-ui/icons'
import { MdSave, MdBadge, MdPerson, MdEmail, MdAddCircle, MdHelp, MdOutlineLogout } from 'react-icons/md'
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs"


import { faker } from '@faker-js/faker';

import validator from 'validator'

import KaseyaLogoSmall from "../assets/kaseya-logo-small.png"

import AddNewEmployeeButton from './AddNewEmployeeButton'
import ViewEditSkillsButton from './ViewEditSkillsButton'

const font1 = 'Inter';

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

export default function ControlPanel({
    setAuth,
    changeSearch,
    changeSortAsc,
    employees,
    changeEmployees,
    skills,
    changeSkills }) {

    const { colorMode, toggleColorMode } = useColorMode()

    const [panelSortAsc, changePanelSortAsc] = useState(true)
    const [panelSearch, changePanelSearch] = useState("");

    function goPressed() {
        changeSortAsc(panelSortAsc);
        changeSearch(panelSearch);
    }

    useEffect(() => { console.log(panelSearch) }, [panelSearch])

    let toEmployees = employees
    let toSkills = skills

    const AddDummyEmployee = () => {
        console.log("Adding dummy employee")

        let employee_id = faker.datatype.uuid();
        let f_name = faker.name.firstName();
        let l_name = faker.name.lastName();
        let dob = faker.date.birthdate();
        let yyyy = dob.getFullYear()
        let mm = ((dob.getMonth() + 1) < 10) ? `0${dob.getMonth() + 1}` : dob.getMonth() + 1
        let dd = (dob.getDate() < 10) ? `0${dob.getDate()}` : dob.getDate()
        let email = faker.internet.email(f_name, l_name)
        let skill_id = (skills[randomInt(skills.length)]).skill_id
        let is_active = Math.round(Math.random())

        // If either name contains an apostrophe, "double up" the apostrophe
        f_name = f_name.replace("'", "''")
        l_name = l_name.replace("'", "''")

        console.log("Attempting to create " + f_name + " " + l_name + "...")

        fetch("http://localhost:4000/employees", {
            method: 'POST',
            headers: {
                'employee_id': employee_id,
                'f_name': f_name,
                'l_name': l_name,
                'yyyy': yyyy,
                'mm': mm,
                'dd': dd,
                'email': email,
                'skill_id': skill_id,
                'is_active': is_active
            }
        }).then(
            response => response.json()
        ).then(
            data => {
                let newEmployee = data
                newEmployee[0].dob = new Date(dob);

                let toEmployees = [...employees]

                toEmployees.push(newEmployee[0])
                changeEmployees(toEmployees);
            }
        )
    }

    const DeleteAllEmployeesButton = () => {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const cancelRef = React.useRef()

        const handleDeleteAllEmployees = () => {

            console.log("Going to delete all employees... ");

            fetch("http://localhost:4000/employees", {
                headers: {
                    delete_all: "true"
                }
            }).then(
                response => response.json()
            ).then(
                data => {
                    console.log(data);
                    toEmployees = [];
                    onClose();
                }
            )
        }

        return (
            <>
                <LightMode>
                    <Button colorScheme="red" my="2" onClick={onOpen} w="100%">
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
                headers: {
                    delete_all: "true"
                }
            }).then(
                response => response.json()
            ).then(
                data => {
                    console.log(data);
                    toSkills = [];
                    onClose();
                }
            )
        }

        return (
            <>
                <LightMode>
                    <Button colorScheme="red" onClick={onOpen} w="100%" my="2">
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
    const secondary = useColorModeValue('gray.200', 'gray.700')

    const LogOutButton = () => {

        const { isOpen, onOpen, onClose } = useDisclosure()
        const cancelRef = React.useRef()

        const [willLogOut, changeWillLogOut] = useState(false)

        return (
            <>

                <LightMode>
                    <Button variant="link" size="xs" colorScheme="red" color="red.500" rightIcon={<MdOutlineLogout />} onClick={onOpen}>
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
                    onCloseComplete={() => {
                        if (willLogOut)
                            setAuth(false)
                    }}
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
                                    <Button colorScheme='red' ml={3} onClick={() => { changeWillLogOut(true); onClose() }}>
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

    return (
        <VStack w="100%" h="100%" bg={primary}>
            <HStack w="100%" p="2" justify="right">
                <HStack>
                    <SunIcon />
                    <LightMode>
                        <Switch
                            colorScheme="blackAlpha"
                            defaultValue={colorMode}
                            onChange={() => { setTimeout(function () { toggleColorMode() }, 100) }}
                            sx={{ 'span.chakra-switch__track:not([data-checked])': { backgroundColor: 'blackAlpha.500' } }}
                            border="1px" borderRadius="2xl" borderColor="whiteAlpha.500" />
                    </LightMode>
                    <MoonIcon />
                </HStack>
            </HStack>
            <VStack py="9" spacing="0">
                <VStack>
                    <Avatar size="lg" label="Admin" />
                    <Heading fontSize="2xl" fontFamily={font1}>
                        Admin
                    </Heading>
                </VStack>
                <LogOutButton />
            </VStack>
            <Divider w="90%" />
            <VStack align="left" w="100%" px="4">
                <VStack w="100%">
                    <AddNewEmployeeButton employees={[...employees]} changeEmployees={changeEmployees} skills={[...skills]} />
                    <Button variant="outline" pos="relative" rightIcon={<Icon as={MdHelp} w={6} h={6} />} onClick={() => AddDummyEmployee()} w="100%">
                        <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                            Add a dummy employee
                        </Text>
                    </Button>
                    <ViewEditSkillsButton skills={skills} changeSkills={changeSkills} />
                </VStack>
                <Heading fontSize="2xl" fontFamily={font1} py="4">
                    Controls
                </Heading>
                <VStack w="100%" spacing="220px">
                    <VStack w="100%" align="end">
                        <HStack w="100%">
                            <FormControl w="100%">
                                <InputGroup>
                                    <InputLeftElement children={<SearchIcon />} />
                                    <Input fontFamily="Inter" type="search" placeholder="Search..."
                                        onChange={(e) => changePanelSearch(e.target.value)} />
                                </InputGroup>
                            </FormControl>
                        </HStack>
                        <HStack w="100%">
                            <Menu>
                                <MenuButton w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter" as={Button} variant="outline" rightIcon={<ChevronDownIcon />}>
                                    Skill
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>All</MenuItem>
                                    <MenuItem>Two</MenuItem>
                                    <MenuItem>Three</MenuItem>
                                    <MenuItem>Four</MenuItem>
                                </MenuList>
                            </Menu>
                            <ButtonGroup isAttached variant="outline" w="122px">
                                <IconButton variant={panelSortAsc ? "solid" : "outline"} icon={<Icon as={BsSortAlphaDown} w={6} h={6} />} onClick={() => changePanelSortAsc(true)} />
                                <IconButton variant={!panelSortAsc ? "solid" : "outline"} icon={<Icon as={BsSortAlphaDownAlt} w={6} h={6} />} onClick={() => { console.log("GO"); changePanelSortAsc(false) }} />
                            </ButtonGroup>
                        </HStack>
                        <Button w="80px" variant="solid" onClick={() => { goPressed() }}>
                            Go
                        </Button>
                    </VStack>
                    <VStack w="100%" spacing="0">
                        <DeleteAllEmployeesButton />
                        <DeleteAllSkillsButton />
                    </VStack>
                </VStack>
            </VStack>
        </VStack>
    )
}
