import React from 'react'
import { Box, HStack, Text } from '@chakra-ui/react'

export default function Navbar(props) {

    const h = props.navBarHeight + "px";

    return (
        <Box bg="gray.500" h={h} w="100vw" justify="center" pos="absolute" top="0">
            <HStack align="center" justify="center" h="100%" mx="3">
                <Text color="white" fontFamily="Inter" fontWeight="medium">Employee Lookup</Text>
            </HStack>
        </Box>
    )
}
