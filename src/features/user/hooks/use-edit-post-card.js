import { uploadImage } from "../../../api/upload-post-image";
import { DEFAULT_POST_ERRORS } from "../../../shared/constants/post-content";
import { postContentEditSchema } from "../../../shared/utils/validate-post";
import { fromZodError } from "zod-validation-error";
import { useUpdatePost } from "../api/use-update-post";
import { useAddTagToPost } from "../../../api/use-add-tag-to-post";
import { useDeleteTagPost } from "../api/use-delete-tag-post";
import { useParams } from "react-router-dom";
import { useFetchPost } from "../../../api/use-fetch-post";
import { useEffect, useState } from "react";
export const useEditPostCard = (tagsId) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(DEFAULT_POST_ERRORS);
    const { id } = useParams();
    const { data: post, isLoading: isLoadingPost } = useFetchPost(id || "");
    const { mutate: updatePost } = useUpdatePost();
    const { mutate: addTagToPost } = useAddTagToPost();
    const { mutate: deleteTagPost } = useDeleteTagPost();
    const handleContentChange = (e) => setContent(e.target.getContent());
    const updateTags = ({ postId, tagsId }) => {
        deleteTagPost(postId);
        setTimeout(() => { tagsId.forEach(tagId => addTagToPost({ postId, tagId })); }, 1000);
    };
    const handleImageChange = (e) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const postContent = {
            post_id: post.post_id,
            title: e.currentTarget['post-title'].value,
            content: content
        };
        setError(DEFAULT_POST_ERRORS);
        try {
            const postContentCorrectData = postContentEditSchema.parse(postContent);
            setError(DEFAULT_POST_ERRORS);
            const sendData = {
                title: postContentCorrectData.title,
                content: postContentCorrectData.content,
                post_id: postContent.post_id
            };
            if (image) {
                uploadImage(image, post.post_id);
            }
            updatePost(sendData);
            updateTags({ postId: post.post_id, tagsId: tagsId });
        }
        catch (errorInfo) {
            const validationError = fromZodError(errorInfo);
            validationError.details.forEach((item) => {
                setError((prevState) => ({
                    ...prevState,
                    [item.path[0]]: item.message,
                }));
            });
        }
    };
    useEffect(() => {
        if (post) {
            setContent(post.description);
        }
    }, [post]);
    return { handleSubmit, handleContentChange, handleImageChange, post, isLoadingPost, error };
};
