import { useState } from 'react';
import { PostContent } from '../types/post-content';
import { postContentSchema } from '../utils/validate';
import { fromZodError } from 'zod-validation-error';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


let DEFAULT_POST: PostContent = {
    title: '',
    content: ''
}

export const AddPostForm = () => {
    const [content, setContent] = useState<string>('');
    const [error, setError] = useState<PostContent>(DEFAULT_POST);
    const handleContentChange = (content: string) => setContent(content);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let postContent: PostContent = {
            title: e.currentTarget['post-title'].value,
            content: content
        }
        setError(DEFAULT_POST);
        try{
            let PostContent = postContentSchema.parse(postContent);
            setError(DEFAULT_POST);
            console.log(PostContent)
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
                <ReactQuill
                    theme="snow" 
                    value={content}
                    onChange={handleContentChange}
                />
                <p className="text-red-500">{error.content}</p>
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