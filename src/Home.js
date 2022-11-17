import React, { useState, useEffect } from 'react'
import { Switch, Box, Text, HStack, VStack, InputRightElement, LightMode, Input, Code, Button, Tooltip, Icon, IconButton, Divider, useDisclosure, Select, SimpleGrid, InputGroup, InputLeftElement, useColorMode, useColorModeValue, Center } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'

import { MdCake, MdWork, MdOutlineDelete, MdSave, MdLock, MdPerson, MdEmail, MdAddCircle, MdDelete } from 'react-icons/md'

import KaseyaLogoSmall from "./assets/kaseya-logo-small.png"
import { ArrowForwardIcon, LockIcon, ViewIcon, ViewOffIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'

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
            <VStack w="lg" bg={primary} borderRadius="2xl" spacing="16" py="8" shadow="md">
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
                        <LightMode>
                            <Button w="100%" colorScheme="green" type="submit" rightIcon={<ArrowForwardIcon />} isLoading={submittedLogin} onClick={() => handleChangeSubmittedLogin()}>
                                Go
                            </Button>
                        </LightMode>
                    </VStack>
                </VStack>
            </VStack>
            <VStack w="100%" pos="fixed" bottom="0" h="116px">
                <Box pos="absolute" maxW="1000px" w="90%" bg={footerDivider} p="1px" top="0" />
                <VStack h="100%" justify="center" spacing="0">
                    <Text fontSize="sm" pb="4">Technical Assignment - © Ricardo Colom</Text>
                </VStack>
            </VStack>
        </VStack>
    )
}
