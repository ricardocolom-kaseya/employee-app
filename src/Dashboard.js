import React, { useState, useEffect } from 'react'
import { Box, HStack, VStack, useColorModeValue, Text, CloseButton, useToast } from '@chakra-ui/react'

import { WarningIcon } from '@chakra-ui/icons'

import KaseyaLogoSmall from "./assets/kaseya-logo-small.png"

import EmployeeCard from './components/EmployeeCard'
import ControlPanel from './components/ControlPanel'
import Navbar from './Navbar'

const font1 = 'Inter';

const today = new Date();

const controlPanelWidth = "320"

const width = "" + (window.innerWidth - controlPanelWidth) + "px";

const CardView = ({ token, employees, changeEmployees, skills }) => {

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
                            <EmployeeCard token={token} employee={currEmployee} skills={[...skills]} employees={[...employees]} changeEmployees={changeEmployees} key={i} />
                        )
                })}
            </VStack>
            <VStack h="100%" spacing="0">
                {midCol.map((currEmployee, i) => {
                    if (currEmployee)
                        return (
                            <EmployeeCard token={token} employee={currEmployee} skills={[...skills]} employees={[...employees]} changeEmployees={changeEmployees} key={i} />
                        )
                })}
            </VStack>
            <VStack h="100%" spacing="0">
                {rightCol.map((currEmployee, i) => {
                    if (currEmployee)
                        return (
                            <EmployeeCard token={token} employee={currEmployee} skills={[...skills]} employees={[...employees]} changeEmployees={changeEmployees} key={i} />
                        )
                })}
            </VStack>
        </HStack>
    )
}

export default function Dashboard({ navBarHeight, setAuth, token, changeToken }) {

    const [employees, changeEmployees] = useState([]);
    const [skills, changeSkills] = useState([]);

    const [search, changeSearch] = useState("");
    const [searchSkill, changeSearchSkill] = useState("")
    const [sortAsc, changeSortAsc] = useState(true);

    const primary = useColorModeValue('white', 'gray.800')
    const secondary = useColorModeValue('gray.200', 'gray.700')
    const textPrimary = useColorModeValue('gray.800', 'gray.300')

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight }
    }

    const [windowSize, setWindowSize] = useState(getWindowSize())

    const toast = useToast();

    useEffect(() => {

        // Get all skills
        fetch("http://localhost:4000/skills", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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
                                    Session Expired. Log out.
                                </Text>
                                <CloseButton size="sm" pos="absolute" right="-8px" top="-8px" onClick={() => toast.closeAll()} />
                            </HStack>
                        </Box>
                    ), status: 'error', duration: 3000
                })
            }
        })

        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [])

    function fetchEmployees() {
        let searchParams = { includesCharacters: search, includesSkill: searchSkill, order: (sortAsc ? "ASC" : "DESC") }
        // Get all employees
        fetch("http://localhost:4000/employees", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
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
                                Session Expired. Log out.
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

    let width = "" + (windowSize.innerWidth - controlPanelWidth - 20) + "px"

    return (
        <VStack align="left" spacing="0" minH="100vh" w={width} bg={secondary}>
            <Navbar navBarHeight={navBarHeight} width={width} />
            <HStack w={width} h="100%" spacing="0" pt={navBarHeight + "px"}>
                <CardView
                    windowSize={windowSize}
                    token={token}
                    employees={employees}
                    changeEmployees={changeEmployees}
                    skills={skills}
                    changeSkills={changeSkills} />
            </HStack>
            <Box pos="fixed" w={controlPanelWidth + "px"} h="100vh" right="0">
                <ControlPanel
                    token={token}
                    changeToken={changeToken}
                    setAuth={setAuth}
                    changeSearch={changeSearch}
                    changeSearchSkill={changeSearchSkill}
                    changeSortAsc={changeSortAsc}
                    employees={employees}
                    changeEmployees={changeEmployees}
                    skills={skills}
                    changeSkills={changeSkills} />
            </Box>
        </VStack>
    )
}
