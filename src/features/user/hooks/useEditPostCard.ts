import { uploadImage } from "../../../api/upload-post-image";
import { DEFAULT_POST_ERRORS } from "../../../shared/constants/post-content";
import { postContentEditSchema } from "../../../shared/utils/validate-post";
import { fromZodError } from "zod-validation-error";
import { EditPostContent } from "../types/edit-post-content";
import { PostContent } from "../../../shared/types/post-content";
import { useUpdatePost } from "../api/use-update-post";
import { useAddTagToPost } from "../../../api/use-add-tag-to-post";
import { useDeleteTagPost } from "../api/use-delete-tag-post";
import { useFetchTagPostId } from "../api/use-fetch-tag-post-id";
import { useParams } from "react-router-dom";
import { useFetchPost } from "../../../api/use-fetch-post";

import { useEffect, useState } from "react";

export const useEditPostCard = () => {
    const [content, setContent] = useState<string>('');
    const [image, setImage] = useState<any>(null);
    const [error, setError] = useState<PostContent>(DEFAULT_POST_ERRORS);
    const [tagsId, setTagsId] = useState<number[]>([]);

    const {id} = useParams<{id: string | undefined}>()

    const {data: post, isLoading: isLoadingPost} = useFetchPost(id || "")
    const {mutate: updatePost} = useUpdatePost();
    const {mutate: addTagToPost} = useAddTagToPost();
    const {mutate: deleteTagPost} = useDeleteTagPost();
    const { data: postTagIds } = useFetchTagPostId(id || "");


    const handleContentChange = (e: React.FormEvent<HTMLFormElement> | any) => setContent(e.target.getContent());

    const updateTags = ({ postId, tagsId }: { postId: number, tagsId: number[] }) => {
        deleteTagPost(postId);
        setTimeout(() => {tagsId.forEach(tagId => addTagToPost({ postId, tagId }));}, 1000) 
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            setImage(e.target.files[0])
        }
    }  

    const handleTagClick = (tagId: number) => {
        if(tagsId.includes(tagId)){
            setTagsId(tagsId.filter((id) => id !== tagId))
        }else{
            setTagsId([...tagsId, tagId])
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const postContent: EditPostContent = {
            post_id: post.post_id,
            title: e.currentTarget['post-title'].value,
            content: content
        }
        setError(DEFAULT_POST_ERRORS);
        try{
            const postContentCorrectData = postContentEditSchema.parse(postContent);
            setError(DEFAULT_POST_ERRORS);
            const sendData: EditPostContent = {
                title: postContentCorrectData.title,
                content: postContentCorrectData.content,
                post_id: postContent.post_id
            }
            if(image){
                uploadImage(image,post.post_id);
            }
            updatePost(sendData)
            updateTags({postId: post.post_id, tagsId: tagsId});            
        }
        catch(errorInfo: any){
            const validationError = fromZodError(errorInfo);
            validationError.details.forEach((item: any) => {
              setError((prevState) => ({
                ...prevState,
                [item.path[0]]: item.message,
              }));
            })
        }
    }

    useEffect(() => {
        if(postTagIds){
            setTagsId(postTagIds.tag_ids)
        }
    },[postTagIds])

    useEffect(() => {
        if(post){
            setContent(post.description)
        }
    },[post])

    return { handleSubmit, handleContentChange, handleImageChange , post, isLoadingPost, error , tagsId , handleTagClick}
}