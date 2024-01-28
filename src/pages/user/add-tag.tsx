import { useAuth } from "../../shared/hooks/useAuth"
import { Error } from "../../shared/components/error"
import { AddTagForm } from "../../features/tags/components/add-tag-form"

export const AddTag = () => {
    const { auth } = useAuth()
    return(
        <>
            {auth ? <AddTagForm /> : <Error />}
        </>
    )
}