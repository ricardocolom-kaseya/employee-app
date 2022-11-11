import React, { useState, useEffect } from 'react'
import { Avatar, Box, Text, HStack, VStack, Heading, AvatarBadge, Input, Code, Button, Tooltip, Icon, IconButton, Switch, Divider, useDisclosure, Select, SimpleGrid } from '@chakra-ui/react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
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
import { MdCake, MdOutlineDelete, MdSave, MdBadge, MdPerson, MdEmail, MdAddCircle, MdDelete } from 'react-icons/md'

import KaseyaLogoSmall from "./assets/kaseya-logo-small.png"

const font1 = 'Inter';

const today = new Date();

const employee1DOB = new Date("5/1/2001");
const employee2DOB = new Date("4/12/1998");

const employee1skills = [
    {
        name: "Front-End",
        id: "000",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"
    },
    {
        name: "Back-End",
        id: "001",
        desc: "Assumenda, quia temporibus eveniet a libero incidunt suscipit"
    },
    {
        name: "Database",
        id: "003",
        desc: "Assumenda, quia temporibus eveniet a libero incidunt suscipit"
    },
    {
        name: "Database",
        id: "003",
        desc: "Assumenda, quia temporibus eveniet a libero incidunt suscipit"
    },
]

const employee2skills = [
    {
        name: "Communications",
        id: "003",
        desc: "aaaaaaaaa"
    },
]

const NameHeader = () => {
    return (
        <>
            <HStack position="absolute" spacing="2">
                <Icon as={MdPerson} boxSize={4} position="absolute" top="4px" />
                <Box w="1" />
                <Text fontWeight="medium" fontFamily="Inter">Name</Text>
            </HStack>
            <FormLabel position="absolute" left="63px"></FormLabel>
            <Text color="transparent" pb="2" fontFamily="Inter">invisible</Text>
        </>

    )
}

const EmailHeader = () => {
    return (
        <>
            <HStack position="absolute" spacing="2">
                <Icon as={MdEmail} boxSize={4} position="absolute" top="5px" />
                <Box w="1" />
                <Text fontWeight="medium" fontFamily="Inter">Email</Text>
            </HStack>
            <FormLabel position="absolute" left="59px"></FormLabel>
            <Text color="transparent" pb="2" fontFamily="Inter">invisible</Text>
        </>
    )
}

const DOBHeader = () => {
    return (
        <>
            <HStack position="absolute" spacing="2">
                <Icon as={MdCake} boxSize={4} position="absolute" top="3px" />
                <Box w="1" />
                <Text fontWeight="medium" fontFamily="Inter">Birthday</Text>
            </HStack>
            <FormLabel position="absolute" left="83px"></FormLabel>
            <Text color="transparent" pb="2" fontFamily="Inter">invisible</Text>
        </>
    )
}

const SkillsHeader = () => {
    return (
        <>
            <HStack position="absolute" spacing="2">
                <Icon as={MdBadge} boxSize={4} position="absolute" top="3px" />
                <Box w="1" />
                <Text fontWeight="medium" fontFamily="Inter">Skills</Text>
            </HStack>
            <FormLabel position="absolute" left="58px"></FormLabel>
            <Text color="transparent" pb="2" fontFamily="Inter">invisible</Text>
        </>
    )
}

const RenderActivity = (isActive) => {
    if (isActive) {
        return (
            <AvatarBadge boxSize="1.25em" bg="green.500" />
        )
    }
}

const GetAge = (dob) => {
    const currAge = (today - dob) / 31536000000;
    return Math.floor(currAge);
}

const SkillBlock = (skill) => {
    return (
        <VStack align="left" spacing="0" position="relative" pb={(skill.i < skill.totalCount - 1) ? "6" : "0"}>
            <HStack>
                <Text fontSize="xl" fontWeight="bold">
                    {skill.name}
                </Text>
                <HStack spacing="0" position="absolute" right="0">
                    <Code bg="transparent" pl="0">
                        SKILL ID:
                    </Code>
                    <Tooltip label="Click to copy skill ID" borderRadius="lg">
                        <Button size="xs" variant="outline" onClick={() => navigator.clipboard.writeText(skill.id)}>
                            <Code bg="transparent">
                                {skill.id}
                            </Code>
                        </Button>
                    </Tooltip>
                </HStack>
            </HStack>
            <Text>
                {skill.desc}
            </Text>
        </VStack>
    )
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
                            <Button colorScheme="green" my="4" rightIcon={<Icon as={MdAddCircle} color="white" w={4} h={4} />} onClick={onOpen}>
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

const EmployeeCard = (props) => {

    const EditButton = () => {

        const { isOpen, onOpen, onClose } = useDisclosure()

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
                <Modal onClose={onClose} isOpen={isOpen} isCentered motionPreset='slideInBottom' size="xl">
                    <ModalOverlay />
                    <ModalContent >
                        <ModalHeader fontFamily="Inter" fontWeight="medium">Edit employee</ModalHeader>
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
                                <Button my="4" colorScheme="blue" variant="outline" rightIcon={<Icon as={MdSave} w={4} h={4} />} onClick={onOpen}>
                                    <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                                        Save
                                    </Text>
                                </Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }

    const DeleteButton = () => {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const cancelRef = React.useRef()

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
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='medium'>
                                Delete Employee
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                <Text>Are you sure you would like to delete <strong>{props.first} {props.last}</strong>?</Text>
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='red' onClick={onClose} ml={3}>
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </>
        )
    }

    const skillNames = [];
    (props.skills).forEach(skill => {
        skillNames.push(skill.name);
    });

    return (
        <Box display="flex" justify="center" m="2">
            <Box pos="relative" w="md" maxW="md" borderWidth="1px" borderRadius="2xl" bg="white">
                <Box pos="absolute" m="2" right="0">
                    <HStack>
                        <EditButton />
                        <DeleteButton />
                    </HStack>

                </Box>
                <VStack m="4" align="left" spacing="3">
                    <HStack>
                        <Avatar size="md" name={props.first}>
                            {RenderActivity(props.isActive)}
                        </Avatar>
                        <VStack px="1" align="start" justify="start" spacing="0">
                            <HStack justify="end" align="end" spacing="3">
                                <Text fontWeight="bold" fontSize="xl" lineHeight="1" fontFamily={font1}>
                                    {props.first} {props.last}
                                </Text>
                                <Tooltip hasArrow label={(props.dob).toLocaleDateString()} borderRadius="lg">
                                    {/* textDecoration="underline" textUnderlineOffset="2px"  */}
                                    <Text color="gray.600" fontStyle="italic" fontSize="sm" lineHeight="1.2" fontFamily={font1}>
                                        {GetAge(props.dob)} years old
                                    </Text>
                                </Tooltip>
                            </HStack>
                            <HStack spacing="2" position="relative">
                                <Icon as={MdEmail} boxSize={4} position="absolute" bottom="2px" />
                                <Box w="1" />
                                <Text fontSize="sm" fontFamily={font1}>
                                    {props.email}
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
                                        <HStack>
                                            {(props.skills).map((skill, i) => {
                                                if (i < (props.skills).length - 1) {
                                                    return (
                                                        <HStack>
                                                            <Text size="sm" fontWeight="bold" fontFamily={font1}>{skill.name}</Text>
                                                            <Text size="sm" fontWeight="bold" fontFamily={font1}>•</Text>
                                                        </HStack>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <Text size="sm" fontWeight="bold" fontFamily={font1}>{skill.name}</Text>
                                                    )
                                                }
                                            })}
                                        </HStack>
                                        <AccordionIcon />
                                    </HStack>
                                </AccordionButton>
                                <AccordionPanel>
                                    {(props.skills).map((skill, i) => {
                                        return (<SkillBlock name={skill.name} id={skill.id} desc={skill.desc} i={i} totalCount={(props.skills).length} />)
                                    })}
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </VStack>
                </VStack>
                <HStack pos="absolute" w="100%" bottom="0" justify="end" px="4" py="2">
                    {/* <Image src={KaseyaLogoSmall} boxSize="48px" objectFit="contain" pos="absolute" left="0" mx="4"/> */}
                    <HStack spacing="0">
                        <Code bg="transparent">
                            ID:
                        </Code>
                        <Tooltip label="Click to copy employee ID" borderRadius="lg">
                            <Button size="xs" onClick={() => navigator.clipboard.writeText(props.id)}>
                                <Code bg="transparent">
                                    {props.id}
                                </Code>
                            </Button>
                        </Tooltip>
                    </HStack>
                </HStack>
            </Box>
        </Box>
    )
}

const CardView = () => {
    return (
        <HStack m="4" align="center">
            <VStack h="100%">
                <EmployeeCard id="00000" first="John" last="Smith" dob={employee1DOB} email="john.smith@gmail.com" skills={employee1skills} isActive={true} />
                <EmployeeCard id="00132" first="Ricardo" last="Colom" dob={employee1DOB} email="ricardo.colom@gmail.com" skills={employee1skills} isActive={true} />
            </VStack>
            <VStack h="100%">
                <EmployeeCard id="00001" first="Mike" last="Jones" dob={employee2DOB} email="mike.jones@gmail.com" skills={employee2skills} isActive={false} />
                <EmployeeCard id="00132" first="Sean" last="Carter" dob={employee2DOB} email="sean.carter@gmail.com" skills={employee1skills} isActive={true} />
            </VStack>
            <VStack h="100%">
                <EmployeeCard id="00001" first="Mike" last="Jones" dob={employee2DOB} email="mike.jones@gmail.com" skills={employee2skills} isActive={false} />
                <EmployeeCard id="00132" first="Sean" last="Carter" dob={employee2DOB} email="sean.carter@gmail.com" skills={employee1skills} isActive={true} />
            </VStack>
        </HStack>
    )
}

const ControlPanel = () => {

    const addDummyEmployee = () => {
        console.log("Dummy button clicked")

        let f_name = "Michael"
        let l_name = "Jordan"
        let dob = new Date('01-31-2022')
        let yyyy = dob.getFullYear()
        let mm = ((dob.getMonth() + 1) < 10) ? `0${dob.getMonth() + 1}` : dob.getMonth() + 1
        let dd = (dob.getDate() < 10) ? `0${dob.getDate()}` : dob.getDate()
        let email = "michael.jordan@gmail.com"
        let skill_id = 'a0e1827d-61fd-11ed-b1bd-803f5d06682c'
        let is_active = true

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
            data => { console.log(data) }
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
                                <Button colorScheme='red' onClick={() => {handleDeleteAllEmployees()}} ml={3}>
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

export default function Main() {

    const [employees, changeEmployees] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/getemployees", {
            headers: {
                'testHeader': "Test"
            }
        }).then(
            response => response.json()
        ).then(
            data => { console.log(data) }
        )
    }, [])

    return (
        <Box bg="gray.100" maxW="100vw" h="100vh">
            <HStack spacing="0" w="100%" h="100%">
                <VStack w="100%" h="100%" bg="gray.200" align="center">
                    <CardView />
                </VStack>
                <VStack w="424px" h="100%">
                    <ControlPanel />
                </VStack>
            </HStack>
        </Box>
    )
}
