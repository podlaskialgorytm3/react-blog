import { Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import { MuiColorInput } from 'mui-color-input';
import { Button } from "@mui/material";
import { Loading } from "../../../shared/components/loading";
import { TagLabel } from "../../../shared/components/tag";
import { useAddTagForm } from "../hooks/use-add-tag-from";

export const AddTagForm = () => {
    const { name, color, error, isPending, handleChangeColor, handleChangeName, handleSubmit} = useAddTagForm();

    return (
        <div className="flex flex-col items-center">
            <h1 className='text-center text-4xl'>Creating tag 🏷️✨ </h1>
            {isPending && <Loading size={100} />}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    '& > :not(style)': { m: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField 
                    id="standard-basic" 
                    label="name-tag" 
                    variant="standard" 
                    name="name-tag" 
                    sx={{width: '100%'}}
                    error={error.name ? true : false}
                    helperText={error.name}
                    onChange={handleChangeName}
                />
                <MuiColorInput value={color} onChange={handleChangeColor} />
                <p className="text-[red]">{error.color}</p>
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 , bgcolor: '#41c48b', color: '#fff', width: '300px','&:hover': {
                backgroundColor: '#328a63',
                opacity: [0.9, 0.8, 0.7],
                } }}
                >Create Tag
                </Button>
            </Box>
            <TagLabel name={name} color={color} />
        </div>
    )
}