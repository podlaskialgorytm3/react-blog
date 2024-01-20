import { useParams } from "react-router-dom"

export const PostPage = () => {
    const { id } = useParams<{ id: string }>()

    return (
        <div>
            <h2>{id}</h2>
        </div>
    )
}