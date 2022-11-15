import React from 'react'

import { HStack, Icon, Box, Text, FormLabel } from '@chakra-ui/react'
import { MdCake, MdWork, MdOutlineDelete, MdSave, MdBadge, MdPerson, MdEmail, MdAddCircle, MdDelete } from 'react-icons/md'

export const NameHeader = () => {
    return (
        <>
            <HStack position="absolute" spacing="2">
                <Icon as={MdPerson} boxSize={4} position="absolute" top="4px" />
                <Box w="1" />
                <Text fontWeight="medium" fontFamily="Inter">Name</Text>
            </HStack>
            <FormLabel position="absolute" left="63px"></FormLabel>
            <Text color="transparent" pb="2" fontFamily="Inter">invisible</Text>
        </>

    )
}

export const EmailHeader = () => {
    return (
        <>
            <HStack position="absolute" spacing="2">
                <Icon as={MdEmail} boxSize={4} position="absolute" top="5px" />
                <Box w="1" />
                <Text fontWeight="medium" fontFamily="Inter">Email</Text>
            </HStack>
            <FormLabel position="absolute" left="59px"></FormLabel>
            <Text color="transparent" pb="2" fontFamily="Inter">invisible</Text>
        </>
    )
}

export const DOBHeader = () => {
    return (
        <>
            <HStack position="absolute" spacing="2">
                <Icon as={MdCake} boxSize={4} position="absolute" top="3px" />
                <Box w="1" />
                <Text fontWeight="medium" fontFamily="Inter">Birthday</Text>
            </HStack>
            <FormLabel position="absolute" left="83px"></FormLabel>
            <Text color="transparent" pb="2" fontFamily="Inter">invisible</Text>
        </>
    )
}

export const SkillsHeader = () => {
    return (
        <>
            <HStack position="absolute" spacing="2">
                <Icon as={MdBadge} boxSize={4} position="absolute" top="3px" />
                <Box w="1" />
                <Text fontWeight="medium" fontFamily="Inter">Skills</Text>
            </HStack>
            <FormLabel position="absolute" left="58px"></FormLabel>
            <Text color="transparent" pb="2" fontFamily="Inter">invisible</Text>
        </>
    )
}

export const ActivityHeader = () => {
    return (
        <>
            <HStack w="100%">
                <HStack position="absolute" spacing="2">
                    <Icon as={MdWork} boxSize={4} position="absolute" top="4px" />
                    <Box w="1" />
                    <Text fontWeight="medium" fontFamily="Inter">Activity</Text>
                </HStack>
                <FormLabel position="absolute" left="83px"></FormLabel>
                <Text color="transparent" pb="2" fontFamily="Inter">invisible</Text>
            </HStack>
        </>
    )
}