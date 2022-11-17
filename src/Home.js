import React, { useState, useEffect } from 'react'
import { Avatar, Box, Text, HStack, VStack, InputRightElement, AvatarBadge, Input, Code, Button, Tooltip, Icon, IconButton, Divider, useDisclosure, Select, SimpleGrid, Flex, InputGroup, InputLeftElement, useColorMode, useColorModeValue } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'

import { MdCake, MdWork, MdOutlineDelete, MdSave, MdLock, MdPerson, MdEmail, MdAddCircle, MdDelete } from 'react-icons/md'

import KaseyaLogoSmall from "./assets/kaseya-logo-small.png"
import { ArrowForwardIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

export default function Home() {

    const [showPassword, changeShowPassword] = useState(false)

    const [submittedLogin, changeSubmittedLogin] = useState(false)

    const { colorMode, toggleColorMode } = useColorMode()

    function handleChangeShowPassword() {
        changeShowPassword(!showPassword)
    }

    const handleChangeSubmittedLogin = () => {
        console.log("GO")
        changeSubmittedLogin(true);
        setTimeout(function () { changeSubmittedLogin(false) }, 1000);
    }

    const primary = useColorModeValue('white', 'black')
    const secondary = useColorModeValue('gray.200', 'gray.700')

    return (
        <VStack w="100vw" h="100vh" justify="center">
            <Button onClick={toggleColorMode}>Test</Button>
            <VStack pb="32">
                <Text fontFamily="Inter" fontSize="4xl" fontWeight="medium">Employee Lookup</Text>
            </VStack>
            <VStack w="lg" bg={secondary} borderRadius="2xl" spacing="16" py="8">
                <VStack w="100%" spacing="4">
                    <VStack spacing="0" pos="relative">
                        <Text fontFamily="Inter" fontSize="xl" fontWeight="medium">Login</Text>
                        <Box h="2px" w="100%" bg="green.400" mt="4" pos="absolute" bottom="-1" />
                    </VStack>
                    <VStack w="100%" justify="center" spacing="8" px="16" py="8">
                        <FormControl>
                            <InputGroup>
                                <Input placeholder='Username' variant="flushed" />
                                <InputLeftElement children={<Icon as={MdPerson} color="gray.300" />} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <Input placeholder='Password' variant="flushed" type={(showPassword) ? "password" : "text"} />
                                <InputLeftElement children={<LockIcon color="gray.300" />} />
                                <InputRightElement children={<IconButton icon={(showPassword) ? <ViewOffIcon w={4} h={4} /> : <ViewIcon w={4} h={4} />} size="sm" variant="link" />} onClick={handleChangeShowPassword} />
                            </InputGroup>
                        </FormControl>
                        <Button w="100%" colorScheme="green" type="submit" rightIcon={<ArrowForwardIcon />} isLoading={submittedLogin} onClick={() => handleChangeSubmittedLogin()}>
                            Go
                        </Button>
                    </VStack>
                </VStack>
            </VStack>
        </VStack>
    )
}
