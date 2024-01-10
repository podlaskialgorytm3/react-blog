import  SignUpForm  from '../../features/auth/components/sign-up-form';
import { useAuth } from "../../shared/hooks/useAuth";
import { AuthError } from "../error/error-auth-page"

export const SignUp = () => {
    const { auth } = useAuth();
    return (
        <>
            {!auth ? (<SignUpForm />) : (<AuthError />)}
        </>
    )
}