import { jsx as _jsx } from "react/jsx-runtime";
import { Container } from "@mui/material";
const centering = { display: 'flex', flexDirection: 'column', alignItems: "center" };
export const Error = () => {
    return (_jsx(Container, { component: "main", maxWidth: "sm", sx: centering, children: _jsx("h1", { className: "text-5xl font-bold text-white", children: "404 Not Found \uD83D\uDC79" }) }));
};
