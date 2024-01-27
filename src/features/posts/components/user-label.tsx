import { UserLabel as UserLabelSchema } from "../types/user-label"

const userImg = "https://img.freepik.com/premium-photo/chita_827316-164.jpg"

export const UserLabel = ({ user }: { user: UserLabelSchema }) => {
    return(
        <div className="w-full h-[70px] flex flex-row items-center justify-start md:h-[100px]">
                <img src={user.image ? user.image : userImg} alt="post" className="md:w-[70px] md:h-[70px] md:m-5 h-[50px] w-[50px] m-3 object-cover rounded-[50%]" />
                <p className="text-[24px]">{user.first_name} {user.last_name}</p>
        </div>
    )
}