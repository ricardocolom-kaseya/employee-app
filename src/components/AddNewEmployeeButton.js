import React, { useState, useEffect } from 'react'
import { Avatar, Box, Text, HStack, VStack, CloseButton, LightMode, Input, Code, Button, Tooltip, Icon, IconButton, Switch, Divider, useDisclosure, Select, Textarea, useToast } from '@chakra-ui/react'
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
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'
import { MdSave, MdBadge, MdPerson, MdEmail, MdAddCircle, MdDelete } from 'react-icons/md'

import { faker } from '@faker-js/faker';

import validator from 'validator'

import KaseyaLogoSmall from "../assets/kaseya-logo-small.png"

import { NameHeader, EmailHeader, DOBHeader, SkillsHeader, ActivityHeader } from './ModalHeaders'

const font1 = 'Inter';

const today = new Date();

const GetAge = (dob) => {
    const today = new Date();

    const currAge = (today - dob) / 31536000000;
    return Math.floor(currAge);
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

export default function AddNewEmployeeButton({ employees, changeEmployees, skills }) {

    const toast = useToast();

    const id = 'addEmployeeToast'

    let toEmployees = [...employees]

    const { isOpen, onOpen, onClose } = useDisclosure()

    const AddNewEmployeeModalContent = () => {
        const [firstName, changeFirstName] = useState("");
        const [lastName, changeLastName] = useState("");
        const [email, changeEmail] = useState("");
        const [birthday, changeBirthday] = useState(0);
        const [skill, changeSkill] = useState("");
        const [activity, changeActivity] = useState(1);

        const [firstNameValid, changeFirstNameValid] = useState(false);
        const [lastNameValid, changeLastNameValid] = useState(false);
        const [emailValid, changeEmailValid] = useState(false);
        const [birthdayValid, changeBirthdayValid] = useState(false);

        const handleChangeFirstName = (theFirstName) => {
            changeFirstNameValid(validator.isAlpha(theFirstName.replace(/'/g, "")) && theFirstName.slice(-1) != "'")
            changeFirstName(theFirstName)
        }

        const handleChangeLastName = (theLastName) => {
            changeLastNameValid(validator.isAlpha(theLastName.replace(/'/g, "")) && theLastName.slice(-1) != "'")
            changeLastName(theLastName)
        }

        const handleChangeEmail = (theEmail) => {
            changeEmailValid(validator.isEmail(theEmail))
            changeEmail(theEmail)
        }

        const handleChangeDate = (date) => {
            let theDate = new Date(date);
            if (!isNaN(theDate) && !(GetAge(theDate) < 18)) {
                changeBirthdayValid(true)
                changeBirthday(date)
            }
            else {
                console.log("Date is invalid")
                changeBirthday(0)
                changeBirthdayValid(false)
            }
        }

        const handleChangeSkill = () => {
            var index = document.getElementById("skillsDropDown").selectedIndex;
            changeSkill(skills[index]);
        }

        const handleChangeActivity = () => {
            if (activity)
                changeActivity(0);
            else
                changeActivity(1);
        }

        function allValid() {

            console.log("firstName: " + firstNameValid)
            console.log("lastName: " + lastNameValid)
            console.log("email: " + emailValid)
            console.log("birthday: " + birthdayValid)


            return (firstNameValid && lastNameValid && emailValid && birthdayValid)
        }

        const handleAddEmployee = () => {

            if (allValid()) {
                // Selecting the last skill dropdown returns an error "Cannot read properties of undefined (reading 'skill_id')"

                let employee_id = faker.datatype.uuid();

                const toDate = new Date(birthday)

                let yyyy = toDate.getFullYear();
                let mm = ((toDate.getMonth() + 1) < 10) ? `0${toDate.getMonth() + 1}` : toDate.getMonth() + 1
                let dd = (toDate.getDate() < 10) ? `0${toDate.getDate()}` : toDate.getDate()

                // If either name contains an apostrophe, "double up" the apostrophe
                let f_name = firstName.replace("'", "''")
                let l_name = lastName.replace("'", "''")

                f_name = f_name.charAt(0).toUpperCase() + f_name.slice(1);
                l_name = l_name.charAt(0).toUpperCase() + l_name.slice(1);

                console.log("Attempting to add " + f_name + " " + l_name + "...")

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
                        'skill_id': skill.skill_id,
                        'is_active': activity
                    }
                }).then(
                    response => response.json()
                ).then(
                    data => {
                        // data variable is SELECT * FROM employees
                        // change data to be only this employee.
                        console.log("Added this employee")
                        let newEmployee = data
                        newEmployee[0].dob = new Date(birthday);
                        toEmployees.push(newEmployee[0])
                        changeEmployees(toEmployees);
                    }
                )

                toast({
                    render: () => (
                        <Box m={3} color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="green.500">
                            <HStack position="relative" align="center" minH="26px">
                                <CheckCircleIcon w={5} h={5} m="0.5" />
                                <Text fontWeight="bold" fontSize="md" fontFamily="Inter" pr="8">
                                    Saved
                                </Text>
                                <CloseButton size="sm" pos="absolute" right="-8px" top="-8px" onClick={() => toast.closeAll()} />
                            </HStack>
                        </Box>
                    ), status: 'error', duration: 3000
                })

                onClose();
            }
            else {
                if (!toast.isActive(id)) {
                    toast({
                        id,
                        render: () => (
                            <Box m={3} color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="red.500">
                                <HStack position="relative" align="center" minH="26px">
                                    <WarningIcon w={5} h={5} m="0.5" />
                                    <Text fontWeight="bold" fontSize="md" fontFamily="Inter" pr="8">
                                        Please fix any empty or invalid fields
                                    </Text>
                                    <CloseButton size="sm" pos="absolute" right="-8px" top="-8px" onClick={() => toast.closeAll()} />
                                </HStack>
                            </Box>
                        ), status: 'error', duration: 3000
                    })
                }
            }

        }

        return (
            <ModalContent >
                <ModalHeader fontFamily="Inter" fontWeight="medium">Add a new employee</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack spacing="8">
                        <VStack spacing="8" w="1200px" h="328px">
                            <VStack spacing="0" w="100%">
                                <FormControl isRequired isInvalid={(!firstNameValid && firstName.length > 0)}>
                                    <NameHeader />
                                    <Input placeholder="First name" onChange={(e) => { handleChangeFirstName(e.target.value) }} mb="2" />
                                </FormControl>
                                <FormControl isRequired isInvalid={(!lastNameValid && lastName.length > 0)}>
                                    <Input placeholder="Last name" onChange={(e) => { handleChangeLastName(e.target.value) }} />
                                </FormControl>
                            </VStack>
                            <FormControl isRequired mt="8" isInvalid={(!emailValid && email.length > 0)}>
                                <EmailHeader />
                                <Input placeholder="Email" type="email" onChange={(e) => { handleChangeEmail(e.target.value) }} />
                            </FormControl>
                            <FormControl isRequired mt="8">
                                <DOBHeader />
                                <Input type="date" onChange={(e) => { handleChangeDate(e.target.value) }} />
                            </FormControl>
                        </VStack>
                        <VStack w="1200px" h="328px">
                            <VStack w="100%" spacing="0" justify="left">
                                <ActivityHeader />
                                <HStack w="100%" justify="center">
                                    <Text>Inactive</Text>
                                    <LightMode>
                                        <Switch isChecked={activity} onChange={handleChangeActivity} size="lg" colorScheme="green" sx={{ 'span.chakra-switch__track:not([data-checked])': { backgroundColor: 'red.500' } }} />
                                    </LightMode>
                                    <Text>Active</Text>
                                </HStack>
                            </VStack>
                            <FormControl isRequired pt="8">
                                <SkillsHeader />
                                <Select placeholder="Choose a skill" id="skillsDropDown" onChange={handleChangeSkill}>
                                    {skills.map((skill, i) => {
                                        return (<option key={i}>{skill.skill_name}</option>)
                                    })}
                                </Select>
                            </FormControl>
                        </VStack>
                    </HStack>
                </ModalBody>
                <ModalFooter>
                    <HStack>
                        <Button onClick={onClose} fontFamily="Inter" fontWeight="medium">Cancel</Button>
                        <LightMode>
                            <Button colorScheme="green" my="4" rightIcon={<Icon as={MdAddCircle} w={4} h={4} />} onClick={handleAddEmployee}>
                                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                                    Add
                                </Text>
                            </Button>
                        </LightMode>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        )
    }

    return (
        <>
            <Button variant="outline" rightIcon={<Icon as={MdAddCircle} color="green.500" w={6} h={6} />} onClick={onOpen} w="100%">
                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                    Add a new employee
                </Text>
            </Button>
            <Modal onClose={onClose} isOpen={isOpen} isCentered motionPreset='slideInBottom' size="xl" preserveScrollBarGap>
                <ModalOverlay />
                <AddNewEmployeeModalContent />
            </Modal>
        </>
    )
}
