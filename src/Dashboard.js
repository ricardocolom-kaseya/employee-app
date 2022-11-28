import React, { useState, useEffect } from 'react'
import { Box, HStack, VStack, useColorModeValue, Text, CloseButton, useToast } from '@chakra-ui/react'

import { WarningIcon } from '@chakra-ui/icons'

import { Scrollbars } from 'react-custom-scrollbars-2'

import KaseyaLogoSmall from "./assets/kaseya-logo-small.png"

import EmployeeCard from './components/EmployeeCard'
import ControlPanel from './components/ControlPanel'
import Navbar from './Navbar'

const font1 = 'Inter';

function getToken(){
    return localStorage.getItem('token')
}

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
        <HStack w="100%" align="center" justify="center" spacing="1" h="100%" pt="2">
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

export default function Dashboard({ navBarHeight, setAuth }) {

    const [employees, changeEmployees] = useState([]);
    const [skills, changeSkills] = useState([]);

    const [search, changeSearch] = useState("");
    const [searchSkill, changeSearchSkill] = useState("")
    const [sortAsc, changeSortAsc] = useState(true);

    const primary = useColorModeValue('white', 'gray.800')
    const secondary = useColorModeValue('gray.200', 'gray.700')
    const textPrimary = useColorModeValue('gray.800', 'gray.300')

    const toast = useToast();

    useEffect(() => {

        // Get all skills
        fetch("http://localhost:4000/skills", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
        }
        ).then(
            response => {
                if (response.status != 200)
                    throw new Error(response.status)
                console.log("GET /skills Status Code: " + response.status)
                return response.json();
            }
        ).then(
            data => {
                changeSkills(data)
            }
        ).catch((err) => {
            if (!toast.isActive('sessionExpiredToast')) {
                toast({
                    id: 'sessionExpiredToast',
                    render: () => (
                        <Box color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="red.500">
                            <HStack position="relative" align="center" minH="26px">
                                <WarningIcon w={5} h={5} m="0.5" />
                                <Text fontWeight="bold" fontSize="md" fontFamily="Inter" pr="8">
                                    Session expired. Please log out.
                                </Text>
                                <CloseButton size="sm" pos="absolute" right="-8px" top="-8px" onClick={() => toast.closeAll()} />
                            </HStack>
                        </Box>
                    ), status: 'error', duration: 3000
                })
            }
        })
    }, [])

    function fetchEmployees() {
        let searchParams = { includesCharacters: search, includesSkill: searchSkill, order: (sortAsc ? "ASC" : "DESC") }
        // Get all employees
        fetch("http://localhost:4000/employees", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`,
                "Search": JSON.stringify(searchParams),
            },
        }).then(
            response => {
                if (response.status != 200)
                    throw new Error(response.status)
                console.log("GET /employees Status Code: " + response.status);
                return response.json()
            }
        ).then(
            data => {
                let toEmployees = [...data];
                toEmployees.forEach(employee => {
                    employee.dob = new Date(employee.dob)
                });
                changeEmployees(toEmployees)
            }
        ).catch((err) => {
            toast({
                id: 'sessionExpiredToast',
                render: () => (
                    <Box color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="red.500">
                        <HStack position="relative" align="center" minH="26px">
                            <WarningIcon w={5} h={5} m="0.5" />
                            <Text fontWeight="bold" fontSize="md" fontFamily="Inter" pr="8">
                                Session expired. Please log out.
                            </Text>
                            <CloseButton size="sm" pos="absolute" right="-8px" top="-8px" onClick={() => toast.closeAll()} />
                        </HStack>
                    </Box>
                ), status: 'error', duration: 3000
            })
        })
    }

    useEffect(() => {
        fetchEmployees();
    }, [search, searchSkill, sortAsc])

    const cardViewWidth = (window.innerWidth - 320) + "px"

    return (
        <HStack spacing="0" h="100vh" w="100%" bg={secondary}>
            <VStack h="100%" w={cardViewWidth} spacing="0" pt={navBarHeight + "px"}>
                <Scrollbars>
                    <CardView
                        employees={employees}
                        changeEmployees={changeEmployees}
                        skills={skills}
                        changeSkills={changeSkills} />
                </Scrollbars>
            </VStack>
            <Box h="100%" pos="absolute">
                <Navbar navBarHeight={navBarHeight} />
                <ControlPanel
                    setAuth={setAuth}
                    changeSearch={changeSearch}
                    changeSearchSkill={changeSearchSkill}
                    changeSortAsc={changeSortAsc}
                    employees={employees}
                    changeEmployees={changeEmployees}
                    skills={skills}
                    changeSkills={changeSkills} />
            </Box>
        </HStack>
    )
}
