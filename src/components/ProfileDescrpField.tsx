import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import React, { type FC } from 'react'

interface ProfileDescrpFieldProps {
    title: string,
    value: string
}

const ProfileDescrpField: FC<ProfileDescrpFieldProps> = ({ title, value }) => {
    return (
        <Parent>
            <Typography>{title}</Typography>
            <Typography>{value}</Typography>
        </Parent>

    )
}

export default ProfileDescrpField

const Parent = styled("div")({
    textAlign: "left"
})