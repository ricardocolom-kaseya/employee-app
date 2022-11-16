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

const CardView = (props) => {

    // Creates a deep copy of all of the employees.
    let allEmployees = [...props.employees];

    const renderEmployees = () => {

        return (
            <VStack h="100%" spacing="0">
                {allEmployees.map((currEmployee, i) => {
                    if (currEmployee)
                        return (
                            <EmployeeCard employee={currEmployee} skills={props.skills} allEmployees={allEmployees} changeEmployees={props.changeEmployees} key={i} />
                        )
                })}
            </VStack>
        )
    }

    return (
        <HStack align="center" p="6px" spacing="0">
            {renderEmployees()}
            {renderEmployees()}
            {renderEmployees()}
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
        <VStack spacing="0" bg="gray.200" h="100%" alignSelf="stretch">
            <Navbar navBarHeight={props.navBarHeight} />
            <VStack align="left" w="100%" spacing="0" pt={pt}>
                <CardView employees={employees} changeEmployees={changeEmployees} skills={skills} changeSkills={changeSkills} />
            </VStack>
            <Box pos="fixed" w={controlPanelWidth} h="100vh" right="0" pt={pt}>
                <ControlPanel employees={employees} changeEmployees={changeEmployees} skills={skills} changeSkills={changeSkills} />
            </Box>
        </VStack>
    )
}
