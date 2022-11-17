import React, { useState } from 'react'
import { useToast, Avatar, Box, Text, HStack, VStack, Heading, AvatarBadge, Input, Code, Button, Tooltip, Icon, IconButton, Switch, Divider, useDisclosure, Select, SimpleGrid } from '@chakra-ui/react'
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
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'

import { DeleteIcon, EditIcon, SearchIcon, SunIcon, MoonIcon, ChevronDownIcon, CheckIcon } from '@chakra-ui/icons'
import { MdCake, MdOutlineDelete, MdSave, MdBadge, MdPerson, MdEmail, MdAddCircle, MdDelete } from 'react-icons/md'

import { NameHeader, EmailHeader, DOBHeader, SkillsHeader, ActivityHeader } from './ModalHeaders'

const font1 = 'Inter';

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

const GetAge = (dob) => {
    const today = new Date();

    const currAge = (today - dob) / 31536000000;
    return Math.floor(currAge);
}

const RenderEmployeeActivity = (isActive) => {
    if (isActive) {
        return (
            <AvatarBadge boxSize="1.25em" bg="green.500" />
        )
    }
}

const SkillBlock = (skill) => {
    return (
        <VStack align="left" spacing="0" position="relative" pb={(skill.i < skill.totalCount - 1) ? "16" : "8"}>
            {/* <Text w="100%" textAlign="left" fontSize="xl" fontWeight="bold" fontFamily={font1}>
                {skill.name}
            </Text> */}
            <Text fontFamily={font1}>
                {skill.desc}
            </Text>
            <HStack spacing="0" position="absolute" right="0" bottom="0">
                <Code bg="transparent">
                    SKILL ID:
                </Code>
                <Tooltip label={skill.skill_id} borderRadius="lg">
                    <Button size="xs" variant="outline" onClick={() => navigator.clipboard.writeText(skill.skill_id)}>
                        <Code bg="transparent">
                            Copy
                        </Code>
                    </Button>
                </Tooltip>
            </HStack>
        </VStack>
    )
}

export default function EmployeeCard({ employee, skills, employees, changeEmployees }) {

    let toEmployees = employees;
    let thisEmployeeIndex = toEmployees.indexOf(employee);

    let skillName = "None";
    let skillDesc = "empty desc"

    const findSkill = () => {

        skills.forEach(skill => {
            if (skill.skill_id == employee.skill_id) {
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

            const [firstName, changeFirstName] = useState(employee.f_name);
            const [lastName, changeLastName] = useState(employee.l_name);
            const [email, changeEmail] = useState(employee.email);
            const [birthday, changeBirthday] = useState(employee.dob);
            const [skill, changeSkill] = useState(currSkill);
            const [activity, changeActivity] = useState(employee.is_active);

            const formatDate = (date) => {
                let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];

                return dateString;
            }

            const handleChangeDate = (date) => {
                let theDate = new Date(date);
                if (!isNaN(theDate)) {
                    console.log(theDate)
                    changeBirthday(theDate)
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

            const handleSaveEmployee = () => {
                // Find this employee by employee_id in the database and change their information.

                let yyyy = birthday.getFullYear();
                let mm = ((birthday.getMonth() + 1) < 10) ? `0${birthday.getMonth() + 1}` : birthday.getMonth() + 1
                let dd = (birthday.getDate() < 10) ? `0${birthday.getDate()}` : birthday.getDate()

                // If either name contains an apostrophe, "double up" the apostrophe
                let f_name = firstName.replace("'", "''")
                let l_name = lastName.replace("'", "''")

                console.log("Attempting to save " + f_name + " " + l_name + "...")

                fetch("http://localhost:4000/editemployee", {
                    headers: {
                        'employee_id': employee.employee_id,
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
                        console.log("Saved this employee...")
                        employee.f_name = f_name;
                        employee.l_name = l_name;
                        employee.dob = birthday;
                        employee.email = email;
                        employee.skill_id = skill.skill_id
                        employee.is_active = activity;

                        toEmployees[thisEmployeeIndex] = employee;

                        // This forces the dashboard to reload the employees state and immediately show the updated employee card, unfortunately it has the side effect of closing the current modal causing the close transition to appear abrupt.

                        onClose();

                        toast({ title: "Saved!", status: 'success', duration: 3000 })
                    }
                )
            }

            return (
                <ModalContent>
                    <ModalHeader fontFamily="Inter" fontWeight="medium">Edit employee</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <HStack spacing="8">
                            <VStack spacing="8" w="1200px" h="328px">
                                <FormControl isRequired>
                                    <NameHeader />
                                    <Input value={firstName} onChange={(e) => changeFirstName(e.target.value)} mb="2" />
                                    <Input value={lastName} onChange={(e) => changeLastName(e.target.value)} />
                                </FormControl>
                                <FormControl isRequired mt="8">
                                    <EmailHeader />
                                    <Input value={email} onChange={(e) => changeEmail(e.target.value)} />
                                </FormControl>
                                <FormControl isRequired mt="8">
                                    <DOBHeader />
                                    <Input value={formatDate(birthday)} onChange={(e) => handleChangeDate(e.target.value)} type="date" />
                                </FormControl>
                            </VStack>
                            <VStack w="1200px" h="328px">
                                <VStack w="100%" spacing="0" justify="left">
                                    <ActivityHeader />
                                    <HStack w="100%" justify="center">
                                        <Text>Inactive</Text>
                                        <Switch isChecked={activity} onChange={handleChangeActivity} size="lg" colorScheme="green" sx={{ 'span.chakra-switch__track:not([data-checked])': { backgroundColor: 'red.500' } }} />
                                        <Text>Active</Text>
                                    </HStack>
                                </VStack>
                                <FormControl isRequired pt="8">
                                    <SkillsHeader />
                                    <Select defaultValue={skill.skill_name} id="skillsDropDown" onChange={handleChangeSkill}>
                                        {skills.map((skill, i) => {
                                            return (<option key={i} onClick={() => console.log("FIRED")}>{skill.skill_name}</option>)
                                        })}
                                    </Select>
                                </FormControl>
                            </VStack>
                        </HStack>
                    </ModalBody>
                    <ModalFooter>
                        <HStack>
                            <Button onClick={onClose} fontFamily="Inter" fontWeight="medium">Cancel</Button>
                            <Button my="4" colorScheme="blue" variant="outline" rightIcon={<Icon as={MdSave} w={4} h={4} />} onClick={handleSaveEmployee}>
                                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
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
                <IconButton
                    colorScheme='gray'
                    aria-label='Edit Employee'
                    size="sm"
                    icon={<EditIcon fontSize="12pt" color="black" />}
                    variant="ghost"
                    onClick={onOpen}
                />
                <Modal onClose={onClose} isOpen={isOpen} isCentered motionPreset='slideInBottom' size="xl" onCloseComplete={() => { changeEmployees(toEmployees) }} preserveScrollBarGap>
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
            console.log("Attempting to delete this employee...")

            fetch("http://localhost:4000/deleteemployee", {
                headers: {
                    'employee_id': employee.employee_id
                }
            }).then(
                response => response.json()
            ).then(
                data => {
                    console.log("Deleted this employee...")
                    let newToEmployees = [];
                    for (var i = 0; i < toEmployees.length; ++i) {
                        if (i != thisEmployeeIndex)
                        newToEmployees.push(toEmployees[i])
                    }
                    toEmployees = [...newToEmployees];
                    onClose();
                }
            )
        }

        return (
            <>
                <IconButton
                    colorScheme='red'
                    aria-label='Delete Employee'
                    size="sm"
                    icon={<DeleteIcon fontSize="12pt" color="black" />}
                    variant="ghost"
                    onClick={onOpen}
                />
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isCentered
                    motionPreset="slideInBottom"
                    preserveScrollBarGap
                    onCloseComplete={() => {
                        changeEmployees(toEmployees)
                    }}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='medium'>
                                Delete Employee
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                <Text>Are you sure you would like to delete <strong>{employee.f_name} {employee.l_name}</strong>?</Text>
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='red' onClick={handleDeleteEmployee} ml={3}>
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </>
        )
    }

    return (
        <Box pos="relative" w="lg" style={{ margin: "6px" }} shadow="md" borderRadius="2xl" bg="white">
            <Box pos="absolute" m="2" right="0">
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
                    <Text fontSize="xs" pos="absolute" bg="white" px="1" left="2" top="0.5" border="1px" borderRadius="md" borderColor="transparent" fontFamily={font1}>
                        SKILLS
                    </Text>
                    <Accordion allowToggle pt="3" pb="8" w="100%">
                        <AccordionItem borderLeftWidth="1px" borderRightWidth="1px" borderRadius="lg">
                            <AccordionButton>
                                <HStack w="100%" justify="space-between">
                                    <Text size="sm" fontWeight="bold" fontFamily={font1}>{skillName}</Text>
                                    <AccordionIcon />
                                </HStack>
                            </AccordionButton>
                            <AccordionPanel>
                                <SkillBlock name={skillName} skill_id={employee.skill_id} desc={skillDesc} key={0} totalCount={1} />
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </VStack>
            </VStack>
            <HStack pos="absolute" w="100%" bottom="0" px="4" py="2">
                <Tooltip hasArrow label={(employee.dob).toLocaleDateString()} borderRadius="lg">
                    <Text color="gray.600" fontStyle="italic" fontSize="sm" lineHeight="1.2" fontFamily={font1} w="122px">
                        {GetAge(employee.dob)} years old
                    </Text>
                </Tooltip>
                <HStack spacing="0" w="100%" justify="end">
                    <Code bg="transparent">
                        ID:
                    </Code>
                    <Tooltip label={employee.employee_id} borderRadius="lg">
                        <Button size="xs" onClick={() => navigator.clipboard.writeText(employee.employee_id)}>
                            <Code bg="transparent">
                                Copy
                            </Code>
                        </Button>
                    </Tooltip>
                </HStack>
            </HStack>
        </Box>
    )
}