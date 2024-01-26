import { Link } from "react-router-dom"

export const TagSettingsContainer = () => {
    return(
        <div className={`w-[500px] h-[auto] flex flex-col items-center relative`}>
                <h1 className="text-[36px] mb-5">Tag Settings 🔧🗂️</h1>
                <p className="text-lg">Go to <Link to="/user/post-settings" className="text-main font-bold">Post Settings</Link></p>
         </div>
    )
}