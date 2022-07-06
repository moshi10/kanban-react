import { Box, Container, Heading, HStack, Text, Spacer } from '@chakra-ui/react';
import CardFilter from './CardFilter';

interface Props {
    filterValue?: string
    onFilterChange?(value: string): void
}

const Header: React.FC<Props> = ({ filterValue, onFilterChange }) => {
    return (
        <>
            <HStack w="100%" p="16px" border="1px" borderRadius="lg">
                <Heading>Kanban Board</Heading>
                <Spacer />
                <CardFilter value={filterValue} onChange={onFilterChange} />
            </HStack>
        </>
    )
}

export default Header
