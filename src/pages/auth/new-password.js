import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { NewPasswordForm } from "../../features/auth/components/new-password-form";
import { AuthError } from "../error/error-auth-page";
import { useAuth } from "../../shared/hooks/useAuth";
export const NewPassword = () => {
    const { auth } = useAuth();
    return (_jsx(_Fragment, { children: !auth ? (_jsx(NewPasswordForm, {})) : (_jsx(AuthError, {})) }));
};
