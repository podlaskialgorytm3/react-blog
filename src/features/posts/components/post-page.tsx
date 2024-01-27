import { PostResponse } from "../../../shared/types/post-response"
import { UserLabel } from "./user-label"
import { TagLabel } from "../../../shared/components/tag";
import { useFetchTagToPost } from "../../../api/use-fetch-tag-to-post";
import { TagResponse } from "../../../shared/types/tag-response";

export const PostPage = ({post}: {post: PostResponse}) => {
    const {data: tags} = useFetchTagToPost(post.post_id)
    return (
        <div className="md:w-[1000px] flex flex-col items-center mt-10">
            <UserLabel user={post.user} />
            <h1 className="text-[36px]">{post.title}</h1>
            <div className="md:w-[1000px] w-[350px] overflow-hidden" dangerouslySetInnerHTML={{ __html: post.description }} />
            <div className="flex mt-20 flex-wrap">
                {tags?.map((tag: TagResponse) => <TagLabel key={tag.tag_id} name={tag.name} color={tag.color} />)}
            </div>
        </div>
    )
}