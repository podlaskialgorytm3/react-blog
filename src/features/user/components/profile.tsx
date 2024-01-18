import { useMutation } from "@tanstack/react-query"

import { updateImage } from "../api/update-image"
import { useAuth } from "../../../shared/hooks/useAuth"

const img = "https://img.freepik.com/premium-photo/chita_827316-164.jpg"
const border = "border-[#41c48b] border-[3px]"


export const ProfileCard = () => {
    const { userData } = useAuth()
    const { mutate } = useMutation({
        mutationFn: updateImage,
        onSuccess: (data) => {
            console.log(data)
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        if (e.target.files) {
            formData.append("image", e.target.files[0]);
            mutate(formData)
        }

    }

    return(
        <>
            <div className={`w-[500px] h-[600px] flex flex-col items-center relative ${border}`}>
                <img src={img} className={`w-[200px] h-[200px] mt-10 rounded-[50%] ${border}`}/>
                <input type="file" accept="image/*" className="absolute top-20 left-40 w-[200px] h-[200px] block opacity-0" onChange={handleChange}/>
                <h1 className="mt-10 text-5xl">{userData.first_name} {userData.last_name}</h1>
                <p className="mt-10 text-3xl">{userData.city}</p>
                <p className="mt-10 text-3xl">10 postów</p>
            </div>
        </>
    )
}