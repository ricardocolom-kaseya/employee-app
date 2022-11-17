import React, { useState, useEffect } from 'react'
import { Avatar, Box, Text, HStack, VStack, Heading, AvatarBadge, Input, Code, Button, Tooltip, Icon, IconButton, Switch, Divider, useDisclosure, Select, Textarea, useToast, useColorMode, useColorModeValue, LightMode } from '@chakra-ui/react'
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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
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
import { MdSave, MdBadge, MdPerson, MdEmail, MdAddCircle, MdDelete } from 'react-icons/md'

import { faker } from '@faker-js/faker';

import validator from 'validator'

import KaseyaLogoSmall from "../assets/kaseya-logo-small.png"

import AddNewEmployeeButton from './AddNewEmployeeButton'
import ViewEditSkillsButton from './ViewEditSkillsButton'

const font1 = 'Inter';

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

export default function ControlPanel({ employees, changeEmployees, skills, changeSkills }) {

    const { colorMode, toggleColorMode } = useColorMode()

    let toEmployees = employees
    let toSkills = skills

    const addDummyEmployee = () => {
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

        fetch("http://localhost:4000/createemployee", {
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

            fetch("http://localhost:4000/deleteallemployees").then(
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

            fetch("http://localhost:4000/deleteallskills").then(
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

    return (
        <VStack w="100%" h="100%" shadow="md" bg={primary}>
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
            <VStack py="9">
                <Avatar size="lg" label="Admin" />
                <Heading fontSize="2xl" fontFamily={font1}>
                    Admin
                </Heading>
            </VStack>
            <Divider w="90%" />
            <VStack align="left" w="100%" px="4">
                <VStack w="100%">
                    <AddNewEmployeeButton employees={[...employees]} changeEmployees={changeEmployees} skills={[...skills]} />
                    <ViewEditSkillsButton skills={skills} changeSkills={changeSkills} />
                </VStack>
                <Button onClick={() => { addDummyEmployee() }}>Add dummy employee</Button>
                <Heading fontSize="2xl" fontFamily={font1} py="4">
                    Controls
                </Heading>
                <VStack w="100%" spacing="220px">
                    <VStack w="100%">
                        <FormControl w="100%">
                            <Input fontFamily="Inter" type="search" placeholder="Search..." />
                        </FormControl>
                        <Menu>
                            <MenuButton w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter" as={Button} variant="outline" rightIcon={<ChevronDownIcon />}>
                                Sort by...
                            </MenuButton>
                            <MenuList>
                                <MenuItem>One</MenuItem>
                                <MenuItem>Two</MenuItem>
                                <MenuItem>Three</MenuItem>
                                <MenuItem>Four</MenuItem>
                            </MenuList>
                        </Menu>
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
