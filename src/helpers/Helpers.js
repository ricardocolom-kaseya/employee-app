import React from 'react'

import { Box, HStack, Text, CloseButton } from '@chakra-ui/react'

import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'

export const font1 = "Inter"

export function randomInt(max) {
    return Math.floor(Math.random() * max)
}

export function getToken() {
    return localStorage.getItem('token')
}

export function getAge(dob) {
    const today = new Date();

    const currAge = (today - dob) / 31536000000;
    return Math.floor(currAge);
}

export const SessionExpiredToast = (toast) => {

    if (!toast.isActive('sessionExpiredToast'))
        toast({
            id: 'sessionExpiredToast',
            render: () => (
                <Box color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="red.500">
                    <HStack position="relative" align="center" minH="26px">
                        <WarningIcon w={5} h={5} m="0.5" />
                        <Text fontWeight="bold" fontSize="md" fontFamily={font1} pr="8">
                            Session expired. Please log out.
                        </Text>
                        <CloseButton size="sm" pos="absolute" right="-8px" top="-8px" onClick={() => toast.closeAll()} />
                    </HStack>
                </Box>
            ), status: 'error', duration: 3000
        })
}

export const InvalidFieldsToast = (toast) => {
    if (!toast.isActive('invalidFieldsToast'))
        toast({
            id: 'invalidFieldsToast',
            render: () => (
                <Box color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="red.500">
                    <HStack position="relative" align="center" minH="26px">
                        <WarningIcon w={5} h={5} m="0.5" />
                        <Text fontWeight="bold" fontSize="md" fontFamily={font1} pr="8">
                            Please fix any empty or invalid fields.
                        </Text>
                        <CloseButton size="sm" pos="absolute" right="-8px" top="-8px" onClick={() => toast.closeAll()} />
                    </HStack>
                </Box>
            ), status: 'error', duration: 3000
        })
}

export const CopiedToast = ({ toast, type }) => {

    if (!toast.isActive(`${type} copiedToast`))
        toast({
            id: `${type} copiedToast`,
            render: () => (
                <Box color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="green.500">
                    <HStack position="relative" align="center" minH="26px">
                        <CheckCircleIcon w={5} h={5} m="0.5" />
                        <Text fontWeight="bold" fontSize="md" fontFamily={font1} pr="8">
                            {type} copied!
                        </Text>
                        <CloseButton size="sm" pos="absolute" right="-8px" top="-8px" onClick={() => toast.closeAll()} />
                    </HStack>
                </Box>
            ), status: 'success', duration: 3000
        })
}

export const useMousePosition = () => {
    const [mousePosition, setMousePosition] = React.useState({ x: null, y: null });

    React.useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return mousePosition;
};

export const clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max)
}