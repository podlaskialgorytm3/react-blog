import { Container } from "@mui/material"

const centering = {display: 'flex', flexDirection: 'column', alignItems: "center"}

export const Error = () => {
    return (
        <Container component="main" maxWidth="sm" sx={centering}>
                <h1 className="text-5xl font-bold text-white">404 Not Found 👹</h1>
        </Container>
    )
}