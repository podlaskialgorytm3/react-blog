import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import SignUpForm from '../../features/auth/components/sign-up-form';
import { useAuth } from "../../shared/hooks/useAuth";
import { AuthError } from "../error/error-auth-page";
export const SignUp = () => {
    const { auth } = useAuth();
    return (_jsx(_Fragment, { children: !auth ? (_jsx(SignUpForm, {})) : (_jsx(AuthError, {})) }));
};
