import styled from '@emotion/styled'
import { type FC, type ReactNode } from 'react'
import UnderProcessFallback from './UnderProcessFallback'

interface TabPanelWrapperProps {
    title: string
    children: ReactNode
}

const TabPanelWrapper: FC<TabPanelWrapperProps> = ({ title, children }) => {
    return (
        <WrapperContainer><h1>{title}</h1>{children}</WrapperContainer>
    )
}

export default TabPanelWrapper;

const WrapperContainer = styled("div")({
    width: "70%",
    margin: "auto"
})
