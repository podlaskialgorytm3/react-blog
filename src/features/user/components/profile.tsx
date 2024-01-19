import { useAuth } from "../../../shared/hooks/useAuth"
import { imageDatabase } from "../../../shared/config/config"
import { ref,uploadBytes } from "firebase/storage"
import { useQuery } from "@tanstack/react-query"
import { fetchImage } from "../api/fetch-image";
import { Loading } from "../../../shared/components/loading"

const img = "https://img.freepik.com/premium-photo/chita_827316-164.jpg"

export const ProfileCard = () => {
    const { userData } = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            uploadBytes(ref(imageDatabase, `uploads/${userData.user_id}`), e.target.files[0])
        }
    }    

    const { data, isLoading} = useQuery({
        queryFn: () => fetchImage(userData.user_id),
        refetchOnWindowFocus: false,
        queryKey: ["uploads"],
    })

    return(
        <>
            <div className={`w-[500px] h-[600px] flex flex-col items-center relative border-[#41c48b] border-[3px]`}>
                <div className="mt-10">{isLoading && <Loading size={50}/> }</div>
                {(data || !isLoading) && <img src={data ? data : img} alt="profile" className="w-[200px] h-[200px] rounded-full object-cover border-[#41c48b] border-[3px]"/>}
                <input type="file" accept="image/*" className="absolute top-20 left-40 w-[200px] h-[200px] block opacity-0" onChange={handleChange}/>
                <h1 className="mt-10 text-5xl">{userData.first_name} {userData.last_name}</h1>
                <p className="mt-10 text-3xl">{userData.city}</p>
                <p className="mt-10 text-3xl">10 postów</p>
            </div>
        </>
    )
}