import { ResetPasswordForm } from "../../features/auth/components/reset-password-form"
import { AuthError } from "../error/error-auth-page"
import { useAuth } from "../../shared/hooks/useAuth"

export const ResetPassword = () => {
    const { auth } = useAuth();
    return (
        <>
            {!auth ? (<ResetPasswordForm />) : (<AuthError />)}
        </>
    )
}