import React, { useState, useEffect } from 'react'
import { Avatar, Box, Text, HStack, VStack, Heading, AvatarBadge, Input, Code, Button, Tooltip, Icon, IconButton, Switch, Divider, useDisclosure, Select, SimpleGrid, Flex } from '@chakra-ui/react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, SearchIcon, SunIcon, MoonIcon, ChevronDownIcon, CheckIcon } from '@chakra-ui/icons'
import { MdCake, MdOutlineDelete, MdSave, MdBadge, MdPerson, MdEmail, MdAddCircle, MdDelete } from 'react-icons/md'

import { faker } from '@faker-js/faker';

import KaseyaLogoSmall from "./assets/kaseya-logo-small.png"

import EmployeeCard from './components/EmployeeCard'
import ControlPanel from './components/ControlPanel'
import { NameHeader, EmailHeader, DOBHeader, SkillsHeader } from './components/ModalHeaders'
import Navbar from './Navbar'

const font1 = 'Inter';

const today = new Date();

const CardView = ({employees, changeEmployees, skills}) => {

    let leftCol = [];
    let midCol = [];
    let rightCol = [];

    employees.forEach(element => {
        if (employees.indexOf(element) % 3 == 0)
            leftCol.push(element)
        else if (employees.indexOf(element) % 3 == 1)
            midCol.push(element)
        else
            rightCol.push(element)
    });

    return (
        <HStack align="left" p="6px" spacing="0" h="100%">
            <VStack h="100%" spacing="0">
                {leftCol.map((currEmployee, i) => {
                    if (currEmployee)
                        return (
                            <EmployeeCard employee={currEmployee} skills={[...skills]} employees={[...employees]} changeEmployees={changeEmployees} key={i} />
                        )
                })}
            </VStack>
            <VStack h="100%" spacing="0">
                {midCol.map((currEmployee, i) => {
                    if (currEmployee)
                        return (
                            <EmployeeCard employee={currEmployee} skills={[...skills]} employees={[...employees]} changeEmployees={changeEmployees} key={i} />
                        )
                })}
            </VStack>
            <VStack h="100%" spacing="0">
                {rightCol.map((currEmployee, i) => {
                    if (currEmployee)
                        return (
                            <EmployeeCard employee={currEmployee} skills={[...skills]} employees={[...employees]} changeEmployees={changeEmployees} key={i} />
                        )
                })}
            </VStack>
        </HStack>
    )
}

export default function Dashboard(props) {

    const [employees, changeEmployees] = useState([]);
    const [skills, changeSkills] = useState([]);

    useEffect(() => {

        fetch("http://localhost:4000/getskills", {
            headers: {
                'testHeader': "Test"
            }
        }).then(
            response => response.json()
        ).then(
            data => {
                changeSkills(data)
            }
        )

        fetch("http://localhost:4000/getemployees", {
            headers: {
                'testHeader': "Test"
            }
        }).then(
            response => response.json()
        ).then(
            data => {
                let toEmployees = data;
                toEmployees.forEach(employee => {
                    employee.dob = new Date(employee.dob)
                });
                changeEmployees(toEmployees)
            }
        )
    }, [])

    const pt = props.navBarHeight + "px"

    const controlPanelWidth = "316px"

    const width = window.innerWidth;

    const cardViewWidth = (width - controlPanelWidth) + "px";

    return (
        <VStack spacing="0" minH="100vh" alignSelf="stretch" bg="gray.200">
            <Navbar navBarHeight={props.navBarHeight} />
            <VStack align="left" w="100%" h="100%" spacing="0" pt={pt}>
                <CardView employees={employees} changeEmployees={changeEmployees} skills={skills} changeSkills={changeSkills} />
            </VStack>
            <Box pos="fixed" w={controlPanelWidth} h="100vh" right="0" pt={pt}>
                <ControlPanel employees={employees} changeEmployees={changeEmployees} skills={skills} changeSkills={changeSkills} />
            </Box>
        </VStack>
    )
}
