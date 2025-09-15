import styled from '@emotion/styled'
import { Avatar, Typography } from '@mui/material'
import downArray from "../assets/direction-down.png"
import { useContext } from 'react';
import { DataContext } from '../store/ContextProvider';

const LeftPanelProfileCard = () => {
    const context = useContext(DataContext);
    if (!context) return null;
    const { profileData } = context;
    return (
        <Parent>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar src={profileData?.avatar as string} />
                    <div style={{ display: "flex", flexDirection: "column", margin: "0 0.8rem" }}>
                        <Typography sx={{ fontWeight: 500, fontSize: "16px", lineHeight: "150%", letterSpacing: "-2%", fontStyle: "normal" }}>{profileData?.fullName}</Typography>
                        <Typography sx={{ fontWeight: 300, fontSize: "12px", lineHeight: "130%", letterSpacing: "-2%", fontStyle: "light", color: "rgba(161, 161, 161, 1)" }}>{profileData?.professionalTitle}</Typography>
                    </div></div>
                <div> <img src={downArray} alt="" /></div>
            </div>
        </Parent>
    )
}

export default LeftPanelProfileCard

const Parent = styled("div")({
    position: "absolute",
    bottom: 8,
    left: 12,
    width: "225px",
    zIndex: 1,
    padding: "2px 1px",
    background: "#fff"
})