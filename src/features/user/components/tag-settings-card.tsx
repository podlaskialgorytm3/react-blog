import { Link } from "react-router-dom";
import { TagLabel } from "../../../shared/components/tag";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TagResponse } from "../types/tag-response";

export const TagSettingsCard = ({ tag, handleDelete }: { tag: TagResponse, handleDelete: (tagId: number) => void }) => {
    return(
        <div className="flex w-[400px] justify-between items-center">
            <TagLabel key={tag.tag_id} color={tag.color} name={tag.name} />
            <div>
                <Link to={`/user/post-settings/tag-settings/edit/${tag.tag_id}`}><EditIcon sx={{width: '45px', height: "45px"}}/></Link>
                <DeleteIcon sx={{width: '45px', height: "45px", cursor: "pointer"}} onClick={() => handleDelete(tag.tag_id)}/>
            </div>
        </div>
    )
}