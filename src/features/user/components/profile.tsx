import { useAuth } from "../../../shared/hooks/useAuth"
import { imageDatabase } from "../../../shared/config/firebase-image"
import { ref,uploadBytes } from "firebase/storage"
import { Loading } from "../../../shared/components/loading"

import { useFetchImage } from "../api/use-fetch-image";
import { useFetchPostCount } from "../api/use-fetch-post-count";

const img = "https://img.freepik.com/premium-photo/chita_827316-164.jpg"

export const ProfileCard = () => {
    const { userData } = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            uploadBytes(ref(imageDatabase, `uploads/${userData.user_id}`), e.target.files[0]).then(() => {
               window.location.reload();
            })
        }
    }    

    const { data: imgURL, isLoading: isLoadingImg} = useFetchImage(userData.user_id)
    const {data: postCount, isLoading: isLoadingPostCount} = useFetchPostCount(userData.user_id)


    return(
        <>
            <div className={`w-[500px] h-[600px] flex flex-col items-center relative border-[#41c48b] border-[3px]`}>
                <div className="mt-10">{isLoadingImg && <Loading size={50}/> }</div>
                {(imgURL || !isLoadingImg) && <img src={imgURL ? imgURL : img} alt="profile" className="w-[200px] h-[200px] rounded-full object-cover border-[#41c48b] border-[3px]"/>}
                <input type="file" accept="image/*" className="absolute top-20 left-40 w-[200px] h-[200px] block opacity-0" onChange={handleChange}/>
                <h1 className="mt-10 text-5xl">{userData.first_name} {userData.last_name}</h1>
                <p className="mt-10 text-3xl">{userData.city}</p>
                <p className="mt-10 text-3xl">{(!isLoadingPostCount || postCount) && `${postCount.postCount} posts`}</p>
            </div>
        </>
    )
}