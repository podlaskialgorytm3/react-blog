import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
export function Copyright(props) {
    return (_jsxs(Typography, { margin: "30px", variant: "body2", color: "text.secondary", align: "center", ...props, children: ['Copyright © ', _jsx(NavLink, { to: '/', className: "text-main font-bold", children: "michael-react-blog" }), ' ', new Date().getFullYear(), '.'] }));
}
