import React from 'react'
import { Box, HStack, Text } from '@chakra-ui/react'

export default function Navbar() {
    return (
        <Box bg="gray.500" h="32px" maxW="100vw" justify="center">
            <HStack align="center" justify="center" h="100%" mx="3">
                <Text color="white" fontFamily="Inter" fontWeight="medium">Employee Lookup</Text>
            </HStack>
        </Box>
    )
}
