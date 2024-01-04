import { Outlet } from "react-router-dom"
import { Menu } from "../../shared/components/menu"
import { ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/material";
import {CssBaseline} from "@mui/material";
import  darkTheme  from "../../shared/themes/dark-theme"

export const Root = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Menu />
            <Container component="main" maxWidth="sm">
                <Outlet />
            </Container>
        </ThemeProvider>
    )
}