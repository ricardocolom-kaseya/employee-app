import React, { useState } from 'react'
import { Box, Text, HStack, VStack, CloseButton, LightMode, Input, Button, Icon, Switch, useDisclosure, Select, useToast } from '@chakra-ui/react'
import {
    FormControl,
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
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'
import { MdAddCircle } from 'react-icons/md'

import validator from 'validator'

import { NameHeader, EmailHeader, DOBHeader, SkillsHeader, ActivityHeader } from './ModalHeaders'

import { font1, getAge, getToken, SessionExpiredToast } from '../helpers/Helpers'

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

            let checkedAgainst = theFirstName.replace(/'/g, ""
                ).replace(/ /g, ""
                ).replace(/\./g, ""
                ).replace(/,/g, "")

            changeFirstNameValid(validator.isAlpha(checkedAgainst) && theFirstName.slice(-1) !== "'")
            changeFirstName(theFirstName)
        }

        const handleChangeLastName = (theLastName) => {

            let checkedAgainst = theLastName.replace(/'/g, ""
                ).replace(/ /g, ""
                ).replace(/\./g, ""
                ).replace(/,/g, "")

            changeLastNameValid(validator.isAlpha(checkedAgainst) && theLastName.slice(-1) !== "'")
            changeLastName(theLastName)
        }

        const handleChangeEmail = (theEmail) => {
            changeEmailValid(validator.isEmail(theEmail))
            changeEmail(theEmail)
        }

        const handleChangeDate = (date) => {
            let theDate = new Date(date);
            if (!isNaN(theDate) && !(getAge(theDate) < 18)) {
                changeBirthdayValid(true)
                changeBirthday(date)
            }
            else {
                changeBirthday(0)
                changeBirthdayValid(false)
            }
        }

        const handleChangeSkill = () => {
            var index = document.getElementById("skillsDropDown").selectedIndex;
            if (index !== 0)
                changeSkill(skills[index - 1]);
        }

        const handleChangeActivity = () => {
            if (activity)
                changeActivity(0);
            else
                changeActivity(1);
        }

        function allValid() {

            return (firstNameValid && lastNameValid && emailValid && birthdayValid)
        }

        const handleAddEmployee = () => {

            if (allValid()) {

                const toDate = new Date(birthday)

                let yyyy = toDate.getFullYear();
                let mm = ((toDate.getMonth() + 1) < 10) ? `0${toDate.getMonth() + 1}` : toDate.getMonth() + 1
                let dd = (toDate.getDate() < 10) ? `0${toDate.getDate()}` : toDate.getDate()

                // If either name contains an apostrophe, "double up" the apostrophe
                let f_name = firstName.replace(/'/g, "''")
                let l_name = lastName.replace(/'/g, "''")

                f_name = f_name.charAt(0).toUpperCase() + f_name.slice(1);
                l_name = l_name.charAt(0).toUpperCase() + l_name.slice(1);

                let employee = { f_name, l_name, yyyy, mm, dd, email, skill_id: skill.skill_id, is_active: activity }
                let body = { employee }

                // console.log("Attempting to add " + f_name + " " + l_name + "...")

                fetch("http://localhost:4000/employees", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getToken()}`,
                    },
                    body: JSON.stringify(body)
                }).then(
                    response => {
                        console.log(response.status)
                        if (response.status !== 200)
                            throw new Error(response.status)
                        console.log("POST /employees Status Code: " + response.status);
                        return response.json()
                    }
                ).then(
                    data => {
                        let dob = new Date(birthday)
                        let newEmployee = {
                            employee_id: data, f_name, l_name, dob, email, skill_id: skill.skill_id, is_active: activity
                        }

                        toEmployees.push(newEmployee)
                        changeEmployees(toEmployees);

                        toast({
                            render: () => (
                                <Box color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="green.500">
                                    <HStack position="relative" align="center" minH="26px">
                                        <CheckCircleIcon w={5} h={5} m="0.5" />,
                                        <Text fontWeight="bold" fontSize="md" fontFamily={font1} pr="8">
                                            Saved
                                        </Text>
                                        <CloseButton size="sm" pos="absolute" right="-8px" top="-8px" onClick={() => toast.closeAll()} />
                                    </HStack>
                                </Box>
                            ), status: 'error', duration: 3000
                        })
                    }
                ).catch((err) => {
                    SessionExpiredToast(toast)
                })

                onClose();
            }
            else {
                if (!toast.isActive(id)) {
                    toast({
                        id,
                        render: () => (
                            <Box color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="red.500">
                                <HStack position="relative" align="center" minH="26px">
                                    <WarningIcon w={5} h={5} m="0.5" />
                                    <Text fontWeight="bold" fontSize="md" fontFamily={font1} pr="8">
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
                <ModalHeader fontFamily={font1} fontWeight="medium">Add a new employee</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack spacing="8">
                        <VStack spacing="8" w="1200px" h="328px">
                            <VStack spacing="0" w="100%">
                                <FormControl isRequired isInvalid={(!firstNameValid && firstName.length > 0)}>
                                    <NameHeader />
                                    <Input fontFamily={font1} placeholder="First name" onChange={(e) => { handleChangeFirstName(e.target.value) }} mb="2" />
                                </FormControl>
                                <FormControl isRequired isInvalid={(!lastNameValid && lastName.length > 0)}>
                                    <Input fontFamily={font1} placeholder="Last name" onChange={(e) => { handleChangeLastName(e.target.value) }} />
                                </FormControl>
                            </VStack>
                            <FormControl isRequired mt="8" isInvalid={(!emailValid && email.length > 0)}>
                                <EmailHeader />
                                <Input fontFamily={font1} placeholder="Email" type="email" onChange={(e) => { handleChangeEmail(e.target.value) }} />
                            </FormControl>
                            <FormControl isRequired mt="8">
                                <DOBHeader />
                                <Input fontFamily={font1} type="date" onChange={(e) => { handleChangeDate(e.target.value) }} />
                            </FormControl>
                        </VStack>
                        <VStack w="1200px" h="328px">
                            <VStack w="100%" spacing="0" justify="left">
                                <ActivityHeader />
                                <HStack w="100%" justify="center">
                                    <Text fontFamily={font1}>Inactive</Text>
                                    <LightMode>
                                        <Switch isChecked={activity} onChange={handleChangeActivity} size="lg" colorScheme="green" sx={{ 'span.chakra-switch__track:not([data-checked])': { backgroundColor: 'red.500' } }} />
                                    </LightMode>
                                    <Text fontFamily={font1}>Active</Text>
                                </HStack>
                            </VStack>
                            <FormControl isRequired pt="8">
                                <SkillsHeader />
                                <Select fontFamily={font1} placeholder="Skill" id="skillsDropDown" onChange={handleChangeSkill}>
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
                        <Button onClick={onClose} fontFamily={font1} fontWeight="medium">Cancel</Button>
                        <LightMode>
                            <Button colorScheme="green" my="4" rightIcon={<Icon as={MdAddCircle} w={4} h={4} />} onClick={handleAddEmployee}>
                                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily={font1}>
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
                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily={font1}>
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
