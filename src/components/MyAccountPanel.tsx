import React, { type FC } from 'react'
import type { MyAccountData, TabPanelDataType } from '../store/data'

interface MyAccountPanelProps {
    data: TabPanelDataType | undefined | null
}

const MyAccountPanel: FC<MyAccountPanelProps> = ({ data }) => {
    return (
        <div>MyAccountPanel</div>
    )
}

export default MyAccountPanel