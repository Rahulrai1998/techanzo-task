import React, { useState, type FC } from 'react'
import type { MyAccountProfileData } from '../store/data'
import styled from '@emotion/styled'
import { Avatar, Chip, Typography } from '@mui/material'

interface ProfilePanelProps {
    initialData: MyAccountProfileData | undefined | null
}

const ProfilePanel: FC<ProfilePanelProps> = ({ initialData }) => {
    const [profileData, setProfileData] = useState(initialData)
    const { avatar,
        cover,
        badgeIcon,
        badgeName,
        exp,
        fullName,
        professionalTitle,
        email,
        whatsapp,
        languages } = profileData ?? {}

    return (
        <Parent>
            <CoverPage cover={cover ?? ""} />
            <ProfileDescription>
                <div className='avatar-box'>
                    <Avatar alt={fullName} src={avatar} sx={{ width: 132, height: 132 }} className='avatar' />
                </div>
                <NameBadgeExp>
                    <Typography variant='h5' fontSize={"20px"}>{fullName}</Typography>
                    <BadgeBox>
                        <Chip icon={<img src={badgeIcon} alt={`${badgeName} badge`} />} label={badgeName} sx={{
                            width: "77px", borderRadius: "100px", border: "1px solid rgba(252, 213, 63, 1)", background: "rgba(252, 213, 63, 0.24)"
                        }} />
                        <Typography variant='caption' alignContent={"center"} color={"rgba(0, 0, 0, 0.6)"}>
                            {exp}
                        </Typography>
                    </BadgeBox>
                </NameBadgeExp>
            </ProfileDescription>
            <ProfileDetails>
                <DetailsFieldContainer>
                    <Typography className='title'>FULL NAME</Typography>
                    <Typography className='value'>{fullName}</Typography>
                </DetailsFieldContainer>
                <DetailsFieldContainer>
                    <Typography className='title'>PROFESSIONAL TITLE</Typography>
                    <Typography className='value'>{professionalTitle}</Typography>
                </DetailsFieldContainer>
                <DetailsFieldContainer>
                    <Typography className='title'>EMAIL ADDRESS</Typography>
                    <Typography className='value'>{email}</Typography>
                </DetailsFieldContainer>
                <DetailsFieldContainer>
                    <Typography className='title'>WHATSAPP NUMBER</Typography>
                    <Typography className='value'>{whatsapp}</Typography>
                </DetailsFieldContainer>
                <DetailsFieldContainer style={{ width: "100%" }}>
                    <Typography className='title'>LANGUAGES SPOKEN</Typography>
                    <Typography><LanguageChips>{languages?.map((lang) => <Chip key={lang?.id} label={lang?.name} />)}</LanguageChips></Typography>
                </DetailsFieldContainer>
            </ProfileDetails>
        </Parent>
    )
}

export default ProfilePanel


const Parent = styled("div")({
    // overflowY: "auto",
    "& .MuiBox-root": {
        padding: "0px !important"
    },
    height: "fit-content",
    "& .avatar-box": {
        position: "relative",
        margin: "0 2rem"
    },
    "& .avatar": {
        position: "absolute",
        top: "-65px"
    }
})

const CoverPage = styled("div")<{ cover: string }>(({ cover }) => ({
    background: `url(${cover})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "200px",
    borderRadius: "10px",
    marginTop: "2rem"

}));

const ProfileDescription = styled("div")({
    display: "flex",
    justifyContent: "flex-start"
})

const NameBadgeExp = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: "7rem",
    marginTop: "0.4rem"
})

const BadgeBox = styled("div")({
    display: "flex",
    justifyContent: "flex-start",
    gap: "5px",
    marginTop: "2px"
})

const ProfileDetails = styled("div")({
    margin: "1.6rem 0",
    display: "grid",
    gap: 15,
    gridTemplateColumns: "repeat(2, minmax(200px, 1fr))",
    //if there is only one element at last row, it will take full width
    "& > :nth-last-child(1):nth-child(odd)": {
        gridColumn: "1 / -1"
    }
});

const DetailsFieldContainer = styled("div")({
    borderBottom: "1px solid rgba(237, 237, 237, 1)",
    fontWeight: 400,
    "& .title": {
        color: "rgba(0, 0, 0, 0.6)",
        marginBottom: "0.3rem",
        fontSize: "14px",
        lineHeight: "140%",
        letterSpacing: "-2%"
    },
    "& .value": {
        marginBottom: "0.7rem",
        fontSize: "16px",
        lineHeight: "150%",
        letterSpacing: "-2%"

    }
})

const LanguageChips = styled("div")({
    display: "flex",
    gap: "4px",
    marginBottom: "0.7rem"
})