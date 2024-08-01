//Modal.jsx
import ReactDOM from "react-dom";
import { useRef, createContext, useContext, useState } from "react";
// import styles from "./Modal.module.css";
import "./Modal.module.css";

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef();
    const [modalContent, setModalContent] = useState(null);
    // callback function that will be called when modal is closing
    const [onModalClose, setOnModalClose] = useState(null);

    const closeModal = () => {
        setModalContent(null); //clear modal contents
        // if callback function is truthy, call it and reset it to null
        if (typeof onModalClose === "function") {
            setOnModalClose(null);
            onModalClose();
        }
    };

    const contextValue = {
        modalRef, // reference to modal div
        modalContent, // react component to render inside modal
        setModalContent, //  function to set the React component to render inside modal
        setOnModalClose, // func sets callback function to call when modal close
        closeModal,
    };

    return (
        <>
            <ModalContext.Provider value={contextValue}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function Modal() {
    const { modalRef, modalContent, closeModal } = useContext(ModalContext);
    // if no div ref's modalRef or modalContext != truthy, render nothing
    if (!modalRef || !modalRef.current || !modalContent) return null;

    // // render this to the div ref'd by modalRef
    // return ReactDOM.createPortal(
    //     <div className={styles.modal}>
    //         <div className={styles.modalBackground} onClick={closeModal} />
    //         <div className={styles.modalContent}>{modalContent}</div>
    //     </div>,
    //     modalRef.current
    // );

    //imported from ministay. Not clear if this fundamentally differnt.
    return ReactDOM.createPortal(
      <div id="modal" >
        <div id="modal-background" onClick={closeModal} />
        <div id="modal-content" className="login">{modalContent}</div>
      </div>,
      modalRef.current
    );

}

export const useModal = () => useContext(ModalContext);
