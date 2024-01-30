import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Modal from 'react-modal';
import errorIMG from '../../../assets/error.png';
import Button from '@mui/material/Button';
import { STYLES_BUTTON } from '../constants/data';
export const ErrorModal = ({ isOpen, closeModal, isError, error }) => {
    return (_jsx(Modal, { isOpen: isOpen, onRequestClose: closeModal, ariaHideApp: false, style: {
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }
        }, className: "bg-[#dfdfdf] rounded-lg w-[350px] h-[350px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]", children: isError && (_jsxs("div", { className: "flex flex-col", children: [_jsx("h1", { className: "text-[red] text-5xl text-center font-bold m-5", children: "Error" }), _jsx("img", { src: errorIMG, alt: "error", className: "w-[100px] h-[100px] mx-auto" }), _jsx("p", { className: "text-black p-3 text-center", children: error.message }), _jsx(Button, { onClick: closeModal, sx: STYLES_BUTTON, children: "close" })] })) }));
};
