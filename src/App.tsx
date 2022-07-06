import { Box, Container, HStack, VStack, Flex } from '@chakra-ui/react';
import React from 'react';
import Card from './Card';
import Column from './Column';
import Header from './Header';
import { useState } from 'react'

const App: React.FC = () => {
  const [filterValue, setFilterValue] = useState('')

  return (
    <>
      <Container maxW="1200px" m="16px auto" >
        <VStack display="flex" h="100%">
          <Header filterValue={filterValue} onFilterChange={setFilterValue} />
          <HStack h="100%" w="100%" p="16px 0" m="0 auto" >
            <Column
              title="TODO"
              filterValue={filterValue}
              cards={[
                { id: 'a', text: '朝食をとる🍞' },
                { id: 'b', text: 'SNSをチェックする🐦' },
                { id: 'c', text: '布団に入る (:3[___]' },
              ]}
            />
            <Column title="Waiting" filterValue={filterValue} cards={[]} />
            <Column
              title="Doing"
              filterValue={filterValue}
              cards={[
                { id: 'd', text: '顔を洗う👐' },
                { id: 'e', text: '歯を磨く🦷' },
              ]} />
          </HStack>
        </VStack>
      </Container>

    </>
  );
}

export default App;
