import { PostResponse } from "../../../shared/types/post-response"

export interface PostSettings {
    post: PostResponse;
    handleDeletePost(id: number): void
}