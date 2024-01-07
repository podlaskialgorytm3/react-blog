import  Modal  from 'react-modal';
import  errorIMG  from '../../../assets/error.png';
import Button from '@mui/material/Button';
import { STYLES_BUTTON } from '../constants/data';
import { ErrorModalData } from '../types/error-modal';


export const ErrorModal:React.FC<ErrorModalData> = ({isOpen,closeModal,isError,error}) => {
        return(
                <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }
                }}
                className="bg-[#030712] rounded-lg w-[350px] h-[350px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
             >
                {isError && (
                    <div className="flex flex-col">
                        <h1 className="text-[red] text-5xl text-center font-bold m-5">Error</h1>
                        <img src={errorIMG} alt="error" className="w-[100px] h-[100px] mx-auto"/>
                        <p className="text-white p-3 text-center">{error.message}</p>
                        <Button onClick={closeModal} sx={STYLES_BUTTON}>close</Button>
                    </div>
                )}
             </Modal> 
        )
}