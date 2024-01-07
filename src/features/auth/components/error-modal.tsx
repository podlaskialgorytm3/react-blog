import  Modal  from 'react-modal';

export const ErrorModal:React.FC<{isOpen: boolean,closeModal: (event: React.MouseEvent | React.KeyboardEvent) => void,isError: boolean, error: any}> = ({isOpen,closeModal,isError,error}) => {
        return(
                <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                className="bg-white rounded-lg w-[400px] h-[400px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
             >
                {isError && (
                    <>
                        <h2>{error.message}</h2>
                        <button onClick={closeModal}>close</button>
                    </>
                )}
             </Modal> 
        )
}