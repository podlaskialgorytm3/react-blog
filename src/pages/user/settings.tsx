import { useAuth } from "../../shared/hooks/useAuth"
import { AuthError } from "../error/error-auth-page"

import { NavigationMenu } from "../../features/user/components/navigation-menu"

export const Settings = () => {
    const { auth } = useAuth()
    return(
       <>
         {auth ? (
          <>
          <NavigationMenu />
          <h1>Ustawienie profilu</h1>
          </>
         ) : (<AuthError />)}
       </>
    )
}