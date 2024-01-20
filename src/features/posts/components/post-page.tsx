import { PostRequest } from "../types/post-content"

export const PostPage = ({post}: {post: PostRequest}) => {
    console.log(post.description)
    return (
        <div className="w-[1000px] flex flex-col items-center mt-10">
            <h1 className="text-[36px]">{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.description }} />
        </div>
    )
}