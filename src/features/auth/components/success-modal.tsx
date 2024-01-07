import  Modal  from 'react-modal';
import  successIMG  from '../../../assets/correct.png';

export const SuccessModal:React.FC<{isOpen: boolean}> = ({isOpen}) => {
        return(
            <Modal
                isOpen={isOpen}
                ariaHideApp={false}
                className="bg-white rounded-lg w-[350px] h-[350px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
             >
                <div className="flex flex-col">
                    <h1 className="text-[green] text-5xl text-center font-bold m-5">Success!</h1>
                    <img src={successIMG} alt="success" className="w-[100px] h-[100px] mx-auto"/>
                    <p className="text-black p-3 text-center">You have successfully created your account.</p>
                </div>
             </Modal> 
        )
}