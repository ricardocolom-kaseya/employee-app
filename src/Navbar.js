import React from 'react'
import { Box, HStack, Text, useColorModeValue } from '@chakra-ui/react'

export default function Navbar({ navBarHeight, width }) {

    const h = navBarHeight + "px";

    const primary = useColorModeValue('white', 'gray.800')
    const secondary = useColorModeValue('gray.200', 'gray.700')
    const tertiary = useColorModeValue('white', 'gray.600')
    const textPrimary = useColorModeValue('gray.800', 'gray.300')

    return (
        <Box bg={primary} shadow="md" h={h} w="100vw" zIndex="0" pos="fixed" left="0" align="center" justify="center">
            <HStack w="100%" h="100%" align="center" justify="center">
                <Text fontFamily="Inter" fontWeight="medium">Employee Lookup</Text>
            </HStack>
        </Box>
    )
}
