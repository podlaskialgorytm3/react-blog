import { useAuth } from "../../shared/hooks/useAuth"

export const AddPost = () => {
    const { auth } = useAuth()
    return(
        <>
            {auth && <h1>Strona do robenia postów!</h1>}
        </>
    )
}