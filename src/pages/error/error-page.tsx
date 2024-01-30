import { ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/material";
import  darkTheme  from "../../shared/themes/dark-theme"
import { CssBaseline } from '@mui/material';

const centering = {display: 'flex', flexDirection: 'column', alignItems: "center"}

export const ErrorPage = () => {
    return(
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={centering}>
                <h1 className="text-5xl font-bold text-white">404 Not Found 👹</h1>
            </Container>
        </ThemeProvider>
    )
}