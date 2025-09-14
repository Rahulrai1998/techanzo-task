import { type FC, type ReactNode } from 'react'

interface TabPanelWrapperProps {
    title: string
    children: ReactNode
}

const TabPanelWrapper: FC<TabPanelWrapperProps> = ({ title, children }) => {
    return (
        <div><h1>{title}</h1>{children}</div>
    )
}

export default TabPanelWrapper;

