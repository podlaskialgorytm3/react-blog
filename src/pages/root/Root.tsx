import { Outlet } from "react-router-dom"
import { Menu } from "../../shared/components/Menu"
import { ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/material";
import {CssBaseline} from "@mui/material";
import  darkTheme  from "../../shared/themes/dark-theme"

const centering: {display: string; flexDirection: string; alignItems: string} = {display: 'flex', flexDirection: "column", alignItems: "center"}

export const Root: React.FC = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Menu />
            <Container component="main" maxWidth="sm" sx={centering}>
                <Outlet />
            </Container>
        </ThemeProvider>
    )
}