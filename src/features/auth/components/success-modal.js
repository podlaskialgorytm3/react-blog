import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Modal from 'react-modal';
// import  successIMG  from '../../../assets/correct.png';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { STYLES_PROGRES_BAR } from '../constants/data';
export const SuccessModal = ({ isOpen, redirect_time, text }) => {
    const [remainingTime, setRemainingTime] = useState(redirect_time);
    useEffect(() => {
        if (remainingTime > 0 && isOpen) {
            setTimeout(() => {
                setRemainingTime(remainingTime - 10);
            }, 10);
        }
    }, [remainingTime, isOpen]);
    const percentage = Math.round((redirect_time - remainingTime) / redirect_time * 100);
    return (_jsx(Modal, { isOpen: isOpen, ariaHideApp: false, style: {
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }
        }, className: "bg-white rounded-lg w-[350px] h-[400px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]", children: _jsxs("div", { className: "flex flex-col justify-center items-center", children: [_jsx("h1", { className: "text-main text-5xl text-center font-bold m-5 mb-10", children: "Success!" }), _jsx(CircularProgressbar, { value: percentage, text: `${percentage}%`, strokeWidth: 5, styles: STYLES_PROGRES_BAR }), ";", _jsx("p", { className: "text-black p-3 text-center", children: text })] }) }));
};
