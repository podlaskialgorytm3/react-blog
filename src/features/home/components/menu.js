import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
export const Menu = () => {
    return (_jsxs("div", { className: "w-[100%] flex justify-center items-center flex-col md:flex-row", children: [_jsx(Link, { to: '/add-post', children: _jsx(Button, { variant: "contained", sx: { mt: 3, mb: 2, bgcolor: '#41c48b', color: '#fff', width: '200px', '&:hover': {
                            backgroundColor: '#328a63',
                            opacity: [0.9, 0.8, 0.7],
                        },
                        '@media (max-width: 600px)': {
                            margin: 0,
                            marginBottom: '20px'
                        },
                    }, children: "Add post" }) }), _jsx(Link, { to: '/add-tag', children: _jsx(Button, { variant: "contained", sx: { mt: 3, mb: 2, ml: 10, bgcolor: '#41c48b', color: '#fff', width: '200px', '&:hover': {
                            backgroundColor: '#328a63',
                            opacity: [0.9, 0.8, 0.7],
                        },
                        '@media (max-width: 600px)': {
                            margin: 0,
                            marginBottom: '20px'
                        },
                    }, children: "Add Tag" }) })] }));
};
