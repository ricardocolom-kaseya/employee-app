import React from 'react'
import { Box, HStack, Text, useColorModeValue } from '@chakra-ui/react'

export default function Navbar({navBarHeight, width}) {

    const h = navBarHeight + "px";

    const primary = useColorModeValue('white', 'gray.800')
    const secondary = useColorModeValue('gray.200', 'gray.700')
    const tertiary = useColorModeValue('white', 'gray.600')
    const textPrimary = useColorModeValue('gray.800', 'gray.300')

    return (
        <Box bg={tertiary} shadow="md" h={h} w={width} justify="center" pos="fixed" left="0" top="0" zIndex="2">
            <HStack align="center" justify="center" h="100%" mx="3">
                <Text fontFamily="Inter" fontWeight="medium">Employee Lookup</Text>
            </HStack>
        </Box>
    )
}
