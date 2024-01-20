import { PostRequest } from "../types/post-content"

const userImg = "https://img.freepik.com/premium-photo/chita_827316-164.jpg"
const postImage = "https://uploads.sitepoint.com/wp-content/uploads/2017/04/1493235373large_react_apps_A-01.png"

export const PostCard = ({ post }: { post: PostRequest }) => {
    return (
        <div className="w-[500px] h-[450px] m-5">
            <div className="w-full h-[100px] flex flex-row items-center justify-start">
                <img src={userImg} alt="post" className="w-[70px] m-5 object-cover rounded-[50%]" />
                <p className="text-[24px]">Podlaski Algorytm</p>
            </div>
            <div>
                <img src={post.image ? post.image : postImage} alt="post" className="w-full h-[250px] object-cover rounded-[50px]" />
                <h1 className="text-[24px] font-bold text-center mt-6">{post.title}</h1>
            </div>
        </div>
    )
}