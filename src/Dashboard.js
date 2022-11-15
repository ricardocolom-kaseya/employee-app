import React, { useState, useEffect } from 'react'
import { Avatar, Box, Text, HStack, VStack, Heading, AvatarBadge, Input, Code, Button, Tooltip, Icon, IconButton, Switch, Divider, useDisclosure, Select, SimpleGrid } from '@chakra-ui/react'
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
import {NameHeader, EmailHeader, DOBHeader, SkillsHeader} from './components/ModalHeaders'

const font1 = 'Inter';

const today = new Date();

const CardView = (props) => {

    // Creates a deep copy of all of the employees.
    let allEmployees = [...props.employees];

    const renderEmployees = () => {

        return (
            <VStack h="100%">
                {allEmployees.map((currEmployee, i) => {
                    if(currEmployee)
                    return (
                        <EmployeeCard employee={currEmployee} skills={props.skills} allEmployees={allEmployees} changeEmployees={props.changeEmployees} key={i} />
                    )
                })}
            </VStack>
        )
    }

    return (
        <HStack m="4" align="center">
            {renderEmployees()}
        </HStack>
    )
}

export default function Dashboard(props) {

    const [employees, changeEmployees] = useState([]);
    const [skills, changeSkills] = useState([]);

    useEffect(() => {
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
    }, [])

    useEffect(() => {
        console.log(employees)
    }, [employees])

    const pt = props.navBarHeight + "px"

    return (
        <Box bg="gray.100" maxW="100vw" h="100vh" pt={pt}>
            <HStack spacing="0" w="100%" h="100%">
                <VStack w="100%" h="100%" bg="gray.200" align="center">
                    <CardView employees={employees} changeEmployees={changeEmployees} skills={skills} changeSkills={changeSkills} />
                </VStack>
                <VStack w="424px" h="100%">
                    <ControlPanel employees={employees} changeEmployees={changeEmployees} skills={skills} changeSkills={changeSkills} />
                </VStack>
            </HStack>
        </Box>
    )
}
