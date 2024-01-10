import SignInForm from "../../features/auth/components/sign-in-form";
import { useAuth } from "../../shared/hooks/useAuth";
import { AuthError } from "../error/error-auth-page"

export const SignIn = () => {
    const { auth } = useAuth();
    return (
        <>
            {!auth ? (<SignInForm />) : (<AuthError />)}
        </>
    )
}