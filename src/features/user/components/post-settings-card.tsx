import { PostRequest } from "../../../shared/types/post-request"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { postImage } from "../../../shared/constants/data";

export const PostSettingsCard = ({post}: {post: PostRequest}) => {
    return(
        <div className={`w-[500px] h-[100px] flex items-center justify-between flex-row m-5`}>
            <div className="flex items-center">
                <img src={post.image ? post.image : postImage} alt={post.title} className="w-[100px] h-[100px] object-cover" />
                <h1 className="text-[20px] ml-5">{post.title}</h1>
            </div>
            <div>
                <EditIcon sx={{width: '45px', height: "45px"}}/>
                <DeleteIcon sx={{width: '45px', height: "45px"}}/>
            </div>
        </div>
    )
}