import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import AccountIcon from '../../../assets/account.png';
import BlogIcon from '../../../assets/blog.png';
import SettingsIcon from '../../../assets/settings.png';
const imgStyle = "w-[50px] h-[50px] p-1 rounded-[10px]";
const navlinkStyle = "h-[70px] w-[70px] rounded-[30px] flex justify-center items-center";
export const NavigationMenu = () => {
    return (_jsxs("div", { className: `mb-10 w-[350px] md:w-[500px] h-[100px] flex justify-around`, children: [_jsx(NavLink, { to: "/user/post-settings", style: ({ isActive }) => ({ backgroundColor: isActive ? '#41c48b' : '' }), className: navlinkStyle, children: _jsx("img", { src: BlogIcon, alt: "Post Settings", className: imgStyle }) }), _jsx(NavLink, { to: "/user/profile", style: ({ isActive }) => ({ backgroundColor: isActive ? '#41c48b' : '' }), className: navlinkStyle, children: _jsx("img", { src: AccountIcon, alt: "Account Information", className: imgStyle }) }), _jsx(NavLink, { to: "/user/settings", style: ({ isActive }) => ({ backgroundColor: isActive ? '#41c48b' : '' }), className: navlinkStyle, children: _jsx("img", { src: SettingsIcon, alt: "Account Settings", className: imgStyle }) })] }));
};
