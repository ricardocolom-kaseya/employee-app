import React from 'react'
import { Avatar, Box, Text, HStack, VStack, AvatarBadge, Code, Button, Tooltip, Icon, IconButton, Switch, Divider } from '@chakra-ui/react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
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
import { DeleteIcon, EditIcon, SearchIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'
import { MdCake, MdOutlineDelete, MdOutlineEdit, MdEmail } from 'react-icons/md'

import KaseyaLogoSmall from "./assets/kaseya-logo-small.png"

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
    }
]

const employee2skills = [
    {
        name: "Communications",
        id: "003",
        desc: "aaaaaaaaa"
    },
]

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

const EmployeeCard = (props) => {

    const skillNames = [];
    (props.skills).forEach(skill => {
        skillNames.push(skill.name);
    });

    return (
        <Box display="flex" justify="center" m="2">
            <Box pos="relative" w="md" maxW="lg" borderWidth="1px" borderRadius="2xl" bg="white">
                <Box pos="absolute" m="2" right="0">
                    <HStack>
                        <IconButton
                            colorScheme='gray'
                            aria-label='Edit Employee'
                            size="sm"
                            icon={<EditIcon fontSize="12pt" color="black" />}
                            variant="ghost"
                        />
                        <IconButton
                            colorScheme='red'
                            aria-label='Delete Employee'
                            size="sm"
                            icon={<DeleteIcon fontSize="12pt" color="black" />}
                            variant="ghost"
                        />
                    </HStack>

                </Box>
                <VStack m="4" align="left" spacing="3">
                    <HStack>
                        <Avatar size="md" name={props.first}>
                            {RenderActivity(props.isActive)}
                        </Avatar>
                        <VStack px="1" align="start" justify="start" spacing="0">
                            <HStack justify="end" align="end" spacing="3">
                                <Text fontWeight="bold" fontSize="xl" lineHeight="1">
                                    {props.first} {props.last}
                                </Text>
                                <Tooltip hasArrow label={(props.dob).toLocaleDateString()} borderRadius="lg">
                                    {/* textDecoration="underline" textUnderlineOffset="2px"  */}
                                    <Text color="gray.600" fontStyle="italic" fontSize="sm" lineHeight="1.2">
                                        {GetAge(props.dob)} years old
                                    </Text>
                                </Tooltip>
                            </HStack>
                            <HStack spacing="2" position="relative">
                                <Icon as={MdEmail} boxSize={4} position="absolute" bottom="2px" />
                                <Box w="1" />
                                <Text fontSize="sm">
                                    {props.email}
                                </Text>
                            </HStack>
                        </VStack>
                    </HStack>
                    <VStack spacing="0" align="left" pos="relative">
                        <Text fontSize="xs" pos="absolute" bg="white" px="1" left="2" top="0.5" border="1px" borderRadius="md" borderColor="transparent">
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
                                                            <Text size="sm" fontWeight="bold">{skill.name}</Text>
                                                            <Text size="sm" fontWeight="bold">•</Text>
                                                        </HStack>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <Text size="sm" fontWeight="bold">{skill.name}</Text>
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
                <HStack pos="absolute" w="100%" bottom="0" justify="end" px="2" py="2">
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
        <Box m="4">
            <EmployeeCard id="00000" first="John" last="Smith" dob={employee1DOB} email="john.smith@gmail.com" skills={employee1skills} isActive={true} />
            <EmployeeCard id="00001" first="Mike" last="Jones" dob={employee2DOB} email="mike.jones@gmail.com" skills={employee2skills} isActive={false} />
        </Box>
    )
}

const ControlPanel = () => {
    return (
        <VStack m="2" w="100%">
            <HStack w="100%" px="2" justify="right">
                <HStack>
                    <SunIcon />
                    <Switch />
                    <MoonIcon />
                </HStack>
            </HStack>
            <VStack py="9">
                <Avatar size="lg" label="Admin" />
                <Text fontSize="xl">
                    Admin
                </Text>
            </VStack>
            <Divider w="90%"/>
            <VStack px="4" align="left" w="100%">
                <Text fontSize="xl">
                    Controls
                </Text>
            </VStack>
        </VStack>
    )
}

export default function Main() {
    return (
        <Box bg="gray.100" w="100vw" h="100vh">
            <HStack spacing="0" w="100%" h="100%" bg="blue.300">
                <VStack w="100%" h="100%" bg="gray.200" align="left">
                    <CardView />
                </VStack>
                <VStack w="400px" h="100%" bg="white">
                    <ControlPanel />
                </VStack>
            </HStack>
        </Box>
    )
}
