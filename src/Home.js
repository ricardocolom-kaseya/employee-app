import React, { useEffect, useState } from 'react'
import {
  useToast, Switch, Box, Text, HStack, VStack, InputRightElement, LightMode, Input, Button, Icon, IconButton, InputGroup, InputLeftElement, useColorMode, useColorModeValue, CloseButton,

  FormControl,
} from '@chakra-ui/react'

import { MdPerson } from 'react-icons/md'

import {
  ArrowForwardIcon, LockIcon, ViewIcon, ViewOffIcon, SunIcon, MoonIcon, WarningIcon,
} from '@chakra-ui/icons'

import { useNavigate } from 'react-router-dom'

import md5 from 'md5'

import { useMousePosition } from './helpers/useMousePosition'

export default function Home({ setAuth }) {

  const navigate = useNavigate();

  const toast = useToast();

  const [userName, changeUserName] = useState('')

  const [userPassword, changeUserPassword] = useState('')

  const [hidePassword, changeHidePassword] = useState(false)

  const [isAuthenticating, changeIsAuthenticating] = useState(false)

  const mousePosition = useMousePosition();

  const [eyePos, changeEyePos] = useState({ x: 0, y: 0 })

  const clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max)
  }
  useEffect(() => {
    changeEyePos({
      x: clamp(mousePosition.x - window.innerWidth / 2 - 46, 5, 11),
      y: clamp(mousePosition.y - window.innerHeight / 2 + 265, 24, 32)
    })
  }, [mousePosition])

  const { colorMode, toggleColorMode } = useColorMode()

  function hashPassword(text) {
    if (text != '') {
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
          username: userName,
          userpassword: userPassword,
        },
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
                      <Text fontWeight="bold" fontSize="md" fontFamily="Inter" pr="8">
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
                  <Text fontWeight="bold" fontSize="md" fontFamily="Inter" pr="8">
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

  const primary = useColorModeValue('white', 'gray.700')
  const textColorVal = useColorModeValue('gray.800', 'white')
  const secondary = useColorModeValue('gray.200', 'gray.800')
  const footerDivider = useColorModeValue('gray.400', 'gray.700')
  return (
    <VStack w="100vw" h="100vh" justify="center" bg={secondary}>
      <HStack pos="absolute" right="2" top="2">
        <IconButton icon={<SunIcon />} onClick={toggleColorMode} variant="outline" borderColor={footerDivider} />
      </HStack>
      <VStack pb="32">
        <VStack>
          {/* <Text>{JSON.stringify({
              x: mousePosition.x - window.innerWidth / 2,
              y: mousePosition.y - window.innerHeight / 2
              })}</Text>
            <Text>{JSON.stringify(eyePos.x)}</Text> */}
        </VStack>
        <HStack spacing="0">
          <Text fontFamily="Inter" fontSize="4xl" fontWeight="bold">Employee L</Text>
          <HStack spacing="0" pos="relative">
            <Box pos="relative">
              <Box id="leftPupil" bg={textColorVal} p="0.5" pos="absolute" left={eyePos.x + "px"} top={eyePos.y + "px"} borderRadius="full" />
              <Text fontFamily="Inter" fontSize="4xl" fontWeight="normal">o</Text>
            </Box>
            <Box pos="relative">
              <Box id="rightPupil" bg={textColorVal} p="0.5" pos="absolute" left={eyePos.x + "px"} top={eyePos.y + "px"} borderRadius="full" />
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
                <Input placeholder="Username" variant="flushed" type="text" onChange={(e) => { changeUserName(e.target.value); }} />
                <InputLeftElement children={<Icon as={MdPerson} color="gray.300" />} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input placeholder="Password" variant="flushed" type={(hidePassword) ? 'text' : 'password'} onChange={(e) => { hashPassword(e.target.value); }} />
                <InputLeftElement children={<LockIcon color="gray.300" />} />
                <InputRightElement children={<IconButton icon={(!hidePassword) ? <ViewOffIcon w={4} h={4} /> : <ViewIcon w={4} h={4} />} size="sm" variant="link" />} onClick={() => { changeHidePassword(!hidePassword); }} />
              </InputGroup>
            </FormControl>
            <LightMode>
              <Button w="100%" colorScheme="green" type="submit" rightIcon={<ArrowForwardIcon />} isLoading={isAuthenticating} onClick={() => authenticateUser()} isDisabled={!(userName != '' && userPassword != '')}>
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