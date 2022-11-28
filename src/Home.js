import React, { useEffect, useState } from 'react'
import {
  useToast, Box, Text, HStack, VStack, InputRightElement, LightMode, Input, Button, Icon, IconButton, InputGroup, InputLeftElement, useColorMode, useColorModeValue, CloseButton, FormControl,
} from '@chakra-ui/react'

import { MdPerson } from 'react-icons/md'

import {
  ArrowForwardIcon, LockIcon, ViewIcon, ViewOffIcon, SunIcon, WarningIcon,
} from '@chakra-ui/icons'

import { useNavigate } from 'react-router-dom'

import md5 from 'md5'

import { font1, useMousePosition, clamp } from './helpers/Helpers'

export default function Home() {

  const navigate = useNavigate();

  const toast = useToast();

  const [userName, changeUserName] = useState('')

  const [userPassword, changeUserPassword] = useState('')

  const [hidePassword, changeHidePassword] = useState(false)

  const [isAuthenticating, changeIsAuthenticating] = useState(false)

  const mousePosition = useMousePosition();

  const [eyePos, changeEyePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    changeEyePos({
      x: clamp(mousePosition.x - window.innerWidth / 2 - 57, 5, 11),
      y: clamp(mousePosition.y - window.innerHeight / 2 + 246, 24, 32)
    })
  }, [mousePosition])

  const { toggleColorMode } = useColorMode()

  function hashPassword(text) {
    if (text !== '') {
      changeUserPassword(md5(text));
    }
    else {
      changeUserPassword('');
    }
  }

  const authenticateUser = () => {
    console.log('Attempting to authenticate user...')
    changeIsAuthenticating(true)

    // Authenticate the user
    function doAuthenticate() {
      fetch('http://localhost:4000/authenticate', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userName, userpassword: userPassword })

      }).then(
        (response) => {
          console.log("POST /authorize Status Code: " + response.status);
          if (!response.ok) {
            changeIsAuthenticating(false)
            if (!toast.isActive('login-error')) {
              toast({
                id: 'login-error',
                render: () => (
                  <Box color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="red.500">
                    <HStack position="relative" align="center" minH="26px">
                      <WarningIcon w={5} h={5} m="0.5" />
                      <Text fontWeight="bold" fontSize="md" fontFamily={font1} pr="8">
                        Invalid username or password
                      </Text>
                      <CloseButton size="sm" pos="absolute" right="-8px" top="-8px" onClick={() => toast.closeAll()} />
                    </HStack>
                  </Box>
                ),
                status: 'error',
                duration: 3000,
              })
            }
          }
          else {
            setTimeout(function () { navigate("/dashboard") }, 500)
          }
          return response.json();
        }
      ).then(
        data => {
          localStorage.setItem('token', data.accessToken)
        }
      ).catch(err => {
        changeIsAuthenticating(false)
        console.log(err)

        if (!toast.isActive('connection-error')) {
          toast({
            id: 'connection-error',
            render: () => (
              <Box color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="red.500">
                <HStack position="relative" align="center" minH="26px">
                  <WarningIcon w={5} h={5} m="0.5" />
                  <Text fontWeight="bold" fontSize="md" fontFamily={font1} pr="8">
                    Could not connect to server
                  </Text>
                  <CloseButton size="sm" pos="absolute" right="-8px" top="-8px" onClick={() => toast.closeAll()} />
                </HStack>
              </Box>
            ),
            status: 'error',
            duration: 3000,
          })
        }
      }
      )
    }

    setTimeout(function () { doAuthenticate() }, 500)
  }

  const primary = useColorModeValue('gray.100', 'gray.700')
  const textColorVal = useColorModeValue('gray.800', 'white')
  const secondary = useColorModeValue('white', 'gray.800')
  const footerDivider = useColorModeValue('gray.400', 'gray.700')

  return (
    <VStack w="100vw" h="100vh" justify="center" bg={secondary}>
      <HStack pos="absolute" right="2" top="2">
        <IconButton icon={<SunIcon />} onClick={toggleColorMode} variant="outline" borderColor={footerDivider} />
      </HStack>
      <VStack pb="8" spacing="8">
        <HStack spacing="0">
          <Text fontFamily={font1} fontSize="4xl" fontWeight="bold">Employee L</Text>
          <HStack spacing="0" pos="relative">
            <Box pos="relative">
              <Box id="leftPupil" bg={textColorVal} p="0.5" pos="absolute" left={eyePos.x + "px"} top={eyePos.y + "px"} borderRadius="full" />
              <Text fontFamily={font1} fontSize="4xl" fontWeight="normal">o</Text>
            </Box>
            <Box pos="relative">
              <Box id="rightPupil" bg={textColorVal} p="0.5" pos="absolute" left={eyePos.x + "px"} top={eyePos.y + "px"} borderRadius="full" />
              <Text fontFamily={font1} fontSize="4xl" fontWeight="normal">o</Text>
            </Box>
          </HStack>
          <Text fontFamily={font1} fontSize="4xl" fontWeight="bold">kup</Text>
        </HStack>
        <Text fontFamily={font1} fontSize="lg">Add, edit, or remove employees.</Text>
      </VStack>
      <VStack w="md" bg={primary} borderRadius="2xl" spacing="16" py="8" shadow="md">
        <VStack w="100%" spacing="2">
          <VStack spacing="0" pos="relative">
            <Text fontFamily={font1} fontSize="xl" fontWeight="medium">Login</Text>
            <Box h="2px" w="100%" bg="green.400" pos="absolute" bottom="-1" />
          </VStack>
          <VStack w="100%" justify="center" spacing="8" px="8" py="8">
            <FormControl>
              <InputGroup>
                <Input fontFamily={font1} placeholder="Username" variant="flushed" type="text" onChange={(e) => { changeUserName(e.target.value); }} />
                <InputLeftElement children={<Icon as={MdPerson} color="gray.300" />} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup onKeyUp={(e) => { if (e.keyCode === 13) authenticateUser() }}>
                <Input fontFamily={font1} placeholder="Password" variant="flushed" type={(hidePassword) ? 'text' : 'password'} onChange={(e) => { hashPassword(e.target.value); }} />
                <InputLeftElement children={<LockIcon color="gray.300" />} />
                <InputRightElement children={<IconButton icon={(!hidePassword) ? <ViewOffIcon w={4} h={4} /> : <ViewIcon w={4} h={4} />} size="sm" variant="link" />} onClick={() => { changeHidePassword(!hidePassword); }} />
              </InputGroup>
            </FormControl>
            <LightMode>
              <Button fontFamily={font1} w="100%" colorScheme="green" type="submit" rightIcon={<ArrowForwardIcon />} isLoading={isAuthenticating} onClick={() => authenticateUser()} isDisabled={!(userName !== '' && userPassword !== '')}>
                Go
              </Button>
            </LightMode>
          </VStack>
        </VStack>
      </VStack>
      <VStack w="100%" pos="fixed" bottom="0" h="116px" bg={secondary}>
        <Box pos="absolute" maxW="1000px" w="90%" bg={footerDivider} p="1px" top="0" />
        <VStack h="100%" justify="center" spacing="0">
          <Text fontSize="sm" pb="4" fontFamily={font1}>Technical Assignment - © Ricardo Colom</Text>
        </VStack>
      </VStack>
    </VStack>
  )
}