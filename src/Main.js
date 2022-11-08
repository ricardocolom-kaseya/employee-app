import { Avatar, Box, Text, HStack, VStack, AvatarBadge } from '@chakra-ui/react'
import React from 'react'
import { MdCake, MdEmail } from 'react-icons/md'

const today = new Date();

const employee1DOB = new Date("5/1/2001");
const employee2DOB = new Date("4/12/1998");

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

const EmployeeCard = (props) => {
    return (
        <Box display="flex" justifyContent="center" m="2">
            <Box w="400px" h="256px" maxW="sm" borderWidth="1px" borderRadius="2xl" bg="white">
                <Box pos="absolute" right="4" m="2">
                    <HStack>
                        <Text color="gray">
                            ID: {props.id}
                        </Text>
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
                </Box>
            </Box>
        </Box>
    )
}

export default function Main() {
    return (
        <Box bg="gray.100">
            <VStack>
                <EmployeeCard id="00000" first="John" last="Smith" dob={employee1DOB} email="john.smith@gmail.com" skills={["Front-End", "Back-End"]} isActive={true} />
                <EmployeeCard id="00001" first="Mike" last="Jones" dob={employee2DOB} email="mike.jones@gmail.com" skills={["Communications"]} isActive={false} />
            </VStack>
        </Box>
    )
}
