import React, { useState, useEffect } from 'react'
import { Avatar, Box, Text, HStack, VStack, Heading, AvatarBadge, Input, Code, Button, Tooltip, Icon, IconButton, Switch, Divider, useDisclosure, Select, Textarea } from '@chakra-ui/react'
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

import { NameHeader, EmailHeader, DOBHeader, SkillsHeader } from './ModalHeaders'

const font1 = 'Inter';

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

const AddNewEmployee = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button variant="outline" my="4" rightIcon={<Icon as={MdAddCircle} color="green.500" w={6} h={6} />} onClick={onOpen}>
                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                    Add a new employee
                </Text>
            </Button>
            <Modal onClose={onClose} isOpen={isOpen} isCentered motionPreset='slideInBottom' size="xl">
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader fontFamily="Inter" fontWeight="medium">Add a new employee</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <HStack spacing="8">
                            <VStack spacing="8" w="1200px" h="328px">
                                <FormControl isRequired>
                                    <NameHeader />
                                    <Input placeholder="First name" mb="2" />
                                    <Input placeholder="Last name" />
                                </FormControl>
                                <FormControl isRequired mt="8">
                                    <EmailHeader />
                                    <Input placeholder="Email" />
                                </FormControl>
                                <FormControl isRequired mt="8">
                                    <DOBHeader />
                                    <Input placeholder="Birthday" type="date" />
                                </FormControl>
                            </VStack>
                            <VStack w="1200px" h="328px">
                                <FormControl isRequired>
                                    <SkillsHeader />
                                    <Select placeholder="Skills">
                                        <option>One</option>
                                        <option>Two</option>
                                        <option>Three</option>
                                        <option>Four</option>
                                    </Select>
                                </FormControl>
                            </VStack>
                        </HStack>
                    </ModalBody>
                    <ModalFooter>
                        <HStack>
                            <Button onClick={onClose} fontFamily="Inter" fontWeight="medium">Cancel</Button>
                            <Button colorScheme="green" my="4" rightIcon={<Icon as={MdAddCircle} color="white" w={4} h={4} />}>
                                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                                    Add
                                </Text>
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

const ViewSkills = (props) => {
    let skills = props.skills
    const [index, changeIndex] = useState(0)

    const { isOpen: isViewSkillsOpen, onOpen: onViewSkillsOpen, onClose: onViewSkillsClose } = useDisclosure()

    const { isOpen: isEditSkillOpen, onOpen: onEditSkillOpen, onClose: onEditSkillClose } = useDisclosure()

    const { isOpen: isNewSkillOpen, onOpen: onNewSkillOpen, onClose: onNewSkillClose } = useDisclosure()

    const EditSkillModal = () => {

        let defaultName = skills[index].skill_name
        let defaultDesc = skills[index].skill_desc

        const [skillName, changeSkillName] = useState(defaultName)
        const [skillDesc, changeSkillDesc] = useState(defaultDesc)

        return (
            <Modal onClose={onEditSkillClose} isOpen={isEditSkillOpen} isCentered motionPreset='slideInBottom' size="xl">
                <ModalOverlay />
                <ModalContent >
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
                            <Button my="4" colorScheme="blue" variant="outline" rightIcon={<Icon as={MdSave} w={4} h={4} />}>
                                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                                    Save
                                </Text>
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

    const NewSkillModal = () => {

        const [skillName, changeSkillName] = useState("")
        const [skillDesc, changeSkillDesc] = useState("")

        return (
            <Modal onClose={onNewSkillClose} isOpen={isNewSkillOpen} isCentered motionPreset='slideInBottom' size="xl">
                <ModalOverlay />
                <ModalContent >
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
                            <Button colorScheme="green" my="4" rightIcon={<Icon as={MdAddCircle} color="white" w={4} h={4} />}>
                                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                                    Add
                                </Text>
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

    const showSelectedIcon = (i) => {
        if (i == index)
            return (
                <CheckIcon color="gray.700" />
            )
    }

    return (
        <>
            <Button variant="outline" my="4" rightIcon={<Icon as={MdBadge} w={6} h={6} />} onClick={onViewSkillsOpen}>
                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                    View/Edit Skills
                </Text>
            </Button>
            <Modal onClose={onViewSkillsClose} isOpen={isViewSkillsOpen} isCentered motionPreset='slideInBottom' size="lg">
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader fontFamily="Inter" fontWeight="medium">Skills</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing="8" py="2">
                            <VStack spacing="0" w="100%">
                                {skills.map((skill, i) => {
                                    return (
                                        <Box onClick={() => { changeIndex(i) }} _hover={{ background: "gray.100", cursor: "pointer", transition: "linear 0.1s" }} key={i} w="100%" border="1px" borderBottom={(i < skills.length - 1) ? "0px" : "1px"} borderTopRadius={(i == 0) ? "md" : "0px"} borderBottomRadius={(i == skills.length - 1) ? "md" : "0px"} borderColor="gray.200" p="2">
                                            <HStack justify="space-between" px="2">
                                                <Text textAlign="left" fontFamily={font1}>{skill.skill_name}</Text>
                                                {showSelectedIcon(i)}
                                            </HStack>
                                        </Box>
                                    )
                                })}
                            </VStack>
                            <Button variant="outline" my="4" rightIcon={<Icon as={MdAddCircle} color="green.500" w={6} h={6} />} w="100%" onClick={onNewSkillOpen}>
                                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                                    Add a new skill
                                </Text>
                            </Button>
                            <NewSkillModal />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <HStack>
                            <Button onClick={onViewSkillsClose} fontFamily="Inter" fontWeight="medium">Cancel</Button>
                            <Button my="4" rightIcon={<EditIcon w={4} h={4} />} onClick={onEditSkillOpen}>
                                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                                    Edit
                                </Text>
                            </Button>
                            <EditSkillModal />
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


export default function ControlPanel(props) {
    let skills = props.skills;

    const addDummyEmployee = () => {
        console.log("Adding dummy employee")

        let f_name = faker.name.firstName();
        let l_name = faker.name.lastName();
        let dob = faker.date.birthdate();
        let yyyy = dob.getFullYear()
        let mm = ((dob.getMonth() + 1) < 10) ? `0${dob.getMonth() + 1}` : dob.getMonth() + 1
        let dd = (dob.getDate() < 10) ? `0${dob.getDate()}` : dob.getDate()
        let email = faker.internet.email(f_name, l_name)
        let skill_id = skills[randomInt(skills.length)].skill_id
        let is_active = Math.round(Math.random())

        // If either name contains an apostrophe, "double up" the apostrophe
        f_name = f_name.replace("'", "''")
        l_name = l_name.replace("'", "''")

        console.log("Attempting to create " + f_name + " " + l_name + "...")

        fetch("http://localhost:4000/createemployee", {
            headers: {
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
                let toEmployees = data;
                toEmployees.forEach(employee => {
                    employee.dob = new Date(employee.dob)
                });
                props.changeEmployees(toEmployees)
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
                <Button colorScheme="red" my="4" onClick={onOpen}>
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
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='medium'>
                                Delete All Employees
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                <Text>Are you sure you would like to delete <strong>all</strong> employees?</Text>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='red' onClick={() => { handleDeleteAllEmployees() }} ml={3}>
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
                <AddNewEmployee />
                <ViewSkills skills={props.skills} />
                <Button onClick={() => { addDummyEmployee() }}>Add dummy employee</Button>
                <Heading fontSize="2xl" fontFamily={font1} py="4">
                    Controls
                </Heading>
                <FormControl maxW="80%">
                    <Input fontFamily="Inter" placeholder="Search..." />
                </FormControl>
                <Menu>
                    <MenuButton maxW="80%" textAlign="left" fontWeight="normal" fontFamily="Inter" as={Button} variant="outline" rightIcon={<ChevronDownIcon />}>
                        Sort by...
                    </MenuButton>
                    <MenuList>
                        <MenuItem>One</MenuItem>
                        <MenuItem>Two</MenuItem>
                        <MenuItem>Three</MenuItem>
                        <MenuItem>Four</MenuItem>
                    </MenuList>
                </Menu>
                <DeleteAllEmployeesButton />
            </VStack>
        </VStack>
    )
}
