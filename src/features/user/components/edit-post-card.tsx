import { useParams } from "react-router-dom";
import { useFetchPost } from "../../../api/use-fetch-post";
import { Box, Button, TextField } from "@mui/material";
import { ApiKeyTinyMMC } from "../../../shared/config/confidential-data";
import { EDITOR_INIT } from "../../../shared/constants/editor-props";
import { Editor } from '@tinymce/tinymce-react';


export const EditPostCard = () => {
    const {id} = useParams<{id: string | undefined}>()
    const {data} = useFetchPost(id || "")

    const handleSubmit = () => {
        console.log('submit')
    }

    const handleContentChange = () => {
        console.log('content change')
    }

    const handleImageChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('image change')
    }

    return(
        <div>
            <h1 className="text-[36px] text-center">Editing Post 📄✏️</h1>
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
                    // error={error.title ? true : false}
                    // helperText={error.title}
                />
                <Editor
                    apiKey={ApiKeyTinyMMC}
                    onChange={handleContentChange}
                    init={EDITOR_INIT}
                    initialValue=""
                />
                {/* <p className="text-red-500">{error.content}</p> */}
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
                >Edit post
                </Button>
            </Box>
        </div>
    )
}
