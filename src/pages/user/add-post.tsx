import { useAuth } from "../../shared/hooks/useAuth"
import { ErrorPage } from "../error/error-page"
import { AddPostForm } from "../../features/posts/components/add-post-form"

export const AddPost = () => {
    const { auth } = useAuth()
    return(
        <>
            {auth ? <AddPostForm /> : <ErrorPage />}
        </>
    )
}