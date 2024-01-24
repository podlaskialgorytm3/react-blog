import { useAuth } from "../../shared/hooks/useAuth"
import { Error } from "../../shared/components/error"

export const AddTag = () => {
    const { auth } = useAuth()
    return(
        <>
            {auth ? <> Tutaj będzie form z tworzeniem tagów!  </> : <Error />}
        </>
    )
}