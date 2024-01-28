import { useState } from 'react';
import { PostContent } from '../../../shared/types/post-content';
import { generateID } from '../utils/generate-id';
import { useAuth } from '../../../shared/hooks/useAuth';
import { DEFAULT_POST_ERRORS } from '../../../shared/constants/post-content';
import { postContentSchema } from '../../../shared/utils/validate-post';
import { uploadImage } from '../../../api/upload-post-image';
import { useCreatePost } from '../api/use-create-post';
import { fromZodError } from 'zod-validation-error';
import { useAddTagToPost } from '../../../api/use-add-tag-to-post';


export const useAddPostForm = (tagsId: number[]) => {
    const [content, setContent] = useState<string>('');
    const [image, setImage] = useState<any>(null);
    const [error, setError] = useState<PostContent>(DEFAULT_POST_ERRORS);

    const { userData } = useAuth();
    const { mutate } = useCreatePost()
    const { mutate: mutateTags } = useAddTagToPost()


    const randomID = generateID(1000000000);

    const handleContentChange = (e: React.FormEvent<HTMLFormElement> | any) => setContent(e.target.getContent());

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            setImage(e.target.files[0])
        }
    } 

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const postContent: PostContent = {
            postId: randomID,
            userId: userData.user_id,
            title: e.currentTarget['post-title'].value,
            content: content
        }
        setError(DEFAULT_POST_ERRORS);
        try{
            const postContentCorrectData = postContentSchema.parse(postContent);
            setError(DEFAULT_POST_ERRORS);
            uploadImage(image,randomID);
            mutate({...postContentCorrectData, postId: randomID})
            tagsId.forEach((tagId) => mutateTags({postId: randomID, tagId: tagId}))
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

    return {handleSubmit, handleContentChange, handleImageChange, error}
}