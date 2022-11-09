import React from 'react'
import { Avatar, Box, Text, HStack, VStack, AvatarBadge, Code, Button, Tooltip, IconButton } from '@chakra-ui/react'
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
import { MdCake, MdOutlineDelete, MdOutlineEdit, MdEmail } from 'react-icons/md'

const today = new Date();

const employee1DOB = new Date("5/1/2001");
const employee2DOB = new Date("4/12/1998");

const employee1skills = [
    {
        name: "Front-End",
        id: "000",
        desc: "aaaaaaaaa"
    },
    {
        name: "Back-End",
        id: "001",
        desc: "bbbbbbbbb"
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

const SkillBlock = (props) => {
    
}

const EmployeeCard = (props) => {

    const skillNames = [];
    (props.skills).forEach(skill => {
        skillNames.push(skill.name);
    });

    console.log(skillNames)

    return (
        <Box display="flex" justifyContent="center" m="2">
            <Box pos="relative" w="md" maxW="lg" borderWidth="1px" borderRadius="2xl" bg="white">
                <Box pos="absolute" m="2" right="0">
                    <HStack>
                        <IconButton
                            colorScheme='gray'
                            aria-label='Edit Employee'
                            size="sm"
                            icon={<MdOutlineEdit fontSize="16pt" color="black" />}
                            variant="ghost"
                        />
                        <IconButton
                            colorScheme='red'
                            aria-label='Delete Employee'
                            size="sm"
                            icon={<MdOutlineDelete fontSize="16pt" color="black" />}
                            variant="ghost"
                        />
                    </HStack>

                </Box>
                <Box pos="absolute" m="2" right="0" bottom="0">
                    <HStack>
                        <Text color="gray">
                            ID:
                        </Text>
                        <Tooltip label="Click to copy" borderRadius="lg">
                            <Button size="xs" onClick={() => navigator.clipboard.writeText(props.id)}>
                                <Code bg="transparent">
                                    {props.id}
                                </Code>
                            </Button>
                        </Tooltip>
                    </HStack>
                </Box>
                <Box m="4">
                    <HStack>
                        <Avatar size="md" name={props.first}>
                            {RenderActivity(props.isActive)}
                        </Avatar>
                        <VStack px="1" align="start" justify="start" spacing="0">
                            <Text fontWeight="bold" fontSize="2xl">
                                {props.first} {props.last}
                            </Text>
                            <Text lineHeight="0.8" fontSize="sm">
                                Kaseya
                            </Text>
                        </VStack>
                    </HStack>
                    <VStack my="3" align="left" spacing="0">
                        <HStack>
                            <MdEmail />
                            <Text>
                                {props.email}
                            </Text>
                        </HStack>
                        <HStack>
                            <MdCake />
                            <HStack >
                                <Text>
                                    {(props.dob).toLocaleDateString()}
                                </Text>
                                <Text fontStyle="italic">
                                    ({GetAge(props.dob)} years old)
                                </Text>
                            </HStack>
                        </HStack>
                    </VStack>

                    <Accordion allowToggle pb="8">
                        <AccordionItem borderLeftWidth="1px" borderRightWidth="1px" borderRadius="lg">
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    Skill Info
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel>
                                <TableContainer>
                                    <Table variant='simple' size="sm">
                                        <Thead>
                                            <Tr>
                                                <Th>Skill ID</Th>
                                                <Th>Name</Th>
                                                <Th>Description</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {(props.skills).map((skill, i) => {
                                                return (
                                                    <Tr>
                                                        <Td>{skill.id}</Td>
                                                        <Td>{skill.name}</Td>
                                                        <Td>{skill.desc}</Td>
                                                    </Tr>
                                                )
                                            })}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>
            </Box>
        </Box>
    )
}

export default function Main() {
    return (
        <Box bg="gray.100">
            <VStack>
                <EmployeeCard id="00000" first="John" last="Smith" dob={employee1DOB} email="john.smith@gmail.com" skills={employee1skills} isActive={true} />
                <EmployeeCard id="00001" first="Mike" last="Jones" dob={employee2DOB} email="mike.jones@gmail.com" skills={employee2skills} isActive={false} />
            </VStack>
        </Box>
    )
}
