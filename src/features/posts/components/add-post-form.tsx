import { useState } from 'react';
import { useAuth } from '../../../shared/hooks/useAuth';
import { PostContent } from '../types/post-content';
import { postContentSchema } from '../utils/validate';
import { fromZodError } from 'zod-validation-error';
import { Editor } from '@tinymce/tinymce-react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { ApiKeyTinyMMC } from '../../../shared/config/confidential-data';
import { useCreatePost } from '../api/use-create-post';
import { generateID } from '../utils/generate-id';
import { EDITOR_INIT } from '../../../shared/constants/editor-props';
import { uploadImage } from '../../../api/upload-post-image';

const DEFAULT_POST: PostContent = {
    postId: 0,
    userId: 0,
    title: '',
    content: ''
}

const DEFAULT_POST_ERRORS: PostContent = DEFAULT_POST;

export const AddPostForm = () => {
    const [content, setContent] = useState<string>('');
    const [error, setError] = useState<PostContent>(DEFAULT_POST_ERRORS);
    const [image, setImage] = useState<any>(null);
    const { userData } = useAuth();
    const { mutate } = useCreatePost()

    const handleContentChange = (e: React.FormEvent<HTMLFormElement> | any) => setContent(e.target.getContent());
    const randomID = generateID(1000000000);

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
    
    return(
        <div>
            <h1 className='text-center text-4xl'>Creating post 📝✨ </h1>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > :not(style)': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField 
                    id="standard-basic" 
                    label="Title" 
                    variant="standard" 
                    name="post-title" 
                    sx={{width: '100%'}}
                    error={error.title ? true : false}
                    helperText={error.title}
                />
                <Editor
                    apiKey={ApiKeyTinyMMC}
                    onChange={handleContentChange}
                    init={EDITOR_INIT}
                    initialValue=""
                />
                <p className="text-red-500">{error.content}</p>
                <div className='bg-main box-border rounded-lg relative'>
                    <h1 className='absolute top-[20%] left-[40%] font-bold'>Upload Image</h1>
                    <TextField 
                        id="standard-basic" 
                        label="Image" 
                        variant="standard" 
                        name="post-image" 
                        sx={{width: '100%', height: '100%', opacity: '0'}}
                        type='file'
                        inputProps={{ accept: 'image/*' }} 
                        onChange={handleImageChange}
                    />
                </div>
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 , bgcolor: '#41c48b', color: '#fff', width: '300px','&:hover': {
                backgroundColor: '#328a63',
                opacity: [0.9, 0.8, 0.7],
                } }}
                >Create post
                </Button>
            </Box>
        </div>
    )
}