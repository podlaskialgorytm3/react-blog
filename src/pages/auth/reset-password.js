import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { ResetPasswordForm } from "../../features/auth/components/reset-password-form";
import { AuthError } from "../error/error-auth-page";
import { useAuth } from "../../shared/hooks/useAuth";
export const ResetPassword = () => {
    const { auth } = useAuth();
    return (_jsx(_Fragment, { children: !auth ? (_jsx(ResetPasswordForm, {})) : (_jsx(AuthError, {})) }));
};
