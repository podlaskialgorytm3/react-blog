import  Modal  from 'react-modal';
// import  successIMG  from '../../../assets/correct.png';
import { useEffect,useState } from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { STYLES_PROGRES_BAR } from '../constants/data';

export const SuccessModal:React.FC<{isOpen: boolean,redirect_time: number}> = ({isOpen,redirect_time}) => {
    const [remainingTime, setRemainingTime] = useState(redirect_time);
    useEffect(() => {
        if(remainingTime > 0 && isOpen){
            setTimeout(() => {
                setRemainingTime(remainingTime - 10);
            },10)
        }
        console.log(remainingTime)
    },[remainingTime,isOpen])

    const percentage = Math.round((redirect_time - remainingTime) / redirect_time * 100);

    return(
        <Modal
            isOpen={isOpen}
            ariaHideApp={false}
            className="bg-white rounded-lg w-[350px] h-[400px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
         >
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-main text-5xl text-center font-bold m-5 mb-10">Success!</h1>
                {/* <img src={successIMG} alt="success" className="w-[100px] h-[100px] mx-auto mb-5"/> */}
                <CircularProgressbar 
                    value={percentage} 
                    text={`${percentage}%`}
                    strokeWidth={5}
                    styles={STYLES_PROGRES_BAR}
                />;
                <p className="text-black p-3 text-center">You have successfully created your account.</p>
            </div>
         </Modal> 
    )
}