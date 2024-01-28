import { useAuth } from "../../shared/hooks/useAuth"
import { Error } from "../../shared/components/error"
import  {AddPostForm}  from "../../features/posts/components/add-post-form"

export const AddPost = () => {
    const { auth } = useAuth()
    return(
        <>
            {auth ? <AddPostForm /> : <Error />}
        </>
    )
}