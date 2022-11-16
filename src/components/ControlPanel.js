import React, { useState, useEffect } from 'react'
import { Avatar, Box, Text, HStack, VStack, Heading, AvatarBadge, Input, Code, Button, Tooltip, Icon, IconButton, Switch, Divider, useDisclosure, Select, Textarea, useToast } from '@chakra-ui/react'
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
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, SearchIcon, SunIcon, MoonIcon, ChevronDownIcon, CheckIcon } from '@chakra-ui/icons'
import { MdCake, MdOutlineDelete, MdSave, MdBadge, MdPerson, MdEmail, MdAddCircle, MdDelete } from 'react-icons/md'

import { faker } from '@faker-js/faker';

import KaseyaLogoSmall from "../assets/kaseya-logo-small.png"

import { NameHeader, EmailHeader, DOBHeader, SkillsHeader, ActivityHeader } from './ModalHeaders'

const font1 = 'Inter';

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

const AddNewEmployee = (props) => {
    let allEmployees = props.allEmployees
    let skills = props.skills
    const { isOpen, onOpen, onClose } = useDisclosure()

    const AddNewEmployeeModalContent = () => {
        const [firstName, changeFirstName] = useState("");
        const [lastName, changeLastName] = useState("");
        const [email, changeEmail] = useState("");
        const [birthday, changeBirthday] = useState(new Date());
        const [skill, changeSkill] = useState("");
        const [activity, changeActivity] = useState(1);

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

        const handleAddEmployee = () => {

            // Selecting the last skill dropdown returns an error "Cannot read properties of undefined (reading 'skill_id')"

            let employee_id = faker.datatype.uuid();

            let yyyy = birthday.getFullYear();
            let mm = ((birthday.getMonth() + 1) < 10) ? `0${birthday.getMonth() + 1}` : birthday.getMonth() + 1
            let dd = (birthday.getDate() < 10) ? `0${birthday.getDate()}` : birthday.getDate()

            // If either name contains an apostrophe, "double up" the apostrophe
            let f_name = firstName.replace("'", "''")
            let l_name = lastName.replace("'", "''")

            f_name = f_name.charAt(0).toUpperCase() + f_name.slice(1);
            l_name = l_name.charAt(0).toUpperCase() + l_name.slice(1);

            console.log("Attempting to add " + f_name + " " + l_name + "...")

            fetch("http://localhost:4000/createemployee", {
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
                    allEmployees.push(newEmployee[0])
                    props.changeEmployees(allEmployees);
                }
            )

            onClose();
        }

        return (
            <ModalContent >
                <ModalHeader fontFamily="Inter" fontWeight="medium">Add a new employee</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack spacing="8">
                        <VStack spacing="8" w="1200px" h="328px">
                            <FormControl isRequired>
                                <NameHeader />
                                <Input placeholder="First name" onChange={(e) => { changeFirstName(e.target.value) }} mb="2" />
                                <Input placeholder="Last name" onChange={(e) => { changeLastName(e.target.value) }} />
                            </FormControl>
                            <FormControl isRequired mt="8">
                                <EmailHeader />
                                <Input placeholder="Email" onChange={(e) => { changeEmail(e.target.value) }} />
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
                                    <Switch isChecked={activity} onChange={handleChangeActivity} size="lg" colorScheme="green" sx={{ 'span.chakra-switch__track:not([data-checked])': { backgroundColor: 'red.500' } }} />
                                    <Text>Active</Text>
                                </HStack>
                            </VStack>
                            <FormControl isRequired pt="8">
                                <SkillsHeader />
                                <Select placeholder="Choose a skill" id="skillsDropDown" onChange={handleChangeSkill}>
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
                        <Button colorScheme="green" my="4" rightIcon={<Icon as={MdAddCircle} color="white" w={4} h={4} />} onClick={handleAddEmployee}>
                            <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                                Add
                            </Text>
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        )
    }

    return (
        <>
            <Button variant="outline" my="4" rightIcon={<Icon as={MdAddCircle} color="green.500" w={6} h={6} />} onClick={onOpen}>
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

const ViewSkills = ({ skills, changeSkills }) => {

    const toast = useToast();

    const [modalSkills, changeModalSkills] = useState([])

    // This is absolutely necessary as modalSkills hook is always loaded as long as the control panel is rendered, and it MUST change whenever skills changes.
    useEffect(() => {
        console.log("skills was changed")
        changeModalSkills([...skills])
    }, [skills])

    const { isOpen: isViewSkillsOpen, onOpen: onViewSkillsOpen, onClose: onViewSkillsClose } = useDisclosure()

    const [index, changeIndex] = useState(0)

    if (modalSkills.length > 0 && index >= modalSkills.length)
        changeIndex(index - 1)

    const { isOpen: isEditSkillOpen, onOpen: onEditSkillOpen, onClose: onEditSkillClose } = useDisclosure()

    const { isOpen: isNewSkillOpen, onOpen: onNewSkillOpen, onClose: onNewSkillClose } = useDisclosure()

    const ShowSelectedIcon = (i) => {
        if (i == index)
            return (
                <CheckIcon color="gray.700" />
            )
    }

    const ShowSkillTable = () => {
        if (modalSkills.length > 0)
            return (
                <VStack spacing="0" w="100%" pb="8">
                    {modalSkills.map((skill, i) => {
                        return (
                            <Box onClick={() => { changeIndex(i) }} _hover={{ background: "gray.100", cursor: "pointer", transition: "linear 0.1s" }} key={i} w="100%" border="1px" borderBottom={(i < modalSkills.length - 1) ? "0px" : "1px"} borderTopRadius={(i == 0) ? "md" : "0px"} borderBottomRadius={(i == modalSkills.length - 1) ? "md" : "0px"} borderColor="gray.200" p="2">
                                <HStack justify="space-between" px="2">
                                    <Text textAlign="left" fontFamily={font1}>{skill.skill_name}</Text>
                                    {ShowSelectedIcon(i)}
                                </HStack>
                            </Box>
                        )
                    })}
                </VStack>
            )
    }

    const ShowDeleteSelectedSkillButton = () => {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const cancelRef = React.useRef();

        const handleDeleteSkill = () => {
            let skillID = modalSkills[index].skill_id

            console.log("Attempting to delete skill...")

            fetch("http://localhost:4000/deleteskill", {
                headers: {
                    'skill_id': skillID
                }
            }).then(
                response => response.json()
            ).then(
                data => {
                    console.log("Skill deleted...")
                    let newAllSkills = [];

                    for (var i = 0; i < modalSkills.length; ++i) {
                        if (modalSkills[i].skill_id != skillID)
                            newAllSkills.push(modalSkills[i])
                    }

                    changeModalSkills(newAllSkills);
                }
            )
        }

        if (modalSkills.length > 0) {

            return (
                <>
                    <Button onClick={onOpen} fontFamily="Inter" colorScheme="red" fontWeight="medium">Delete Selected</Button>
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
                                    Delete Skill
                                </AlertDialogHeader>
                                <AlertDialogBody>
                                    <Text>Are you sure you would like to delete <strong>{modalSkills[index].skill_name}</strong>?</Text>
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme='red' onClick={handleDeleteSkill} ml={3}>
                                        Delete
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </>
            )
        }
    }

    const ShowEditSkillButton = () => {
        if (modalSkills.length > 0) {
            return (
                <Button my="4" rightIcon={<EditIcon w={4} h={4} />} onClick={onEditSkillOpen}>
                    <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                        Edit
                    </Text>
                </Button>
            )
        }
    }

    const EditSkillModalContent = () => {

        let defaultName = modalSkills[index].skill_name
        let defaultDesc = modalSkills[index].skill_desc

        const [skillName, changeSkillName] = useState(defaultName)
        const [skillDesc, changeSkillDesc] = useState(defaultDesc)

        const handleEditSkill = () => {
            let skillID = modalSkills[index].skill_id

            console.log("Attempting to edit skill " + skillName)

            fetch("http://localhost:4000/editskill", {
                headers: {
                    'skill_id': skillID,
                    'skill_name': skillName,
                    'skill_desc': skillDesc
                }
            }).then(
                response => response.json()
            ).then(
                data => {
                    console.log("Edited this skill...")

                    onEditSkillClose();

                    toast({ title: "Edited a skill", status: 'success', duration: 3000 })

                    let editedSkill = { skill_id: skillID, skill_name: skillName, skill_desc: skillDesc }

                    let newAllSkills = [...modalSkills]

                    for (var i = 0; i < newAllSkills.length; ++i) {
                        if (newAllSkills[i].skill_id == skillID) {
                            newAllSkills[i] = editedSkill;
                        }
                    }

                    changeModalSkills(newAllSkills);
                }
            )
        }

        return (
            <ModalContent>
                <ModalHeader fontFamily="Inter" fontWeight="medium">Edit Skill</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack spacing="8">
                        <VStack spacing="8" w="1200px" h="328px">
                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input value={skillName} onChange={(e) => changeSkillName(e.target.value)} />
                            </FormControl>
                            <FormControl isRequired mt="8">
                                <FormLabel>Description</FormLabel>
                                <Textarea value={skillDesc} onChange={(e) => changeSkillDesc(e.target.value)} />
                            </FormControl>
                        </VStack>
                    </HStack>
                </ModalBody>
                <ModalFooter>
                    <HStack>
                        <Button onClick={onEditSkillClose} fontFamily="Inter" fontWeight="medium">Cancel</Button>
                        <Button my="4" colorScheme="blue" variant="outline" rightIcon={<Icon as={MdSave} w={4} h={4} />} onClick={handleEditSkill}>
                            <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                                Save
                            </Text>
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        )
    }

    const NewSkillModalContent = () => {

        const [skillName, changeSkillName] = useState("")
        const [skillDesc, changeSkillDesc] = useState("")

        const handleAddSkill = () => {
            let skillID = faker.datatype.uuid()

            console.log("Attempting to add skill " + skillName)

            fetch("http://localhost:4000/createskill", {
                headers: {
                    'skill_id': skillID,
                    'skill_name': skillName,
                    'skill_desc': skillDesc
                }
            }).then(
                response => response.json()
            ).then(
                data => {
                    console.log("Added this skill...")

                    onNewSkillClose();

                    toast({ title: "Added a skill!", status: 'success', duration: 3000 })

                    let newSkill = { skill_id: skillID, skill_name: skillName, skill_desc: skillDesc }

                    let newAllSkills = [...modalSkills]
                    newAllSkills.push(newSkill)
                    changeModalSkills(newAllSkills);
                }
            )
        }

        return (
            <ModalContent>
                <ModalHeader fontFamily="Inter" fontWeight="medium">New Skill</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack spacing="8">
                        <VStack spacing="8" w="1200px" h="328px">
                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input value={skillName} onChange={(e) => changeSkillName(e.target.value)} />
                            </FormControl>
                            <FormControl isRequired mt="8">
                                <FormLabel>Description</FormLabel>
                                <Textarea value={skillDesc} onChange={(e) => changeSkillDesc(e.target.value)} />
                            </FormControl>
                        </VStack>
                    </HStack>
                </ModalBody>
                <ModalFooter>
                    <HStack>
                        <Button onClick={onNewSkillClose} fontFamily="Inter" fontWeight="medium">Cancel</Button>
                        <Button colorScheme="green" my="4" rightIcon={<Icon as={MdAddCircle} color="white" w={4} h={4} />} onClick={handleAddSkill}>
                            <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                                Add
                            </Text>
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        )
    }

    return (
        <>
            <Button variant="outline" my="4" rightIcon={<Icon as={MdBadge} w={6} h={6} />} onClick={onViewSkillsOpen}>
                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                    View/Edit Skills
                </Text>
            </Button>
            <Modal onClose={onViewSkillsClose} isOpen={isViewSkillsOpen} isCentered motionPreset='slideInBottom' size="lg" onCloseComplete={() => { changeSkills(modalSkills) }} preserveScrollBarGap>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader fontFamily="Inter" fontWeight="medium">Skills</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing="0">
                            <ShowSkillTable />
                            <Button variant="outline" rightIcon={<Icon as={MdAddCircle} color="green.500" w={6} h={6} />} w="100%" onClick={onNewSkillOpen}>
                                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                                    Add a new skill
                                </Text>
                            </Button>
                            <Modal onClose={onNewSkillClose} isOpen={isNewSkillOpen} isCentered motionPreset='slideInBottom' size="xl" preserveScrollBarGap>
                                <NewSkillModalContent />
                            </Modal>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <HStack w="100%" justify="space-between">
                            <ShowDeleteSelectedSkillButton />
                            <ShowEditSkillButton />
                            <Modal onClose={onEditSkillClose} isOpen={isEditSkillOpen} isCentered motionPreset='slideInBottom' size="xl" preserveScrollBarGap>
                                <ModalOverlay />
                                <EditSkillModalContent />
                            </Modal>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default function ControlPanel(props) {
    let allEmployees = [...props.employees];

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
        let skill_id = (props.skills[randomInt(props.skills.length)]).skill_id
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
                allEmployees.push(newEmployee[0])
                props.changeEmployees(allEmployees);
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
                data => { console.log(data) }
            )

            props.changeEmployees([])
            onClose();
        }

        return (
            <>
                <Button colorScheme="red" my="2" onClick={onOpen} w="100%">
                    <Text w="100%" textAlign="center" fontWeight="normal" fontFamily="Inter">
                        Delete All Employees
                    </Text>
                </Button>
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
                                Delete All Employees
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                <Text>Are you sure you would like to delete <strong>all employees</strong>?</Text>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='red' onClick={handleDeleteAllEmployees} ml={3}>
                                    Delete All
                                </Button>
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
                data => { console.log(data) }
            )

            props.changeSkills([])
            onClose();
        }

        return (
            <>
                <Button colorScheme="red" onClick={onOpen} w="100%" my="2">
                    <Text w="100%" textAlign="center" fontWeight="normal" fontFamily="Inter">
                        Delete All Skills
                    </Text>
                </Button>
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
                                Delete All Skills
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                <Text>Are you sure you would like to delete <strong>all skills</strong>?</Text>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='red' onClick={handleDeleteAllSkills} ml={3}>
                                    Delete All
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </>
        )
    }

    return (
        <VStack w="100%" h="100%" bg="white">
            <HStack w="100%" p="2" justify="right">
                <HStack>
                    <SunIcon />
                    <Switch colorScheme="gray" sx={{ 'span.chakra-switch__track:not([data-checked])': { backgroundColor: 'gray.500' } }} />
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
                <AddNewEmployee allEmployees={allEmployees} changeEmployees={props.changeEmployees} skills={props.skills} />
                <ViewSkills skills={props.skills} changeSkills={props.changeSkills} />
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
