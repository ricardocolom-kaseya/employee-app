import React from 'react'
import { Box, HStack, Text, useColorModeValue } from '@chakra-ui/react'

import { font1 } from './helpers/Helpers'

export default function Navbar({ navBarHeight }) {

    const h = navBarHeight + "px";

    const primary = useColorModeValue('white', 'gray.800')

    return (
        <Box bg={primary} shadow="md" h={h} w="100vw" zIndex="0" pos="fixed" left="0" align="center" justify="center">
            <HStack w="100%" h="100%" align="center" justify="center">
                <Text fontFamily={font1} fontWeight="medium">Employee Lookup</Text>
            </HStack>
        </Box>
    )
}
