import { ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/material";
import  darkTheme  from "../../shared/themes/dark-theme"

export const ErrorPage = () => {
    return(
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="sm">
            <div className="w-full h-[500px] flex justify-center items-center">
                <h1 className="text-5xl font-bold text-white">404 Not Found 👹</h1>
            </div>
            </Container>
        </ThemeProvider>
    )
}