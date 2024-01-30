import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import { Menu } from "../../shared/components/Menu";
import { ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/material";
import { CssBaseline } from "@mui/material";
import darkTheme from "../../shared/themes/dark-theme";
const centering = { display: 'flex', flexDirection: "column", alignItems: "center" };
export const Root = () => {
    return (_jsxs(ThemeProvider, { theme: darkTheme, children: [_jsx(CssBaseline, {}), _jsx(Menu, {}), _jsx(Container, { component: "main", maxWidth: "sm", sx: centering, children: _jsx(Outlet, {}) })] }));
};
