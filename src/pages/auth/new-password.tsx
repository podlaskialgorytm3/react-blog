import { NewPasswordForm } from "../../features/auth/components/new-password-form"
import { AuthError } from "../error/error-auth-page"
import { useAuth } from "../../shared/hooks/useAuth"

export const NewPassword = () => {
    const { auth }  = useAuth();
    return (
        <>
            {!auth ? (<NewPasswordForm />) : (<AuthError />)}
        </>
    )
}