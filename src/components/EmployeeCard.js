import React, { useState } from 'react'
import { useToast, Avatar, Box, Text, HStack, VStack, LightMode, AvatarBadge, Input, Code, Button, Tooltip, Icon, IconButton, Switch, CloseButton, useDisclosure, Select, useColorModeValue } from '@chakra-ui/react'
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
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import {
    FormControl,
} from '@chakra-ui/react'

import { DeleteIcon, EditIcon, CheckCircleIcon } from '@chakra-ui/icons'
import { MdSave, MdEmail } from 'react-icons/md'

import { NameHeader, EmailHeader, DOBHeader, SkillsHeader, ActivityHeader } from './ModalHeaders'

import validator from 'validator'

import { font1, getToken, getAge, SessionExpiredToast, CopiedToast, InvalidFieldsToast } from '../helpers/Helpers'

const RenderEmployeeActivity = (isActive) => {
    if (isActive) {
        return (
            <Tooltip fontFamily={font1} label="Active" hasArrow borderRadius="lg">
                <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Tooltip>
        )
    }
    else {
        return (
            <Tooltip fontFamily={font1} label="Inactive" hasArrow borderRadius="lg">
                <AvatarBadge boxSize="1.25em" bg="red.500" />
            </Tooltip>
        )
    }
}

export default function EmployeeCard({ employee, skills, employees, changeEmployees }) {

    const toast = useToast();

    const { isOpen: isHovered, onOpen: onHover, onClose: onLeaveHover } = useDisclosure();

    let toEmployees = employees;
    let thisEmployeeIndex = toEmployees.indexOf(employee);

    let skillName = "None";
    let skillDesc = "No skill selected"

    const findSkill = () => {

        skills.forEach(skill => {
            if (skill.skill_id === employee.skill_id) {
                skillName = skill.skill_name;
                skillDesc = skill.skill_desc;
            }
        });
    }

    findSkill();


    const EditButton = () => {

        const toast = useToast();

        const { isOpen, onOpen, onClose } = useDisclosure()

        const EditEmployeeModal = () => {

            let currSkill = {
                skill_id: employee.skill_id,
                skill_name: skillName,
                skill_desc: skillDesc,
            }

            if(currSkill.skill_name === "None")
            {
                if(skills.length > 0)
                {
                    currSkill = skills[0];
                }
            }

            const [firstName, changeFirstName] = useState(employee.f_name);
            const [lastName, changeLastName] = useState(employee.l_name);
            const [email, changeEmail] = useState(employee.email);
            const [birthday, changeBirthday] = useState((employee.dob).getTime());
            const [skill, changeSkill] = useState(currSkill);
            const [activity, changeActivity] = useState(employee.is_active);

            const [firstNameValid, changeFirstNameValid] = useState(true);
            const [lastNameValid, changeLastNameValid] = useState(true);
            const [emailValid, changeEmailValid] = useState(true);
            const [birthdayValid, changeBirthdayValid] = useState(true);

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

            function formatDate(date) {
                const toDate = new Date(date).toISOString().split('T')[0];
                return toDate;
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
                changeSkill(skills[index]);
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

            const handleSaveEmployee = () => {

                if (allValid()) {
                    // Find this employee by employee_id in the database and change their information.

                    const toDate = new Date(birthday)

                    let yyyy = toDate.getFullYear();
                    let mm = ((toDate.getMonth() + 1) < 10) ? `0${toDate.getMonth() + 1}` : toDate.getMonth() + 1
                    let dd = (toDate.getDate() < 10) ? `0${toDate.getDate()}` : toDate.getDate()

                    // If either name contains an apostrophe, "double up" the apostrophe
                    let f_name = firstName.replace(/'/g, "''")
                    let l_name = lastName.replace(/'/g, "''")

                    const putURL = "http://localhost:4000/employees/" + employee.employee_id;

                    let employeeInfo = { f_name, l_name, yyyy, mm, dd, email, skill_id: skill.skill_id, is_active: activity }

                    let body = { employee: employeeInfo }

                    fetch(putURL, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${getToken()}`,
                        },
                        body: JSON.stringify(body)
                    }).then(
                        response => {
                            console.log("PUT /employees Status Code: " + response.status);
                            return response.json()
                        }
                    ).then(
                        data => {

                            employee.f_name = data.f_name;
                            employee.l_name = data.l_name;
                            employee.dob = new Date(birthday);
                            employee.email = data.email;
                            employee.skill_id = data.skill_id
                            employee.is_active = data.is_active;

                            toEmployees[thisEmployeeIndex] = employee;

                            onClose();

                            toast({
                                render: () => (
                                    <Box color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="green.500">
                                        <HStack position="relative" align="center" minH="26px">
                                            <CheckCircleIcon w={5} h={5} m="0.5" />
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
                }
                else {
                    InvalidFieldsToast(toast)
                }
            }

            return (
                <ModalContent>
                    <ModalHeader fontFamily={font1} fontWeight="medium">Edit employee</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <HStack spacing="8">
                            <VStack spacing="8" w="1200px" h="328px">
                                <VStack spacing="0" w="100%">
                                    <FormControl isRequired isInvalid={!firstNameValid && firstName.length > 0}>
                                        <NameHeader />
                                        <Input fontFamily={font1} value={firstName} onChange={(e) => { handleChangeFirstName(e.target.value) }} mb="2" />
                                    </FormControl>
                                    <FormControl isRequired isInvalid={(!lastNameValid && lastName.length > 0)}>
                                        <Input fontFamily={font1} value={lastName} onChange={(e) => { handleChangeLastName(e.target.value) }} />
                                    </FormControl>
                                </VStack>
                                <FormControl isRequired mt="8" isInvalid={(!emailValid && email.length > 0)}>
                                    <EmailHeader />
                                    <Input fontFamily={font1} value={email} type="email" onChange={(e) => { handleChangeEmail(e.target.value) }} />
                                </FormControl>
                                <FormControl isRequired mt="8">
                                    <DOBHeader />
                                    <Input fontFamily={font1} type="date" defaultValue={formatDate(birthday)} onChange={(e) => { handleChangeDate(e.target.value) }} />
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
                                    <Select fontFamily={font1} defaultValue={skill.skill_name} id="skillsDropDown" onChange={handleChangeSkill}>
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
                            <Button
                                my="4"
                                colorScheme="blue"
                                variant="outline"
                                rightIcon={<Icon as={MdSave} w={4} h={4} />}
                                onClick={handleSaveEmployee}
                            >
                                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily={font1}>
                                    Save
                                </Text>
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            )
        }

        return (
            <>
                <Tooltip hasArrow label="Edit" borderRadius="lg">
                    <IconButton
                        colorScheme='gray'
                        aria-label='Edit Employee'
                        size="sm"
                        icon={<EditIcon fontSize="12pt" />}
                        variant="ghost"
                        onClick={onOpen}
                    />
                </Tooltip>
                <Modal onClose={onClose} isOpen={isOpen} isCentered motionPreset='slideInBottom' size="xl" onCloseComplete={() => { changeEmployees(toEmployees); onLeaveHover() }} preserveScrollBarGap>
                    <ModalOverlay />
                    <EditEmployeeModal />
                </Modal>
            </>
        )
    }

    const DeleteButton = () => {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const cancelRef = React.useRef()

        function handleDeleteEmployee() {

            fetch("http://localhost:4000/employees", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ employee_id: employee.employee_id })
            }).then(
                response => {
                    if (response.status !== 200)
                        throw new Error(response.status)
                    if (response.ok) {
                        console.log("DELETE /employees Status Code: " + response.status);

                        let newToEmployees = [];
                        for (var i = 0; i < toEmployees.length; ++i) {
                            if (i !== thisEmployeeIndex)
                                newToEmployees.push(toEmployees[i])
                        }
                        toEmployees = [...newToEmployees];
                        onClose();
                    }
                }
            ).catch((err) => {
                SessionExpiredToast(toast)
            })
        }

        return (
            <>
                <Tooltip hasArrow label="Delete" borderRadius="lg">
                    <IconButton
                        colorScheme='red'
                        aria-label='Delete Employee'
                        size="sm"
                        icon={<DeleteIcon fontSize="12pt" color="red.500" />}
                        variant="ghost"
                        onClick={onOpen}
                    />
                </Tooltip>
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isCentered
                    motionPreset="slideInBottom"
                    preserveScrollBarGap
                    onCloseComplete={() => {
                        changeEmployees(toEmployees); onLeaveHover()
                    }}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontFamily={font1} fontSize='lg' fontWeight='medium'>
                                Delete Employee
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                <Text fontFamily={font1}>Are you sure you would like to delete <strong>{employee.f_name} {employee.l_name}</strong>?</Text>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button fontFamily={font1} ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <LightMode>
                                    <Button fontFamily={font1} colorScheme='red' onClick={handleDeleteEmployee} ml={3}>
                                        Delete
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

    return (
        <Box pos="relative" w="lg" style={{ margin: "6px" }} shadow="md" borderRadius="2xl" bg={primary} onMouseEnter={onHover} onMouseLeave={onLeaveHover}>
            <Box pos="absolute" m="2" right="0" opacity={isHovered ? "100" : "0"} transition="linear" transitionDuration="0.1s">
                <HStack>
                    <EditButton />
                    <DeleteButton />
                </HStack>
            </Box>
            <VStack m="4" align="left" spacing="3">
                <HStack>
                    <Avatar size="md" name={employee.f_name}>
                        {RenderEmployeeActivity(employee.is_active)}
                    </Avatar>
                    <VStack px="1" align="start" justify="start" spacing="0">
                        <HStack justify="end" align="end" spacing="3">
                            <Text fontWeight="bold" fontSize="xl" lineHeight="1" fontFamily={font1}>
                                {employee.f_name} {employee.l_name}
                            </Text>
                        </HStack>
                        <HStack spacing="2" position="relative">
                            <Icon as={MdEmail} boxSize={4} position="absolute" bottom="2px" />
                            <Box w="1" />
                            <Text fontSize="sm" fontFamily={font1}>
                                {employee.email}
                            </Text>
                        </HStack>
                    </VStack>
                </HStack>
                <VStack spacing="0" align="left" pos="relative">
                    <Text fontSize="xs" pos="absolute" bg={primary} px="1.5" left="2.5" top="0.5" border="1px" borderRadius="md" borderColor="transparent" fontFamily={font1}>
                        SKILL
                    </Text>
                    <Accordion allowToggle pt="3" pb="8" w="100%">
                        <AccordionItem borderLeftWidth="1px" borderRightWidth="1px" borderRadius="lg">
                            <AccordionButton>
                                <HStack w="100%" justify="space-between">
                                    <Text fontWeight="bold" fontFamily={font1} w="100%" textAlign="left">{skillName}</Text>
                                    <AccordionIcon />
                                </HStack>
                            </AccordionButton>
                            <AccordionPanel>
                                <VStack align="left" spacing="0" position="relative" pb="0">
                                    <Text fontFamily={font1}>
                                        {skillDesc}
                                    </Text>
                                </VStack>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </VStack>
            </VStack>
            <HStack pos="absolute" w="100%" bottom="3" px="4">
                <Tooltip fontFamily={font1} hasArrow label={(employee.dob).toLocaleDateString()} borderRadius="lg">
                    <Text fontStyle="italic" fontSize="sm" fontFamily={font1} w="122px" px="2">
                        {getAge(employee.dob)} years old
                    </Text>
                </Tooltip>
                <HStack spacing="3" w="100%" justify="end" opacity={isHovered ? "100" : "0"} transition="linear" transitionDuration="0.1s">
                    <HStack spacing="0">
                        <Code bg="transparent">
                            SKILL ID:
                        </Code>
                        <Tooltip fontFamily={font1} hasArrow label={employee.skill_id} borderRadius="lg">
                            <Button size="xs" onClick={() => { navigator.clipboard.writeText(employee.skill_id); CopiedToast({ toast: toast, type: "Skill ID" }) }}>
                                <Code bg="transparent">
                                    Copy
                                </Code>
                            </Button>
                        </Tooltip>
                    </HStack>
                    <HStack spacing="0">
                        <Code bg="transparent">
                            EMPLOYEE ID:
                        </Code>
                        <Tooltip fontFamily={font1} hasArrow label={employee.employee_id} borderRadius="lg">
                            <Button size="xs" onClick={() => { navigator.clipboard.writeText(employee.employee_id); CopiedToast({ toast: toast, type: "Employee ID" }) }}>
                                <Code bg="transparent">
                                    Copy
                                </Code>
                            </Button>
                        </Tooltip>
                    </HStack>
                </HStack>
            </HStack>
        </Box>
    )
}