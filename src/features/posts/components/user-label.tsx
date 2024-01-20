const userImg = "https://img.freepik.com/premium-photo/chita_827316-164.jpg"

export const UserLabel = ({ user }: { user: any }) => {
    return(
        <div className="w-full h-[100px] flex flex-row items-center justify-start">
                <img src={user.image ? user.image : userImg} alt="post" className="w-[70px] h-[70px] m-5 object-cover rounded-[50%]" />
                <p className="text-[24px]">{user.first_name} {user.last_name}</p>
        </div>
    )
}