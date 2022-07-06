import { Box, Container, Text, Link, VStack, HStack, Stack, Flex, Spacer } from '@chakra-ui/react';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import { useState, useRef } from 'react'

interface Props {
    text?: string;
    DropArea: React.FC<DropAreaProps>
}



const Card = ({ text, DropArea }: Props) => {
    const [drag, setDrag] = useState(false)

    return (
        <>
            <Flex
                style={{ opacity: drag ? 0.5 : undefined }}
                onDragStart={() => {
                    setDrag(true)
                }}
                onDragEnd={() => {
                    setDrag(false)
                }}
                w="100%"
                border="1px"
            >
                <CheckIcon />
                {text?.split(/(https?:\/\/\S+)/g).map((fragment, i) =>
                    i % 2 === 0 ? (
                        <Text key={i}>{fragment}</Text>
                    ) : (
                        <Link key={i} href={fragment}>
                            {fragment}
                        </Link>
                    ),
                )}
                <Spacer />
                <DeleteIcon />
            </Flex>
        </>
    )
}

export default Card

interface DropAreaProps {
    disabled?: boolean
    onDrop?(): void
    children?: React.ReactNode
}

export const DropArea: React.FC<DropAreaProps> = ({ disabled, onDrop, children }) => {
    const [isTarget, setIsTarget] = useState(false)
    const visible = !disabled && isTarget

    const [dragOver, onDragOver] = useDragAutoLeave()

    return (
        <>
            <Container
                onDragOver={ev => {
                    if (disabled) return
                    ev.preventDefault()
                    onDragOver(() => setIsTarget(false))
                }}
                onDragEnter={() => {
                    if (disabled || dragOver.current) return
                    setIsTarget(true)
                }}
                onDrop={() => {
                    if (disabled) return

                    setIsTarget(false)
                    onDrop?.()
                }}
            >
                <Box
                    style={{
                        height: !visible ? 0 : undefined,
                        borderWidth: !visible ? 0 : undefined,
                    }}
                />
                {children}
            </Container>
        </>
    )
}

function useDragAutoLeave(timeout: number = 100) {
    const dragOver = useRef(false)
    const timer = useRef(0)

    return [
        dragOver,
        (onDragLeave?: () => void) => {
            clearTimeout(timer.current)

            dragOver.current = true
            timer.current = window.setTimeout(() => {
                dragOver.current = false
                onDragLeave?.()
            }, timeout)
        },
    ] as const
}
