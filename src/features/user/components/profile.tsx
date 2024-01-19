import { useAuth } from "../../../shared/hooks/useAuth"

import { imageDatabase } from "../../../shared/config/config"
import { ref,uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { useEffect, useState } from "react"

const img = "https://img.freepik.com/premium-photo/chita_827316-164.jpg"

export const ProfileCard = () => {
    const [imageURL, setImageURL] = useState<string>("")
    const { userData } = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            uploadBytes(ref(imageDatabase, `uploads/${userData.user_id}`), e.target.files[0])
        }
    }
    

    useEffect(() => {
        listAll(ref(imageDatabase, "uploads")).then((res) => {
           res.items.forEach((item) => {
            getDownloadURL(item).then(url => {
                setImageURL(url)
            })
           })
        })
    },[imageURL])
    

    return(
        <>
            <div className={`w-[500px] h-[600px] flex flex-col items-center relative border-[#41c48b] border-[3px]`}>
                <img src={imageURL ? imageURL : img} className={`w-[200px] h-[200px] mt-10 rounded-[50%] border-[#41c48b] border-[3px]`}/>
                <input type="file" accept="image/*" className="absolute top-20 left-40 w-[200px] h-[200px] block opacity-0" onChange={handleChange}/>
                <h1 className="mt-10 text-5xl">{userData.first_name} {userData.last_name}</h1>
                <p className="mt-10 text-3xl">{userData.city}</p>
                <p className="mt-10 text-3xl">10 postów</p>
            </div>
        </>
    )
}