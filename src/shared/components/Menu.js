import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useAuth } from "../hooks/useAuth";
const menuItemsStyles = {
    loginItems: "border-[1px] border-solid rounded-[20px] text-white pt-3 pb-3 pl-5 pr-5 font-bold",
    gradient: "bg-gradient-to-r from-green-500 via-green-700 to-green-900"
};
export const Menu = () => {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/signin');
    };
    return (_jsx("nav", { className: "w-full h-[100px] p-4 shadow-md flex justify-center", children: _jsxs("div", { className: "flex justify-between items-center h-full w-full md:w-[90%]", children: [_jsx(NavLink, { to: "/", children: _jsx("img", { src: Logo, className: "w-16" }) }), _jsx("div", { className: "w-[200px] flex justify-between", children: auth ? (_jsxs(_Fragment, { children: [_jsx(NavLink, { to: "/user/profile", className: menuItemsStyles.loginItems, children: "Profile" }), _jsx("button", { className: menuItemsStyles.loginItems, onClick: handleLogout, children: "Logout" })] })) : (_jsxs(_Fragment, { children: [_jsx(NavLink, { to: "/signin", className: menuItemsStyles.loginItems, children: "Sign In" }), _jsx(NavLink, { to: "/signup", className: `${menuItemsStyles.loginItems} ${menuItemsStyles.gradient}`, children: "Sign Up" })] })) })] }) }));
};
