import React from 'react'
import UnderConstructionSVG from "../assets/construction-svgrepo-com.svg"
import styled from '@emotion/styled'

const UnderProcessFallback = () => {
    return (
        <Container style={{ textAlign: "center" }}><Img src={UnderConstructionSVG} alt="Fallback Image" /></Container>
    )
}

export default UnderProcessFallback

const Container = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh"
})

const Img = styled("img")({
    width: "80px",
    filter: "invert(42 %) sepia(93%) saturate(1352 %) hue - rotate(87deg) brightness(119 %) contrast(119 %)"
})