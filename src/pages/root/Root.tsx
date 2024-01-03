import { Outlet } from "react-router-dom"
import { Menu } from "../../shared/components/menu"
import { ThemeProvider } from '@mui/material/styles';
import  darkTheme  from "../../shared/themes/dark-theme"

export const Root = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <Menu />
            <Outlet />
        </ThemeProvider>
    )
}