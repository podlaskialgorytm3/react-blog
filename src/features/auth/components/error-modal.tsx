import  Modal  from 'react-modal';
import  errorIMG  from '../../../assets/error.png';
import Button from '@mui/material/Button';

const buttonStyles = {
    mx: 'auto',
    display: 'block',
    mb: 2,
    mt: 2,
    color: 'white',
    bgcolor: 'red',
    '&:hover': {
        bgcolor: 'red',
        opacity: [0.9, 0.8, 0.7],
    }
}

export const ErrorModal:React.FC<{isOpen: boolean,closeModal: (event: React.MouseEvent | React.KeyboardEvent) => void,isError: boolean, error: any}> = ({isOpen,closeModal,isError,error}) => {
        return(
                <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                className="bg-white rounded-lg w-[350px] h-[350px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
             >
                {isError && (
                    <div className="flex flex-col">
                        <h1 className="text-[red] text-5xl text-center font-bold m-5">Error</h1>
                        <img src={errorIMG} alt="error" className="w-[100px] h-[100px] mx-auto"/>
                        <p className="text-black p-3 text-center">{error.message}</p>
                        <Button onClick={closeModal} sx={buttonStyles}>close</Button>
                    </div>
                )}
             </Modal> 
        )
}