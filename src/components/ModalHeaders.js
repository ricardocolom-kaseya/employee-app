import React from 'react'

import { HStack, Icon, Box, Text, FormLabel } from '@chakra-ui/react'
import { MdCake, MdWork, MdBadge, MdPerson, MdEmail } from 'react-icons/md'

import { font1 } from '../helpers/Helpers'

export const NameHeader = () => {
    return (
        <>
            <HStack position="absolute" spacing="2">
                <Icon as={MdPerson} boxSize={4} position="absolute" top="4px" />
                <Box w="1" />
                <Text fontWeight="medium" fontFamily={font1}>Name</Text>
            </HStack>
            <FormLabel position="absolute" left="63px"></FormLabel>
            <Text color="transparent" pb="2" fontFamily={font1}>invisible</Text>
        </>

    )
}

export const EmailHeader = () => {
    return (
        <>
            <HStack position="absolute" spacing="2">
                <Icon as={MdEmail} boxSize={4} position="absolute" top="5px" />
                <Box w="1" />
                <Text fontWeight="medium" fontFamily={font1}>Email</Text>
            </HStack>
            <FormLabel position="absolute" left="59px"></FormLabel>
            <Text color="transparent" pb="2" fontFamily={font1}>invisible</Text>
        </>
    )
}

export const DOBHeader = () => {
    return (
        <>
            <HStack position="absolute" spacing="2">
                <Icon as={MdCake} boxSize={4} position="absolute" top="3px" />
                <Box w="1" />
                <Text fontWeight="medium" fontFamily={font1}>Birthday</Text>
                <Text pt="1" pl="8" w="100%" textAlign="center" fontFamily={font1} fontStyle="italic">Must be over 18</Text>
            </HStack>
            <FormLabel position="absolute" left="83px"></FormLabel>
            <Text color="transparent" pb="2" fontFamily={font1}>invisible</Text>
        </>
    )
}

export const SkillsHeader = () => {
    return (
        <>
            <HStack position="absolute" spacing="2">
                <Icon as={MdBadge} boxSize={4} position="absolute" top="3px" />
                <Box w="1" />
                <Text fontWeight="medium" fontFamily={font1}>Skill</Text>
            </HStack>
            <FormLabel position="absolute" left="50px"></FormLabel>
            <Text color="transparent" pb="2" fontFamily={font1}>invisible</Text>
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
                    <Text fontWeight="medium" fontFamily={font1}>Activity</Text>
                </HStack>
                <FormLabel position="absolute" left="83px"></FormLabel>
                <Text color="transparent" pb="2" fontFamily={font1}>invisible</Text>
            </HStack>
        </>
    )
}