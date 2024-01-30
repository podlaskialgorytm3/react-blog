import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAuth } from "../../../shared/hooks/useAuth";
import { imageDatabase } from "../../../shared/config/firebase-image";
import { ref, uploadBytes } from "firebase/storage";
import { Loading } from "../../../shared/components/loading";
import { useFetchImage } from "../api/use-fetch-image";
import { useFetchPostCount } from "../api/use-fetch-post-count";
const img = "https://img.freepik.com/premium-photo/chita_827316-164.jpg";
export const ProfileCard = () => {
    const { userData } = useAuth();
    const handleChange = (e) => {
        if (e.target.files) {
            uploadBytes(ref(imageDatabase, `uploads/${userData.user_id}`), e.target.files[0]).then(() => {
                window.location.reload();
            });
        }
    };
    const { data: imgURL, isLoading: isLoadingImg } = useFetchImage(userData.user_id);
    const { data: postCount, isLoading: isLoadingPostCount } = useFetchPostCount(userData.user_id);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: `md:w-[500px] md:h-[600px] w-[350px] h-[550px] flex flex-col items-center relative border-[#41c48b] border-[3px]`, children: [_jsx("div", { className: "mt-10", children: isLoadingImg && _jsx(Loading, { size: 50 }) }), (imgURL || !isLoadingImg) && _jsx("img", { src: imgURL ? imgURL : img, alt: "profile", className: "w-[200px] h-[200px] rounded-full object-cover border-[#41c48b] border-[3px]" }), _jsx("input", { type: "file", accept: "image/*", className: "absolute top-20 left-40 w-[200px] h-[200px] block opacity-0", onChange: handleChange }), _jsxs("h1", { className: "text-center mt-10 text-3xl md:text-5xl", children: [userData.first_name, " ", userData.last_name] }), _jsx("p", { className: "mt-10 text-2xl md:text-3xl", children: userData.city }), _jsx("p", { className: "mt-10 text-2xl md:text-3xl", children: (!isLoadingPostCount || postCount) && `${postCount.postCount} posts` })] }) }));
};
