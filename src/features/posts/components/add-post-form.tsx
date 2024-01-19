import { useState } from 'react';
import { PostContent } from '../types/post-content';
import { postContentSchema } from '../utils/validate';
import { fromZodError } from 'zod-validation-error';
import { Editor } from '@tinymce/tinymce-react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import 'react-quill/dist/quill.snow.css';

import { ApiKeyTinyMMC } from '../../../shared/config/config';

const DEFAULT_POST: PostContent = {
    title: '',
    content: ''
}

export const AddPostForm = () => {
    const [content, setContent] = useState<string>('');
    const [error, setError] = useState<PostContent>(DEFAULT_POST);
    const handleContentChange = (e: React.FormEvent<HTMLFormElement> | any) => setContent(e.target.getContent());


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
                <Editor
                    apiKey={ApiKeyTinyMMC}
                    onChange={handleContentChange}
                    init={{
                        plugins: 'mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                        width: '1000px',
                        mergetags_list: [
                            { value: 'First.Name', title: 'First Name' },
                            { value: 'Email', title: 'Email' },
                        ],
                        skin: 'oxide-dark'
                        }}
                    initialValue="Create your first POST!"
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