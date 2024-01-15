import { useAuth } from "../../shared/hooks/useAuth"
import { AuthError } from "../error/error-auth-page"

import { ProfileCard } from "../../features/user/profile"

export const Profile = () => {
    const { auth } = useAuth()
    return(
       <>
         {auth ? (<ProfileCard />) : (<AuthError />)}
       </>
    )
}