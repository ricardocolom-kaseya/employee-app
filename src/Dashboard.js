import React, { useState, useEffect } from 'react'
import { Box, HStack, VStack, useColorModeValue } from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'

import { Scrollbars } from 'react-custom-scrollbars-2'

import { getToken } from './helpers/Helpers'

import EmployeeCard from './components/EmployeeCard'
import ControlPanel from './components/ControlPanel'
import Navbar from './Navbar'

const CardView = ({ employees, changeEmployees, skills }) => {

    let leftCol = [];
    let midCol = [];
    let rightCol = [];

    employees.forEach(element => {
        if (employees.indexOf(element) % 3 === 0)
            leftCol.push(element)
        else if (employees.indexOf(element) % 3 === 1)
            midCol.push(element)
        else
            rightCol.push(element)
    });

    return (
        <HStack w="100%" align="center" justify="center" spacing="1" h="100%" pt="2">
            <VStack h="100%" spacing="0">
                {leftCol.map((currEmployee, i) => {
                    return <EmployeeCard employee={currEmployee} skills={[...skills]} employees={[...employees]} changeEmployees={changeEmployees} key={i} />
                })}
            </VStack>
            <VStack h="100%" spacing="0">
                {midCol.map((currEmployee, i) => {
                    return <EmployeeCard employee={currEmployee} skills={[...skills]} employees={[...employees]} changeEmployees={changeEmployees} key={i} />
                })}
            </VStack>
            <VStack h="100%" spacing="0">
                {rightCol.map((currEmployee, i) => {
                    return <EmployeeCard employee={currEmployee} skills={[...skills]} employees={[...employees]} changeEmployees={changeEmployees} key={i} />
                })}
            </VStack>
        </HStack>
    )
}

export default function Dashboard({ navBarHeight }) {

    const [employees, changeEmployees] = useState([]);
    const [skills, changeSkills] = useState([]);

    const [search, changeSearch] = useState("");
    const [searchSkill, changeSearchSkill] = useState("")
    const [sortAsc, changeSortAsc] = useState(true);

    const secondary = useColorModeValue('gray.200', 'gray.700')

    const navigate = useNavigate();

    useEffect(() => {

        function fetchSkills() {
            // Get all skills
            fetch("http://localhost:4000/skills", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                }
            }
            ).then(
                response => {
                    if (response.status !== 200)
                        throw new Error(response.status)
                    console.log("GET /skills Status Code: " + response.status)
                    return response.json();
                }
            ).then(
                data => {
                    changeSkills(data)
                }
            ).catch((err) => {
                navigate("/login")
            })
        }

        fetchSkills();

    }, [navigate])

    useEffect(() => {

        function fetchEmployees() {
            let searchParams = { includesCharacters: search.toLowerCase(), includesSkill: searchSkill, order: (sortAsc ? "ASC" : "DESC") }
            // Get all employees
            fetch("http://localhost:4000/employees", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`,
                    "Search": JSON.stringify(searchParams),
                },
            }).then(
                response => {
                    if (response.status !== 200)
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
            )
        }

        fetchEmployees();
    }, [search, searchSkill, sortAsc])

    const cardViewWidth = (window.innerWidth - 320) + "px"

    return (
        <HStack spacing="0" h="100vh" w="100%" bg={secondary} justify="left">
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
