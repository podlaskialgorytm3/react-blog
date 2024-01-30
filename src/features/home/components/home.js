import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useSpring, animated } from 'react-spring';
import { useAuth } from '../../../shared/hooks/useAuth';
import { Menu } from "./menu";
export const HomeContainer = ({ children }) => {
    const { auth, userData } = useAuth();
    const props = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 3000 },
    });
    return (_jsxs(_Fragment, { children: [_jsxs(animated.div, { style: props, children: [auth &&
                        _jsx("div", { className: "flex flex-col items-center justify-center w-full h-full text-center", children: _jsxs("h1", { className: "text-3xl md:text-4xl", children: ["Witaj ", userData.first_name, " ", userData.last_name, " \uD83D\uDC4B"] }) }), children] }), _jsx("br", {}), auth &&
                _jsx(_Fragment, { children: _jsx(Menu, {}) })] }));
};
