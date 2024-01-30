import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/material";
import darkTheme from "../../shared/themes/dark-theme";
import { CssBaseline } from '@mui/material';
const centering = { display: 'flex', flexDirection: 'column', alignItems: "center" };
export const ErrorPage = () => {
    return (_jsxs(ThemeProvider, { theme: darkTheme, children: [_jsx(CssBaseline, {}), _jsx(Container, { component: "main", maxWidth: "sm", sx: centering, children: _jsx("h1", { className: "text-5xl font-bold text-white", children: "404 Not Found \uD83D\uDC79" }) })] }));
};
