import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const defaultUserImageSrc = "https://img.freepik.com/premium-photo/chita_827316-164.jpg";
export const UserLabel = ({ user }) => {
    return (_jsxs("div", { className: "w-full h-[70px] flex flex-row items-center justify-start md:h-[100px]", children: [_jsx("img", { src: user.image ? user.image : defaultUserImageSrc, alt: "post", className: "md:w-[70px] md:h-[70px] md:m-5 h-[50px] w-[50px] m-3 object-cover rounded-[50%]" }), _jsxs("p", { className: "text-[24px]", children: [user.first_name, " ", user.last_name] })] }));
};
