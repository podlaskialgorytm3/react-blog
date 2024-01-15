import { useAuth } from "../../shared/hooks/useAuth"
import { AuthError } from "../error/error-auth-page"

import { ProfileSettings } from "../../features/user/components/settings"
import { NavigationMenu } from "../../features/user/components/navigation-menu"

export const Settings = () => {
    const { auth } = useAuth()
    return(
       <>
         {auth ? (
          <>
          <NavigationMenu />
          <ProfileSettings />
          </>
         ) : (<AuthError />)}
       </>
    )
}