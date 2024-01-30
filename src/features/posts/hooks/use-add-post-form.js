import { useState } from 'react';
import { generateID } from '../utils/generate-id';
import { useAuth } from '../../../shared/hooks/useAuth';
import { DEFAULT_POST_ERRORS } from '../../../shared/constants/post-content';
import { postContentSchema } from '../../../shared/utils/validate-post';
import { uploadImage } from '../../../api/upload-post-image';
import { useCreatePost } from '../api/use-create-post';
import { fromZodError } from 'zod-validation-error';
import { useAddTagToPost } from '../../../api/use-add-tag-to-post';
export const useAddPostForm = (tagsId) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(DEFAULT_POST_ERRORS);
    const { userData } = useAuth();
    const { mutate } = useCreatePost();
    const { mutate: mutateTags } = useAddTagToPost();
    const randomID = generateID(1000000000);
    const handleContentChange = (e) => setContent(e.target.getContent());
    const handleImageChange = (e) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const postContent = {
            postId: randomID,
            userId: userData.user_id,
            title: e.currentTarget['post-title'].value,
            content: content
        };
        setError(DEFAULT_POST_ERRORS);
        try {
            const postContentCorrectData = postContentSchema.parse(postContent);
            setError(DEFAULT_POST_ERRORS);
            uploadImage(image, randomID);
            mutate({ ...postContentCorrectData, postId: randomID });
            tagsId.forEach((tagId) => mutateTags({ postId: randomID, tagId: tagId }));
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
    return { handleSubmit, handleContentChange, handleImageChange, error };
};
