import { Box, Container, Heading, HStack, Text, Spacer, Input, Button, Flex, Textarea } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { useRef, useEffect } from 'react'

interface Props {
    value?: string
    onChange?(value: string): void
    onConfirm?(): void
    onCancel?(): void
    className?: string
}

const InputForm: React.FC<Props> = ({ value, onChange, onConfirm, onCancel, className }) => {
    const disabled = !value?.trim()
    const handleConfirm = () => {
        if (disabled) return
        onConfirm?.()
    }

    const ref = useAutoFitToContentHeight(value)



    return (
        <>
            <Container>
                <Textarea
                    ref={ref}
                    autoFocus
                    value={value}
                    onChange={e => onChange?.(e.currentTarget.value)}
                    onKeyDown={e => {
                        if (!((e.metaKey || e.ctrlKey) && e.key === 'Enter')) return
                        handleConfirm()
                    }}
                />

                <Flex>
                    <Button><AddIcon /></Button>
                    <Button><DeleteIcon /></Button>


                </Flex>
            </Container>

        </>
    )
}

function useAutoFitToContentHeight(content: string | undefined) {
    const ref = useRef<HTMLTextAreaElement>(null)

    useEffect(
        () => {
            const el = ref.current

            if (!el) return

            const { borderTopWidth, borderBottomWidth } = getComputedStyle(el)
            el.style.height = 'auto'
            el.style.height = `calc(${borderTopWidth} + ${el.scrollHeight}px + ${borderBottomWidth})`
        },
        [content]
    )

    return ref
}

export default InputForm
