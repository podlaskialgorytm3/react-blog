import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import { MuiColorInput } from 'mui-color-input';
import { Button } from "@mui/material";
import { Loading } from "../../../shared/components/loading";
import { TagLabel } from "../../../shared/components/tag";
import { useAddTagForm } from "../hooks/use-add-tag-from";
export const AddTagForm = () => {
    const { name, color, error, isPending, handleChangeColor, handleChangeName, handleSubmit } = useAddTagForm();
    return (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("h1", { className: 'text-center text-4xl', children: "Creating tag \uD83C\uDFF7\uFE0F\u2728 " }), isPending && _jsx(Loading, { size: 100 }), _jsxs(Box, { component: "form", onSubmit: handleSubmit, sx: {
                    '& > :not(style)': { m: 1, width: '100%' },
                }, noValidate: true, autoComplete: "off", children: [_jsx(TextField, { id: "standard-basic", label: "name-tag", variant: "standard", name: "name-tag", sx: { width: '100%' }, error: error.name ? true : false, helperText: error.name, onChange: handleChangeName }), _jsx(MuiColorInput, { value: color, onChange: handleChangeColor }), _jsx("p", { className: "text-[red]", children: error.color }), _jsx(Button, { type: "submit", variant: "contained", sx: { mt: 3, mb: 2, bgcolor: '#41c48b', color: '#fff', width: '300px', '&:hover': {
                                backgroundColor: '#328a63',
                                opacity: [0.9, 0.8, 0.7],
                            } }, children: "Create Tag" })] }), _jsx(TagLabel, { name: name, color: color })] }));
};
