import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import uistring from '../../data/uistring.json'
import { setUserLoggedIn, setUserLoggedOut } from '../../redux';

import LoginSignupModal from "../loginsignup/LoginSignupModal";
import Modal from 'react-modal';

Modal.setAppElement('#__next')
function UserLoginDetails(props) {

    // Data from redux store
    const isUserLoggedIn = useSelector(state => state.loginDetail.isUserLoggedIn);
    const dispatch = useDispatch()

    const userDetailDropDownRef = useRef(null);

    const clickedOutsideOfRef = (ref) => {
        useEffect(() => {
            let handleClickOutside;
            handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    props.setHideUserDetailDown()
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModal2Open, setIsModal2Open] = useState(false)

    const openModal = () => {
        props.setHideUserDetailDown();
        setIsModalOpen(true);
        setIsModal2Open(false);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.

    }

    const closeModal = () => {
        if (isModal2Open) {
            setIsModal2Open(false);
        }
        else {
            setIsModalOpen(false);
        }
    }

    clickedOutsideOfRef(userDetailDropDownRef);

    return (
        <>
            <div className={`${props.showDropDown ? "" : "hidden "} flex rounded-2xl bg-white shadow-locationResult w-[16rem] right-0
        absolute mr-customSm md:mr-customMd mt-3 py-2 text-textColor-heavy border text-sm 
        `} ref={userDetailDropDownRef}>
                <section className="w-full">
                    <ul className="cursor-pointer" >
                        {
                            !isUserLoggedIn ? <li className="font-medium user-detail-dd-list-item" onClick={openModal}>{uistring.header.signup}</li> :
                                <li className="user-detail-dd-list-item" >{uistring.header.myaccount}</li>
                        }
                        {
                            !isUserLoggedIn ? <li className="user-detail-dd-list-item" onClick={openModal}>{uistring.header.login}</li> :
                                <li className="user-detail-dd-list-item" onClick={() => dispatch(setUserLoggedOut())}>{uistring.header.logout}</li>
                        }

                        <li className="w-full py-2"><hr className="" /></li>
                        {
                            !isUserLoggedIn ? <li className="user-detail-dd-list-item">{uistring.header.createPortfolio}</li> : ""
                        }
                        <li className=" user-detail-dd-list-item" >{uistring.header.help}</li>
                    </ul>
                </section>
            </div>

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
        </>
    )
}

export default UserLoginDetails
