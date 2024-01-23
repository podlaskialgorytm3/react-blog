import { useParams } from "react-router-dom"

export const EditPostCard = () => {
    const {id} = useParams<{id: string}>()
    console.log(id)
    return(
        <h1>
            Sieamno
        </h1>
    )
}