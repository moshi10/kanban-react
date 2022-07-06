import { Box, Container, Flex, HStack, VStack, Text, Spacer } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import Card from './Card'
import DropArea from './Card'
import { useState } from 'react'
import InputForm from './InputForm'

Card.DropArea = DropArea

interface Props {
    title?: string;
    filterValue?: string;
    cards: {
        id: string;
        text?: string;
    }[]
}

const Column: React.FC<Props> = ({ title, filterValue: rawFilterValue, cards: rawCards }) => {
    const filterValue = rawFilterValue?.trim()
    const keywords = filterValue?.toLocaleLowerCase().split(/\s+/g) ?? []
    const cards = rawCards.filter(({ text }) =>
        keywords?.every(w => text?.toLowerCase().includes(w)),
    )
    const totalCount = rawCards.length

    const [text, setText] = useState('')

    const [inputMode, setInputMode] = useState(false)
    const toggleInput = () => setInputMode(v => !v)
    const confirmInput = () => setText('')
    const cancelInput = () => setInputMode(false)

    return (
        <>
            <VStack minH="700px" minW="300px" >
                <Flex w="100%" minH="50px" border="1px" borderRadius="xl" >
                    <Box m="auto 10px" p="5px 15px" bg="white" borderRadius="100%" >{totalCount}</Box>
                    <Text m="auto 0" >{title}</Text>
                    <Spacer />
                    <AddIcon m="auto 0" onClick={toggleInput} />
                </Flex>
                {inputMode && (
                    <InputForm
                        value={text}
                        onChange={setText}
                        onConfirm={confirmInput}
                        onCancel={cancelInput}
                    />
                )}
                {filterValue && <Box>{cards.length} results</Box>}
                <Box w="100%" bg="blackAlpha.100" >
                    {
                        cards.map(({ id, text }) => (
                            <Card.DropArea key={id}>
                                <Card text={text} />
                            </Card.DropArea>
                        ))
                    }
                    <Card.DropArea style={{ height: '100%' }} />
                </Box>
            </VStack>
        </>
    )
}

export default Column
