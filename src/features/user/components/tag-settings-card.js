import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { TagLabel } from "../../../shared/components/tag";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
export const TagSettingsCard = ({ tag, handleDelete }) => {
    return (_jsxs("div", { className: "flex md:w-[400px] justify-between items-center", children: [_jsx(TagLabel, { color: tag.color, name: tag.name }, tag.tag_id), _jsxs("div", { children: [_jsx(Link, { to: `/user/post-settings/tag-settings/edit/${tag.tag_id}`, children: _jsx(EditIcon, { sx: { width: '45px', height: "45px" } }) }), _jsx(DeleteIcon, { sx: { width: '45px', height: "45px", cursor: "pointer" }, onClick: () => handleDelete(tag.tag_id) })] })] }));
};
