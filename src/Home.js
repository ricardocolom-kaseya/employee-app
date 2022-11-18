import React, { useState, useEffect } from 'react'
import { useToast, Switch, Box, Text, HStack, VStack, InputRightElement, LightMode, Input, Code, Button, Tooltip, Icon, IconButton, Divider, useDisclosure, Select, SimpleGrid, InputGroup, InputLeftElement, useColorMode, useColorModeValue, Center, CloseButton } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'

import { MdCake, MdWork, MdOutlineDelete, MdSave, MdLock, MdPerson, MdEmail, MdAddCircle, MdDelete } from 'react-icons/md'

import KaseyaLogoSmall from "./assets/kaseya-logo-small.png"
import { ArrowForwardIcon, LockIcon, ViewIcon, ViewOffIcon, SunIcon, MoonIcon, WarningIcon, CheckCircleIcon } from '@chakra-ui/icons'

import md5 from 'md5'

export default function Home({ setAuth }) {

    const toast = useToast();
    const toastIdRef = React.useRef()

    function closeToast() {
        toast.closeAll();
    }

    const [userName, changeUserName] = useState("")

    const [userPassword, changeUserPassword] = useState("")

    const [hidePassword, changeHidePassword] = useState(false)

    const [submittedLogin, changeSubmittedLogin] = useState(false)

    const { colorMode, toggleColorMode } = useColorMode()

    const handleChangeSubmittedLogin = () => {
        console.log("Button clicked")
        console.log(userPassword)
        changeSubmittedLogin(true)
        setTimeout(function () { authenticateUser() }, 1000);
    }

    function hashPassword(text){
        if(text != "")
            changeUserPassword(md5(text))
        else
            changeUserPassword("");
    }

    const authenticateUser = () => {
        changeSubmittedLogin(false)
        console.log("Attempting to authenticate user...")

        // Authenticate the user
        fetch("http://localhost:4000/authenticate", {
            method: 'POST',
            headers: {
                'username': userName,
                'userpassword': userPassword
            }
        }).then(
            response => response.json()
        ).then(
            data => {
                console.log(data)

                if (data == "valid")
                    setAuth(true);
                else {
                    toast({
                       render: () => (
                            <Box m={3} color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="red.500">
                                <HStack position="relative" align="center" minH="26px">
                                    <WarningIcon w={5} h={5} m="0.5"/>
                                    <Text fontWeight="bold" fontSize="md" fontFamily="Inter" pr="8">
                                        Invalid username or password
                                    </Text>
                                    <CloseButton size="sm" pos="absolute" right="-8px" top="-8px" onClick={() => closeToast()}/>
                                </HStack>
                            </Box>
                        ), status: 'error', duration: 5000
                    })
                }
            }
        )
    }

    const primary = useColorModeValue('white', 'gray.700')
    const textColorVal = useColorModeValue('gray.800', 'white')
    const secondary = useColorModeValue('gray.200', 'gray.800')
    const footerDivider = useColorModeValue('gray.400', 'gray.700')

    return (
        <VStack w="100vw" h="100vh" justify="center" bg={secondary}>
            <HStack pos="absolute" right="4" top="4">
                <SunIcon />
                <LightMode>
                    <Switch
                        colorScheme="blackAlpha"
                        defaultValue={colorMode}
                        onChange={() => { setTimeout(function () { toggleColorMode() }, 100) }}
                        sx={{ 'span.chakra-switch__track:not([data-checked])': { backgroundColor: 'blackAlpha.500' } }}
                        border="1px" borderRadius="2xl" borderColor="whiteAlpha.500" />
                </LightMode>
                <MoonIcon />
            </HStack>
            <VStack pb="32">
                <HStack spacing="0">
                    <Text fontFamily="Inter" fontSize="4xl" fontWeight="bold">Employee L</Text>
                    <HStack spacing="0" pos="relative">
                        <Box pos="relative">
                            <Box bg={textColorVal} p="0.5" pos="absolute" left="11px" bottom="24px" borderRadius="full" />
                            <Text fontFamily="Inter" fontSize="4xl" fontWeight="normal">o</Text>
                        </Box>
                        <Box pos="relative">
                            <Box bg={textColorVal} p="0.5" pos="absolute" left="11px" bottom="24px" borderRadius="full" />
                            <Text fontFamily="Inter" fontSize="4xl" fontWeight="normal">o</Text>
                        </Box>
                    </HStack>
                    <Text fontFamily="Inter" fontSize="4xl" fontWeight="bold">kup</Text>
                </HStack>
            </VStack>
            <VStack w="md" bg={primary} borderRadius="2xl" spacing="16" py="8" shadow="md">
                <VStack w="100%" spacing="2">
                    <VStack spacing="0" pos="relative">
                        <Text fontFamily="Inter" fontSize="xl" fontWeight="medium">Login</Text>
                        <Box h="2px" w="100%" bg="green.400" pos="absolute" bottom="-1" />
                    </VStack>
                    <VStack w="100%" justify="center" spacing="8" px="8" py="8">
                        <FormControl>
                            <InputGroup>
                                <Input placeholder='Username' variant="flushed" type="text" onChange={(e) => { changeUserName(e.target.value) }} />
                                <InputLeftElement children={<Icon as={MdPerson} color="gray.300" />} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <Input placeholder='Password' variant="flushed" type={(hidePassword) ? "text" : "password"} onChange={(e) => { hashPassword(e.target.value) }} />
                                <InputLeftElement children={<LockIcon color="gray.300" />} />
                                <InputRightElement children={<IconButton icon={(!hidePassword) ? <ViewOffIcon w={4} h={4} /> : <ViewIcon w={4} h={4} />} size="sm" variant="link" />} onClick={() => { changeHidePassword(!hidePassword) }} />
                            </InputGroup>
                        </FormControl>
                        <LightMode>
                            <Button w="100%" colorScheme="green" type="submit" rightIcon={<ArrowForwardIcon />} isLoading={submittedLogin} onClick={() => handleChangeSubmittedLogin()} isDisabled={!(userName != "" && userPassword != "")}>
                                Go
                            </Button>
                        </LightMode>
                    </VStack>
                </VStack>
            </VStack>
            <VStack w="100%" pos="fixed" bottom="0" h="116px" bg={secondary}>
                <Box pos="absolute" maxW="1000px" w="90%" bg={footerDivider} p="1px" top="0" />
                <VStack h="100%" justify="center" spacing="0">
                    <Text fontSize="sm" pb="4">Technical Assignment - © Ricardo Colom</Text>
                </VStack>
            </VStack>
        </VStack>
    )
}
