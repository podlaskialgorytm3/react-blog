import { PostRequest } from "../../../shared/types/post-request"
import { Link } from "react-router-dom"
import { UserLabel } from "./user-label"
import {postImage} from "../../../shared/constants/data"

export const PostCard = ({ post }: { post: PostRequest }) => {
    return (
        
        <div className="w-[500px] h-[450px] m-5">
            <UserLabel user={post.user} />
            <Link to={`/post/${post.post_id}`}>
            <div>
                <img src={post.image ? post.image : postImage} alt="post" className="w-full h-[250px] object-cover rounded-[50px]" />
                <h1 className="text-[24px] font-bold text-center mt-6">{post.title}</h1>
            </div>
            </Link>
        </div>
    )
}