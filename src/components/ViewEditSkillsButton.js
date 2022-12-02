import React, { useState, useEffect } from 'react'
import { Box, Text, HStack, VStack, CloseButton, Input, Button, Icon, useDisclosure, useColorModeValue, Textarea, useToast, LightMode } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
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
import { EditIcon, CheckIcon, CheckCircleIcon } from '@chakra-ui/icons'
import { MdSave, MdBadge, MdAddCircle } from 'react-icons/md'

import validator from 'validator'

import { font1, getToken, SessionExpiredToast, InvalidFieldsToast } from '../helpers/Helpers'

export default function ViewEditSkillsButton({ skills, changeSkills }) {

    const toast = useToast();

    const [modalSkills, changeModalSkills] = useState([])

    const primary = useColorModeValue('white', 'gray.800')
    const borderColorVal = useColorModeValue('gray.200', 'gray.600')
    const textPrimary = useColorModeValue('gray.800', 'gray.300')

    // This is absolutely necessary as modalSkills hook is always loaded as long as the control panel is rendered, and it MUST change whenever skills changes.
    useEffect(() => {
        changeModalSkills([...skills])
    }, [skills])

    const { isOpen: isViewSkillsOpen, onOpen: onViewSkillsOpen, onClose: onViewSkillsClose } = useDisclosure()

    const [index, changeIndex] = useState(0)

    if (modalSkills.length > 0 && index >= modalSkills.length)
        changeIndex(index - 1)

    const { isOpen: isEditSkillOpen, onOpen: onEditSkillOpen, onClose: onEditSkillClose } = useDisclosure()

    const { isOpen: isNewSkillOpen, onOpen: onNewSkillOpen, onClose: onNewSkillClose } = useDisclosure()

    const ShowSelectedIcon = (i) => {
        if (i === index)
            return (
                <CheckIcon color={textPrimary} />
            )
    }

    const ShowSkillTable = () => {
        if (modalSkills.length > 0)
            return (
                <VStack spacing="0" w="100%" pb="6">
                    {modalSkills.map((skill, i) => {
                        return (
                            <Box onClick={() => { changeIndex(i) }}
                                _hover={primary === 'white' ? { background: "gray.100", cursor: "pointer", transition: "linear 0.1s" } : { background: "whiteAlpha.200", cursor: "pointer", transition: "linear 0.1s" }}
                                key={i}
                                w="100%"
                                border="1px"
                                borderBottom={(i < modalSkills.length - 1) ? "0px" : "1px"} borderTopRadius={(i === 0) ? "md" : "0px"} borderBottomRadius={(i === modalSkills.length - 1) ? "md" : "0px"}
                                borderColor={borderColorVal}
                                p="2">
                                <HStack justify="space-between" px="2">
                                    <Text textAlign="left" fontFamily={font1}>{skill.skill_name}</Text>
                                    {ShowSelectedIcon(i)}
                                </HStack>
                            </Box>
                        )
                    })}
                </VStack>
            )
    }

    const ShowDeleteSelectedSkillButton = () => {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const cancelRef = React.useRef();

        const handleDeleteSkill = () => {
            let skillID = modalSkills[index].skill_id

            fetch("http://localhost:4000/skills", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ skill_id: skillID })
            }).then(
                response => {
                    if (response.status !== 200)
                        throw new Error(response.status)
                    console.log("DELETE /skills Status Code: " + response.status);
                    return response.json()
                }
            ).then(
                data => {
                    // console.log("Skill deleted...")
                    let newAllSkills = [];

                    for (var i = 0; i < modalSkills.length; ++i) {
                        if (modalSkills[i].skill_id !== skillID)
                            newAllSkills.push(modalSkills[i])
                    }

                    changeModalSkills(newAllSkills);
                }
            ).catch((err) => {
                SessionExpiredToast(toast)
            })
        }

        if (modalSkills.length > 0) {

            return (
                <>
                    <LightMode>
                        <Button onClick={onOpen} fontFamily={font1} colorScheme="red" fontWeight="normal">Delete Selected</Button>
                    </LightMode>
                    <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                        isCentered
                        motionPreset="slideInBottom"
                        preserveScrollBarGap
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='medium' fontFamily={font1}>
                                    Delete Skill
                                </AlertDialogHeader>
                                <AlertDialogBody>
                                    <Text fontFamily={font1}>Are you sure you would like to delete <strong>{modalSkills[index].skill_name}</strong>?</Text>
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button fontFamily={font1} fontWeight="normal" ref={cancelRef} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <LightMode>
                                        <Button fontFamily={font1} fontWeight="normal" colorScheme='red' onClick={handleDeleteSkill} ml={3}>
                                            Delete
                                        </Button>
                                    </LightMode>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </>
            )
        }
    }

    const ShowEditSkillButton = () => {
        if (modalSkills.length > 0) {
            return (
                <Button my="4" rightIcon={<EditIcon w={4} h={4} />} onClick={onEditSkillOpen}>
                    <Text w="100%" textAlign="left" fontWeight="normal" fontFamily={font1}>
                        Edit
                    </Text>
                </Button>
            )
        }
    }

    const EditSkillModalContent = () => {

        let defaultName = modalSkills[index].skill_name
        let defaultDesc = modalSkills[index].skill_desc

        const [skillName, changeSkillName] = useState(defaultName)
        const [skillDesc, changeSkillDesc] = useState(defaultDesc)

        const [skillNameValid, changeSkillNameValid] = useState(true);
        const [skillDescValid, changeSkillDescValid] = useState(true);

        const handleChangeSkillName = (theSkillName) => {

            let checkedAgainst = theSkillName.replace(/'/g, ""
            ).replace(/ /g, ""
            ).replace(/"/g, ""
            ).replace(/\./g, ""
            ).replace(/,/g, "")

            changeSkillNameValid(validator.isAlphanumeric(checkedAgainst) && theSkillName.slice(-1) !== "'")
            changeSkillName(theSkillName)
        }

        const handleChangeSkillDesc = (theSkillDesc) => {

            let checkedAgainst = theSkillDesc.replace(/'/g, ""
            ).replace(/ /g, ""
            ).replace(/"/g, ""
            ).replace(/\./g, ""
            ).replace(/,/g, ""
            ).replace(/\(|\)/g, "")

            changeSkillDescValid(validator.isAlphanumeric(checkedAgainst) && theSkillDesc.slice(-1) !== "'")
            changeSkillDesc(theSkillDesc)
        }

        function allValid() {
            return (skillNameValid && skillDescValid)
        }

        const handleEditSkill = () => {
            if (allValid()) {
                let skillID = modalSkills[index].skill_id

                // console.log("Attempting to edit skill " + skillName)

                let putURL = "http://localhost:4000/skills/" + skillID

                let skill_name = skillName.replace(/'/g, "''")
                let skill_desc = skillDesc.replace(/'/g, "''")

                let skillInfo = { skill_name, skill_desc }

                fetch(putURL, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getToken()}`,
                    },
                    body: JSON.stringify(skillInfo)
                }).then(
                    response => {
                        if (response.status !== 200)
                            throw new Error(response.status)
                        console.log("PUT /skills Status Code: " + response.status);
                        return response.json()
                    }
                ).then(
                    data => {
                        onEditSkillClose();

                        toast({
                            render: () => (
                                <Box color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="green.500">
                                    <HStack position="relative" align="center" minH="26px">
                                        <CheckCircleIcon w={5} h={5} m="0.5" />
                                        <Text fontWeight="bold" fontSize="md" fontFamily={font1} pr="8">
                                            Saved!
                                        </Text>
                                        <CloseButton size="sm" pos="absolute" right="-8px" top="-8px" onClick={() => toast.closeAll()} />
                                    </HStack>
                                </Box>
                            ), status: 'error', duration: 3000
                        })

                        let editedSkill = { skill_id: skillID, skill_name: skillName, skill_desc: skillDesc }

                        let newAllSkills = [...modalSkills]

                        for (var i = 0; i < newAllSkills.length; ++i) {
                            if (newAllSkills[i].skill_id === skillID) {
                                newAllSkills[i] = editedSkill;
                            }
                        }

                        changeModalSkills(newAllSkills);
                    }
                ).catch((err) => {
                    SessionExpiredToast(toast)
                })
            }
            else {
                InvalidFieldsToast(toast)
            }
        }

        return (
            <ModalContent>
                <ModalHeader fontFamily={font1} fontWeight="medium">Edit Skill</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack spacing="8">
                        <VStack spacing="8" w="1200px" h="328px">
                            <FormControl isRequired isInvalid={(!skillNameValid && skillName.length > 0)}>
                                <FormLabel fontFamily={font1}>Name</FormLabel>
                                <Input fontFamily={font1} value={skillName} onChange={(e) => handleChangeSkillName(e.target.value)} />
                            </FormControl>
                            <FormControl isRequired mt="8" isInvalid={(!skillDescValid && skillDesc.length > 0)}>
                                <FormLabel fontFamily={font1}>Description</FormLabel>
                                <Textarea fontFamily={font1} value={skillDesc} onChange={(e) => handleChangeSkillDesc(e.target.value)} />
                            </FormControl>
                        </VStack>
                    </HStack>
                </ModalBody>
                <ModalFooter>
                    <HStack>
                        <Button onClick={onEditSkillClose} fontFamily={font1} fontWeight="normal">
                            Cancel
                        </Button>
                        <Button my="4" colorScheme="blue" variant="outline" rightIcon={<Icon as={MdSave} w={4} h={4} />} onClick={handleEditSkill}>
                            <Text w="100%" textAlign="left" fontWeight="normal" fontFamily={font1}>
                                Save
                            </Text>
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        )
    }

    const NewSkillModalContent = () => {

        const [skillName, changeSkillName] = useState("")
        const [skillDesc, changeSkillDesc] = useState("")

        const [skillNameValid, changeSkillNameValid] = useState(false);
        const [skillDescValid, changeSkillDescValid] = useState(false);

        const handleChangeSkillName = (theSkillName) => {

            let checkedAgainst = theSkillName.replace(/'/g, ""
            ).replace(/ /g, ""
            ).replace(/"/g, ""
            ).replace(/\./g, ""
            ).replace(/,/g, "")

            changeSkillNameValid(validator.isAlphanumeric(checkedAgainst) && theSkillName.slice(-1) !== "'")
            changeSkillName(theSkillName)
        }

        const handleChangeSkillDesc = (theSkillDesc) => {

            let checkedAgainst = theSkillDesc.replace(/'/g, ""
            ).replace(/ /g, ""
            ).replace(/"/g, ""
            ).replace(/\./g, ""
            ).replace(/,/g, ""
            ).replace(/\(|\)/g, "")

            changeSkillDescValid(validator.isAlphanumeric(checkedAgainst) && theSkillDesc.slice(-1) !== "'")
            changeSkillDesc(theSkillDesc)
        }

        function allValid() {
            return (skillNameValid && skillDescValid)
        }

        const handleAddSkill = () => {

            if (allValid()) {

                let skill_name = skillName.replace(/'/g, "''")
                let skill_desc = skillDesc.replace(/'/g, "''")

                let skillInfo = { skill_name, skill_desc }

                fetch("http://localhost:4000/skills", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getToken()}`,
                    },
                    body: JSON.stringify(skillInfo)
                }).then(
                    response => {
                        if (response.status !== 200)
                            throw new Error(response.status)
                        console.log("POST /skills Status Code: " + response.status);
                        return response.json()
                    }
                ).then(
                    data => {
                        onNewSkillClose();

                        toast({
                            render: () => (
                                <Box color="white" p={3} align="center" borderRadius="md" minW="300px" minH="26px" bg="green.500">
                                    <HStack position="relative" align="center" minH="26px">
                                        <CheckCircleIcon w={5} h={5} m="0.5" />
                                        <Text fontWeight="bold" fontSize="md" fontFamily={font1} pr="8">
                                            Added a skill!
                                        </Text>
                                        <CloseButton size="sm" pos="absolute" right="-8px" top="-8px" onClick={() => toast.closeAll()} />
                                    </HStack>
                                </Box>
                            ), duration: 3000
                        })

                        let newSkill = { skill_id: data, skill_name: skillName, skill_desc: skillDesc }

                        let newAllSkills = [...modalSkills]
                        newAllSkills.push(newSkill)
                        changeModalSkills(newAllSkills);
                    }
                ).catch((err) => {
                    SessionExpiredToast(toast)
                })
            }
            else {
                InvalidFieldsToast(toast)
            }
        }

        return (
            <ModalContent>
                <ModalHeader fontFamily={font1} fontWeight="medium">New Skill</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack spacing="8">
                        <VStack spacing="8" w="1200px" h="328px">
                            <FormControl isRequired isInvalid={(!skillNameValid && skillName.length > 0)}>
                                <FormLabel fontFamily={font1}>Name</FormLabel>
                                <Input fontFamily={font1} value={skillName} onChange={(e) => handleChangeSkillName(e.target.value)} />
                            </FormControl>
                            <FormControl isRequired mt="8" isInvalid={(!skillDescValid && skillDesc.length > 0)}>
                                <FormLabel fontFamily={font1}>Description</FormLabel>
                                <Textarea fontFamily={font1} value={skillDesc} onChange={(e) => handleChangeSkillDesc(e.target.value)} />
                            </FormControl>
                        </VStack>
                    </HStack>
                </ModalBody>
                <ModalFooter>
                    <HStack>
                        <Button onClick={onNewSkillClose} fontFamily={font1} fontWeight="medium">Cancel</Button>
                        <LightMode>
                            <Button colorScheme="green" my="4" rightIcon={<Icon as={MdAddCircle} w={4} h={4} />} onClick={handleAddSkill}>
                                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily={font1}>
                                    Add
                                </Text>
                            </Button>
                        </LightMode>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        )
    }

    return (
        <>
            <Button variant="outline" my="4" rightIcon={<Icon as={MdBadge} w={6} h={6} />} onClick={onViewSkillsOpen} w="100%">
                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily={font1}>
                    View/Edit Skills
                </Text>
            </Button>
            <Modal fontFamily={font1} onClose={onViewSkillsClose} isOpen={isViewSkillsOpen} isCentered motionPreset='slideInBottom' size="lg" onCloseComplete={() => { changeSkills(modalSkills) }} preserveScrollBarGap>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader fontFamily={font1} fontWeight="medium">Skills</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing="0">
                            <ShowSkillTable />
                            <Button variant="outline" rightIcon={<Icon as={MdAddCircle} color="green.500" w={6} h={6} />} w="100%" onClick={onNewSkillOpen}>
                                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily={font1}>
                                    Add a new skill
                                </Text>
                            </Button>
                            <Modal onClose={onNewSkillClose} isOpen={isNewSkillOpen} isCentered motionPreset='slideInBottom' size="xl" preserveScrollBarGap>
                                <ModalOverlay />
                                <NewSkillModalContent />
                            </Modal>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <HStack w="100%" justify="space-between">
                            <ShowDeleteSelectedSkillButton />
                            <ShowEditSkillButton />
                            <Modal onClose={onEditSkillClose} isOpen={isEditSkillOpen} isCentered motionPreset='slideInBottom' size="xl" preserveScrollBarGap>
                                <ModalOverlay />
                                <EditSkillModalContent />
                            </Modal>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}