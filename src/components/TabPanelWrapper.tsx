import { type FC } from 'react'

interface TabPanelWrapperProps {
    title: string
}

const TabPanelWrapper: FC<TabPanelWrapperProps> = ({ title }) => {
    return (
        <div><h1>{title}</h1></div>
    )
}

export default TabPanelWrapper;

