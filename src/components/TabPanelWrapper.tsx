import styled from '@emotion/styled'
import { type FC, type ReactNode } from 'react'


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
    marginLeft: "8rem",
    overflow: "hidden",
    h1: {
        fontWeight: 400,
        fontSize: "30px",
        lineHeight: "120%",
        letterSpacing: "-2%"
    }
})
