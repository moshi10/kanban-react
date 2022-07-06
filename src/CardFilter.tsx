import { Box, Container, Text, Input, HStack } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'

interface Props {
    value?: string;
    onChange?(value: string): void
}


const CardFilter: React.FC<Props> = ({ value, onChange }) => {
    return (
        <>
            <HStack >
                <SearchIcon />
                <Input
                    placeholder="Filter cards"
                    value={value}
                    onChange={ev => onChange?.(ev.currentTarget.value)}
                    bg="white"
                />
            </HStack>
        </>
    )
}

export default CardFilter
