import { useAuth } from "../../shared/hooks/useAuth"

const img = "https://img.freepik.com/premium-photo/chita_827316-164.jpg"

export const ProfileCard = () => {
    const { userData } = useAuth()

    return(
        <>
            <div className="w-[500px] h-[700px] border-[#41c48b] border-[3px] flex flex-col items-center relative">
                <img src={img} className="w-[200px] h-[200px] mt-10 rounded-[50%] border-[#41c48b] border-[3px]"/>
                <input type="file" accept="image/*" className="absolute top-20 left-40 w-[200px] h-[200px] block opacity-0"/>
                <h1 className="mt-10 text-5xl">{userData.first_name} {userData.last_name}</h1>
                <p className="mt-10 text-3xl">{userData.city}</p>
                <p className="mt-10 text-3xl">10 postów</p>
            </div>
        </>
    )
}