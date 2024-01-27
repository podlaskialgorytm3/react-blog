import { PostSettings } from "../types/post-settings"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { postImage } from "../../../shared/constants/data";
import { Link } from "react-router-dom";

export const PostSettingsCard = ({post,handleDeletePost} : PostSettings) => {
    return(
        <div className={`md:w-[600px] md:h-[100px] w-[300px] flex items-center justify-between flex-row m-5`}>
            <div className="flex items-center">
                <img src={post.image ? post.image : postImage} alt={post.title} className="w-[100px] h-[100px] object-cover" />
                <h1 className="text-[16px] md:text-[20px] ml-5 w-[250px]">{post.title}</h1>
            </div>
            <div>
                <Link to={`/user/post-settings/edit/${post.post_id}`}><EditIcon sx={{width: '45px', height: "45px"}}/></Link>
                <DeleteIcon sx={{width: '45px', height: "45px", cursor: "pointer"}} onClick={() => handleDeletePost(post.post_id)}/>
            </div>
        </div>
    )
}