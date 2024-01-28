import { PostResponse } from "../../../shared/types/post-response"
import { Link } from "react-router-dom"
import { UserLabel } from "./user-label"
import {defaultPostImage} from "../../../shared/constants/data"

export const PostCard = ({ post }: { post: PostResponse }) => {
    return (
        
        <div className="w=[300px] h-[275px] m-8 md:w-[500px] md:h-[450px] md:m-5">
            <UserLabel user={post.user} />
            <Link to={`/post/${post.post_id}`}>
            <div>
                <img src={post.image ? post.image : defaultPostImage} alt="post" className="w-full md:h-[250px] h-[200px] object-cover rounded-[50px]" />
                <h1 className="md:text-[24px] font-bold text-center mt-6">{post.title}</h1>
            </div>
            </Link>
        </div>
    )
}