import { useAuth } from "../../shared/hooks/useAuth"
import { AuthError } from "../error/error-auth-page"

import { NavigationMenu } from "../../features/user/components/navigation-menu"

export const PostSettings = () => {
    const { auth } = useAuth()
    return(
       <>
         {auth ? (
          <>
          <NavigationMenu />
          <h1>Ustawienie postów</h1>
          </>
         ) : (<AuthError />)}
       </>
    )
}