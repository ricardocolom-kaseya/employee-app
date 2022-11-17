import React, { useState, useEffect } from 'react'
import { Avatar, Box, Text, HStack, VStack, Heading, AvatarBadge, Input, Code, Button, Tooltip, Icon, IconButton, Switch, Divider, useDisclosure, Select, Textarea, useToast } from '@chakra-ui/react'
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
import { MdSave, MdBadge, MdPerson, MdEmail, MdAddCircle, MdDelete } from 'react-icons/md'

import { faker } from '@faker-js/faker';

import validator from 'validator'

const font1 = 'Inter';

const today = new Date();

const GetAge = (dob) => {
    const today = new Date();

    const currAge = (today - dob) / 31536000000;
    return Math.floor(currAge);
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

export default function ViewEditSkillsButton({ skills, changeSkills }) {

    const toast = useToast();

    const [modalSkills, changeModalSkills] = useState([])

    // This is absolutely necessary as modalSkills hook is always loaded as long as the control panel is rendered, and it MUST change whenever skills changes.
    useEffect(() => {
        console.log("skills was changed")
        changeModalSkills([...skills])
    }, [skills])

    const { isOpen: isViewSkillsOpen, onOpen: onViewSkillsOpen, onClose: onViewSkillsClose } = useDisclosure()

    const [index, changeIndex] = useState(0)

    if (modalSkills.length > 0 && index >= modalSkills.length)
        changeIndex(index - 1)

    const { isOpen: isEditSkillOpen, onOpen: onEditSkillOpen, onClose: onEditSkillClose } = useDisclosure()

    const { isOpen: isNewSkillOpen, onOpen: onNewSkillOpen, onClose: onNewSkillClose } = useDisclosure()

    const ShowSelectedIcon = (i) => {
        if (i == index)
            return (
                <CheckIcon color="gray.700" />
            )
    }

    const ShowSkillTable = () => {
        if (modalSkills.length > 0)
            return (
                <VStack spacing="0" w="100%" pb="8">
                    {modalSkills.map((skill, i) => {
                        return (
                            <Box onClick={() => { changeIndex(i) }} _hover={{ background: "gray.100", cursor: "pointer", transition: "linear 0.1s" }} key={i} w="100%" border="1px" borderBottom={(i < modalSkills.length - 1) ? "0px" : "1px"} borderTopRadius={(i == 0) ? "md" : "0px"} borderBottomRadius={(i == modalSkills.length - 1) ? "md" : "0px"} borderColor="gray.200" p="2">
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

            console.log("Attempting to delete skill...")

            fetch("http://localhost:4000/deleteskill", {
                headers: {
                    'skill_id': skillID
                }
            }).then(
                response => response.json()
            ).then(
                data => {
                    console.log("Skill deleted...")
                    let newAllSkills = [];

                    for (var i = 0; i < modalSkills.length; ++i) {
                        if (modalSkills[i].skill_id != skillID)
                            newAllSkills.push(modalSkills[i])
                    }

                    changeModalSkills(newAllSkills);
                }
            )
        }

        if (modalSkills.length > 0) {

            return (
                <>
                    <Button onClick={onOpen} fontFamily="Inter" colorScheme="red" fontWeight="medium">Delete Selected</Button>
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
                                <AlertDialogHeader fontSize='lg' fontWeight='medium'>
                                    Delete Skill
                                </AlertDialogHeader>
                                <AlertDialogBody>
                                    <Text>Are you sure you would like to delete <strong>{modalSkills[index].skill_name}</strong>?</Text>
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme='red' onClick={handleDeleteSkill} ml={3}>
                                        Delete
                                    </Button>
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
                    <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
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

        const handleEditSkill = () => {
            let skillID = modalSkills[index].skill_id

            console.log("Attempting to edit skill " + skillName)

            fetch("http://localhost:4000/editskill", {
                headers: {
                    'skill_id': skillID,
                    'skill_name': skillName,
                    'skill_desc': skillDesc
                }
            }).then(
                response => response.json()
            ).then(
                data => {
                    console.log("Edited this skill...")

                    onEditSkillClose();

                    toast({ title: "Edited a skill", status: 'success', duration: 3000 })

                    let editedSkill = { skill_id: skillID, skill_name: skillName, skill_desc: skillDesc }

                    let newAllSkills = [...modalSkills]

                    for (var i = 0; i < newAllSkills.length; ++i) {
                        if (newAllSkills[i].skill_id == skillID) {
                            newAllSkills[i] = editedSkill;
                        }
                    }

                    changeModalSkills(newAllSkills);
                }
            )
        }

        return (
            <ModalContent>
                <ModalHeader fontFamily="Inter" fontWeight="medium">Edit Skill</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack spacing="8">
                        <VStack spacing="8" w="1200px" h="328px">
                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input value={skillName} onChange={(e) => changeSkillName(e.target.value)} />
                            </FormControl>
                            <FormControl isRequired mt="8">
                                <FormLabel>Description</FormLabel>
                                <Textarea value={skillDesc} onChange={(e) => changeSkillDesc(e.target.value)} />
                            </FormControl>
                        </VStack>
                    </HStack>
                </ModalBody>
                <ModalFooter>
                    <HStack>
                        <Button onClick={onEditSkillClose} fontFamily="Inter" fontWeight="medium">Cancel</Button>
                        <Button my="4" colorScheme="blue" variant="outline" rightIcon={<Icon as={MdSave} w={4} h={4} />} onClick={handleEditSkill}>
                            <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
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

        const handleAddSkill = () => {
            let skillID = faker.datatype.uuid()

            console.log("Attempting to add skill " + skillName)

            fetch("http://localhost:4000/createskill", {
                headers: {
                    'skill_id': skillID,
                    'skill_name': skillName,
                    'skill_desc': skillDesc
                }
            }).then(
                response => response.json()
            ).then(
                data => {
                    console.log("Added this skill...")

                    onNewSkillClose();

                    toast({ title: "Added a skill!", status: 'success', duration: 3000 })

                    let newSkill = { skill_id: skillID, skill_name: skillName, skill_desc: skillDesc }

                    let newAllSkills = [...modalSkills]
                    newAllSkills.push(newSkill)
                    changeModalSkills(newAllSkills);
                }
            )
        }

        return (
            <ModalContent>
                <ModalHeader fontFamily="Inter" fontWeight="medium">New Skill</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack spacing="8">
                        <VStack spacing="8" w="1200px" h="328px">
                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input value={skillName} onChange={(e) => changeSkillName(e.target.value)} />
                            </FormControl>
                            <FormControl isRequired mt="8">
                                <FormLabel>Description</FormLabel>
                                <Textarea value={skillDesc} onChange={(e) => changeSkillDesc(e.target.value)} />
                            </FormControl>
                        </VStack>
                    </HStack>
                </ModalBody>
                <ModalFooter>
                    <HStack>
                        <Button onClick={onNewSkillClose} fontFamily="Inter" fontWeight="medium">Cancel</Button>
                        <Button colorScheme="green" my="4" rightIcon={<Icon as={MdAddCircle} color="white" w={4} h={4} />} onClick={handleAddSkill}>
                            <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                                Add
                            </Text>
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        )
    }

    return (
        <>
            <Button variant="outline" my="4" rightIcon={<Icon as={MdBadge} w={6} h={6} />} onClick={onViewSkillsOpen} w="100%">
                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                    View/Edit Skills
                </Text>
            </Button>
            <Modal onClose={onViewSkillsClose} isOpen={isViewSkillsOpen} isCentered motionPreset='slideInBottom' size="lg" onCloseComplete={() => { changeSkills(modalSkills) }} preserveScrollBarGap>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader fontFamily="Inter" fontWeight="medium">Skills</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing="0">
                            <ShowSkillTable />
                            <Button variant="outline" rightIcon={<Icon as={MdAddCircle} color="green.500" w={6} h={6} />} w="100%" onClick={onNewSkillOpen}>
                                <Text w="100%" textAlign="left" fontWeight="normal" fontFamily="Inter">
                                    Add a new skill
                                </Text>
                            </Button>
                            <Modal onClose={onNewSkillClose} isOpen={isNewSkillOpen} isCentered motionPreset='slideInBottom' size="xl" preserveScrollBarGap>
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