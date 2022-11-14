import React, { useState } from 'react'
import { Avatar, Box, Text, HStack, VStack, Heading, AvatarBadge, Input, Code, Button, Tooltip, Icon, IconButton, Switch, Divider, useDisclosure, Select, SimpleGrid } from '@chakra-ui/react'
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

import { NameHeader, EmailHeader, DOBHeader, SkillsHeader } from './ModalHeaders'

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
            <Text w="100%" textAlign="left" fontSize="xl" fontWeight="bold" fontFamily={font1}>
                {skill.name}
            </Text>
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

export default function EmployeeCard(props) {

    let employee = props.employee;
    let skills = props.skills;

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

    const { isOpen, onOpen, onClose } = useDisclosure()

    const EditEmployeeModal = () => {
        const [firstName, changeFirstName] = useState(employee.f_name);
        const [lastName, changeLastName] = useState(employee.l_name);
        const [email, changeEmail] = useState(employee.email);
        const [birthday, changeBirthday] = useState(employee.dob);
        const [skill, changeSkill] = useState(employee.skill_id);

        const formatDate = (date) => {
            let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];

            return dateString;
        }

        const handleChangeDate = (date) => {
            let toBirthday = new Date(date);
            console.log(toBirthday);
            changeBirthday(toBirthday)
        }

        return (

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
                                <FormControl isRequired>
                                    <SkillsHeader />
                                    <Select defaultValue={skillName}>
                                        {skills.map((skill, i) => {
                                            return(<option key={i} >{skill.skill_name}</option>)
                                        })}
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

        )
    }

    const EditButton = () => {
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
                <EditEmployeeModal />
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
                                <Text>Are you sure you would like to delete <strong>{employee.f_name} {employee.l_name}</strong>?</Text>
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
                        <Avatar size="md" name={employee.f_name}>
                            {RenderEmployeeActivity(employee.is_active)}
                        </Avatar>
                        <VStack px="1" align="start" justify="start" spacing="0">
                            <HStack justify="end" align="end" spacing="3">
                                <Text fontWeight="bold" fontSize="xl" lineHeight="1" fontFamily={font1}>
                                    {employee.f_name} {employee.l_name}
                                </Text>
                                <Tooltip hasArrow label={(employee.dob).toLocaleDateString()} borderRadius="lg">
                                    {/* textDecoration="underline" textUnderlineOffset="2px"  */}
                                    <Text color="gray.600" fontStyle="italic" fontSize="sm" lineHeight="1.2" fontFamily={font1}>
                                        {GetAge(employee.dob)} years old
                                    </Text>
                                </Tooltip>
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
                                        <HStack>
                                            {/* {(props.skills).map((skill, i) => {
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
                                            })} */}
                                            <Text size="sm" fontWeight="bold" fontFamily={font1}>{skillName}</Text>
                                        </HStack>
                                        <AccordionIcon />
                                    </HStack>
                                </AccordionButton>
                                <AccordionPanel>
                                    {/* {(props.skills).map((skill, i) => {
                                        return (<SkillBlock name="Placeholder" id={employee.skill_id} desc="placeholder" key={i} totalCount={(props.skills).length} />)
                                    })} */}
                                    <SkillBlock name={skillName} skill_id={employee.skill_id} desc={skillDesc} key={0} totalCount={1} />
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
                        <Tooltip label={employee.employee_id} borderRadius="lg">
                            <Button size="xs" onClick={() => navigator.clipboard.writeText(props.id)}>
                                <Code bg="transparent">
                                    Copy
                                </Code>
                            </Button>
                        </Tooltip>
                    </HStack>
                </HStack>
            </Box>
        </Box>
    )
}