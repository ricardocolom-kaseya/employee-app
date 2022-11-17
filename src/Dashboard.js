import React, { useState, useEffect } from 'react'
import { Avatar, Box, Text, HStack, VStack, useColorModeValue } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'

import KaseyaLogoSmall from "./assets/kaseya-logo-small.png"

import EmployeeCard from './components/EmployeeCard'
import ControlPanel from './components/ControlPanel'
import Navbar from './Navbar'

const font1 = 'Inter';

const today = new Date();

const controlPanelWidth = "320"

const width = "" + (window.innerWidth - controlPanelWidth) + "px";

const CardView = ({ employees, changeEmployees, skills }) => {

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
        <HStack w="100%" align="left" justify="center" p="6px" spacing="0" h="100%">
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

export default function Dashboard({ navBarHeight }) {

    const [employees, changeEmployees] = useState([]);
    const [skills, changeSkills] = useState([]);

    const primary = useColorModeValue('white', 'gray.800')
    const secondary = useColorModeValue('gray.200', 'gray.700')
    const textPrimary = useColorModeValue('gray.800', 'gray.300')

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight }
    }

    const [windowSize, setWindowSize] = useState(getWindowSize())

    useEffect(() => {

        // Get all skills
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

        // Get all employees
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

        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [])

    let width = "" + (windowSize.innerWidth - controlPanelWidth - 20) + "px"

    return (
        <VStack align="left" spacing="0" minH="100vh" maxW="100vw" bg={secondary}>
            <Navbar navBarHeight={navBarHeight} />
            <HStack w={width} h="100%" spacing="0" pt={navBarHeight + "px"}>
                <CardView windowSize={windowSize} employees={employees} changeEmployees={changeEmployees} skills={skills} changeSkills={changeSkills} />
            </HStack>
            <Box pos="fixed" w={controlPanelWidth + "px"} h="100vh" right="0" pt={navBarHeight + "px"}>
                <ControlPanel employees={employees} changeEmployees={changeEmployees} skills={skills} changeSkills={changeSkills} />
            </Box>
        </VStack>
    )
}
