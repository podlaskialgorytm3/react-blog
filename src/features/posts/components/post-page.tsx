import { PostResponse } from "../../../shared/types/post-response"
import { UserLabel } from "./user-label"

export const PostPage = ({post}: {post: PostResponse}) => {
    console.log(post.description)
    return (
        <div className="w-[1000px] flex flex-col items-center mt-10">
            <UserLabel user={post.user} />
            <h1 className="text-[36px]">{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.description }} />
        </div>
    )
}