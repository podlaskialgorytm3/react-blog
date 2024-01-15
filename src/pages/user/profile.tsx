import { useAuth } from "../../shared/hooks/useAuth"
import { AuthError } from "../error/error-auth-page"

import { ProfileCard } from "../../features/user/profile"
import { NavigationMenu } from "../../features/user/components/navigation-menu"

export const Profile = () => {
    const { auth } = useAuth()
    return(
       <>
         {auth ? (
          <>
          <NavigationMenu />
          <ProfileCard />
          </>
         ) : (<AuthError />)}
       </>
    )
}