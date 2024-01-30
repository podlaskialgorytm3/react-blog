import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";
import { AuthError } from "../error/error-auth-page";
import { NavigationMenu } from "../../features/user/components/navigation-menu";
export const UserDashboardLayout = () => {
    const { auth } = useAuth();
    return (_jsx(_Fragment, { children: auth ? (_jsxs(_Fragment, { children: [_jsx(NavigationMenu, {}), _jsx(Outlet, {})] }))
            :
                (_jsx(AuthError, {})) }));
};
