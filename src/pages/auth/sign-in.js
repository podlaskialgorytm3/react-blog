import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import SignInForm from "../../features/auth/components/sign-in-form";
import { useAuth } from "../../shared/hooks/useAuth";
import { AuthError } from "../error/error-auth-page";
export const SignIn = () => {
    const { auth } = useAuth();
    return (_jsx(_Fragment, { children: !auth ? (_jsx(SignInForm, {})) : (_jsx(AuthError, {})) }));
};
