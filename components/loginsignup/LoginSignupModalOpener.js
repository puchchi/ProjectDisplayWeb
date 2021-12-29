import React from 'react'
import LoginSignupModal from './LoginSignupModal';
import { useState, useRef, useEffect } from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#__next')
function LoginSignupModalOpener({ isLoginModalOpen, loginModalClosedCallback }) {

    const [isModalOpen, setIsModalOpen] = useState(isLoginModalOpen)
    const [isModal2Open, setIsModal2Open] = useState(false)

    useEffect(() => {
        setIsModalOpen(isLoginModalOpen)
    }, [isLoginModalOpen])

    const closeModal = () => {
        if (isModal2Open) {
            setIsModal2Open(false);
        }
        else {
            setIsModalOpen(false);
            loginModalClosedCallback();
        }
    }

    return (

        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="signup-login-modal"
            className={
                {
                    base: "modal-classname",
                    afterOpen: "modal-classname-after-open",
                    beforeClose: "modal-classname-before-close"
                }
            }
            overlayClassName="modal-overlay-classname"
        >
            <LoginSignupModal
                closeModal={closeModal}
                isModal2Open={isModal2Open}
                setIsModal2Open={setIsModal2Open}
            />

        </Modal>
    )
}

export default LoginSignupModalOpener
