import { XIcon } from '@heroicons/react/solid'
import { ChevronLeftIcon } from '@heroicons/react/solid'

import { useState, useRef, useEffect } from 'react'

import uistring from '../../data/uistring.json'
import commonString from '../../data/common.json'

import { useFocus } from '../hooks/useFocus'
import FacebookLoginComp from './FacebookLoginComp'
import GoogleLoginComp from './GoogleLoginComp'
import { RiErrorWarningFill } from "react-icons/ri";

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

function ContinueButton({ continueButtonClicked }) {
    const [mouseDown, setMouseDown] = useState(false)

    return (
        <div className="mt-6 mb-2 rounded-lg overflow-hidden">
            <button type="submit" className={`${mouseDown ? "scale-95 " : ""}cursor-pointer relative text-base leading-5 font-medium py-[14px] px-6 bg-primary 
                    text-white w-full transition-all rounded-lg tracking-wide`} onMouseDown={() => { setMouseDown(true) }} onMouseLeave={() => { setMouseDown(false) }}
                onMouseUp={() => { setMouseDown(false) }} onClick={continueButtonClicked}>{uistring.loginSignupModal.continue}</button>
        </div >
    )
}

function OTPInputs() {
    const [otpString, setOtpString] = useState("");

    const [otpValue1, setOtpValue1] = useState("");
    const [otpValue2, setOtpValue2] = useState("");
    const [otpValue3, setOtpValue3] = useState("");
    const [otpValue4, setOtpValue4] = useState("");
    const [otpValue5, setOtpValue5] = useState("");
    const [otpValue6, setOtpValue6] = useState("");

    const [otpInput1, setOtpInput1Ref] = useFocus();
    const [otpInput2, setOtpInput2Ref] = useFocus();
    const [otpInput3, setOtpInput3Ref] = useFocus();
    const [otpInput4, setOtpInput4Ref] = useFocus();
    const [otpInput5, setOtpInput5Ref] = useFocus();
    const [otpInput6, setOtpInput6Ref] = useFocus();

    const [otpErrorState, setOtpErrorState] = useState(false)

    useEffect(() => {
        setOtp(otpValue1 + otpValue2 + otpValue3 + otpValue4 + otpValue5 + otpValue6);
    }, [otpValue1, otpValue2, otpValue3, otpValue4, otpValue5, otpValue6])

    const setOtp = (otpStr) => {
        setOtpValue1("");
        setOtpValue2("");
        setOtpValue3("");
        setOtpValue4("");
        setOtpValue5("");
        setOtpValue6("");
        switch (otpStr.length) {
            case 6: {
                setOtpValue6(otpStr[5]);
            }
            case 5: {
                setOtpValue5(otpStr[4]);
            }
            case 4: {
                setOtpValue4(otpStr[3]);
            }
            case 3: {
                setOtpValue3(otpStr[2]);
            }
            case 2: {
                setOtpValue2(otpStr[1]);
            }
            case 1: {
                setOtpValue1(otpStr[0]);
            }
        }

        // Setting focus to next avaiable input
        switch (otpStr.length) {
            case 6: {
                break;
            }
            case 5: {
                setOtpInput6Ref();
                break;
            }
            case 4: {
                setOtpInput5Ref();
                break;
            }
            case 3: {
                setOtpInput4Ref();
                break;
            }
            case 2: {
                setOtpInput3Ref();
                break;
            }
            case 1: {
                setOtpInput2Ref();
                break;
            }
            case 0: {
                setOtpInput1Ref();
                break;
            }
        }
        setOtpString(otpStr);
    }

    const setOtpValueForNthInput = async (e, n) => {

        setOtpErrorState(false);
        switch (n) {
            case 1: {
                setOtpValue1(e.target.value);
                break;
            }
            case 2: {
                setOtpValue2(e.target.value);
                break;
            }
            case 3: {
                setOtpValue3(e.target.value);
                break;
            }
            case 4: {
                setOtpValue4(e.target.value);
                break;
            }
            case 5: {
                setOtpValue5(e.target.value);
                break;
            }
            case 6: {
                setOtpValue6(e.target.value);
                break;
            }
        }
    }

    const keyDownOnNthInput = (e, n) => {
        if (e.keyCode == 8) {

            console.log("backspace")
            if (otpString.length < n) {
                switch (n) {
                    case 6: {
                        setOtpValue5("");
                        break;
                    }
                    case 5: {
                        setOtpValue4("");
                        break;
                    }
                    case 4: {
                        setOtpValue3("");
                        break;
                    }
                    case 3: {
                        setOtpValue2("");
                        break;
                    }
                    case 2: {
                        setOtpValue1("");
                        break;
                    }
                    case 1: {
                        break;
                    }
                }
            }
        }
    }

    return (
        <div>
            <div className="table w-full mt-5 relative">
                <div className="block float-left relatve pl-0.5">
                    <input ref={otpInput1} className={`${otpErrorState ? "bg-background-errorLight border-error-type1 " : "border-border-dark "}otp-input`} type="text" maxLength="1"
                        value={otpValue1} onKeyDown={(e) => { keyDownOnNthInput(e, 1) }} onChange={(e) => { setOtpValueForNthInput(e, 1) }} />
                </div>
                <div className="block float-left relatve pl-0.5">
                    <input ref={otpInput2} className={`${otpErrorState ? "bg-background-errorLight border-error-type1 " : "border-border-dark "}otp-input`} type="text" maxLength="1"
                        value={otpValue2} onKeyDown={(e) => { keyDownOnNthInput(e, 2) }} onChange={(e) => { setOtpValueForNthInput(e, 2) }} />
                </div>
                <div className="block float-left relatve pl-0.5">
                    <input ref={otpInput3} className={`${otpErrorState ? "bg-background-errorLight border-error-type1 " : "border-border-dark "}otp-input`} type="text" maxLength="1"
                        value={otpValue3} onKeyDown={(e) => { keyDownOnNthInput(e, 3) }} onChange={(e) => { setOtpValueForNthInput(e, 3) }} />
                </div>
                <div className="block float-left relatve pl-0.5">
                    <input ref={otpInput4} className={`${otpErrorState ? "bg-background-errorLight border-error-type1 " : "border-border-dark "}otp-input`} type="text" maxLength="1"
                        value={otpValue4} onKeyDown={(e) => { keyDownOnNthInput(e, 4) }} onChange={(e) => { setOtpValueForNthInput(e, 4) }} />
                </div>
                <div className="block float-left relatve pl-0.5">
                    <input ref={otpInput5} className={`${otpErrorState ? "bg-background-errorLight border-error-type1 " : "border-border-dark "}otp-input`} type="text" maxLength="1"
                        value={otpValue5} onKeyDown={(e) => { keyDownOnNthInput(e, 5) }} onChange={(e) => { setOtpValueForNthInput(e, 5) }} />
                </div>
                <div className="block float-left relatve pl-0.5">
                    <input ref={otpInput6} className={`${otpErrorState ? "bg-background-errorLight border-error-type1 " : "border-border-dark "}otp-input`} type="text" maxLength="1"
                        value={otpValue6} onKeyDown={(e) => { keyDownOnNthInput(e, 6) }} onChange={(e) => { setOtpValueForNthInput(e, 6) }} />
                </div>

            </div>

            {/* OTP related error */}
            {otpErrorState ?
                <div className="flex text-error-type1 text-xs mt-1 items-center">
                    <RiErrorWarningFill className="w-5 h-5" />
                    <span className="ml-1">{uistring.loginSignupModal.somethingWentWrong}</span>
                </div>
                : ""
            }
        </div>
    )
}

function LoginSignupModal({ closeModal, isModal2Open, setIsModal2Open }) {

    const [phoneNoInputWidgetIsActive, setPhoneNoInputWidgetIsActive] = useState(false)
    const [phoneNo, setPhoneNo] = useState("")

    const phoneNoWidgetRef = useRef(null);

    const [phoneNoInputWidgetRef, setPhoneNoInputWidgetRef] = useFocus()

    // Use to store input error state 
    const [phoneNoInputErrorState, setPhoneNoInputErrorState] = useState(false)
    const [errorString, setErrorString] = useState("")

    const [isLoginOrOtpModalOpen, setIsLoginOrOtpModalOpen] = useState(false);        // false for login, true for otp

    const setPhoneNoInput = (e) => {
        setPhoneNo(e.target.value);
        setPhoneNoInputErrorState(false);
    }
    const phoneNoWidgetClicked = () => {
        setPhoneNoInputWidgetRef();
        setPhoneNoInputWidgetIsActive(true);
    }

    if (isModal2Open != isLoginOrOtpModalOpen) {
        setIsLoginOrOtpModalOpen(isModal2Open);

        // If we are coming back from otp to login modal, reset phone no
        if (!isModal2Open) {
            setPhoneNo("");
        }
    }

    const continueButtonClicked = () => {
        if (phoneNo.length == 0) {
            setPhoneNoInputErrorState(true);
            setErrorString(uistring.loginSignupModal.error.emptyPhoneNo);
        }
        else if (!isNumeric(phoneNo) || phoneNo.length < 10) {
            setPhoneNoInputErrorState(true);
            setErrorString(uistring.loginSignupModal.error.tooShortPhoneNo);
        }
        else {
            setIsModal2Open(true);
        }
    }

    const clickedOutsideOfRef = (ref) => {
        useEffect(() => {
            let handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setPhoneNoInputWidgetIsActive(false);
                }
            }

            if (phoneNo.length == 0 && !phoneNoInputErrorState) {
                // Bind the event listener
                document.addEventListener("mousedown", handleClickOutside);
            }
            else {
                document.removeEventListener("mousedown", handleClickOutside);
            }
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [phoneNo]);
    }

    clickedOutsideOfRef(phoneNoWidgetRef);

    const keyDownInPhoneNoInput =(e)=>{
        if (e.key=='Enter'){
            continueButtonClicked();
        }
    }
    
    return (

        <div className="md:max-w-[500px]">
            <header className="flex px-4 justify-between min-h-[4rem] items-center text-textColor-heavy font-extrabold text-base border-b-2 border-b-border">
                {!isLoginOrOtpModalOpen ?
                    <XIcon className="h-6 p-[5px] hover:bg-background-light rounded-full" onClick={closeModal} />
                    :
                    <ChevronLeftIcon className="h-6 p-[5px] hover:bg-background-light rounded-full" onClick={closeModal} />
                }
                {!isLoginOrOtpModalOpen ?
                    <h2>{uistring.loginSignupModal.loginOrSignup}</h2> :
                    <h2>{uistring.loginSignupModal.confirmYourNumber}</h2>
                }
                <div className="w-4" />
            </header>

            {!isLoginOrOtpModalOpen ?

                // Login modal content
                <div className="px-6 mt-6 flex flex-col text-textColor-heavy">
                    {/* Title */}
                    <div className="flex text-[22px] font-medium">
                        <span>{uistring.loginSignupModal.welcomeTo}</span>
                        <span>&nbsp;</span>
                        <span className="capitalize">{commonString.projectTitle}</span>
                    </div>

                    {/* Phone no widget */}
                    <div ref={phoneNoWidgetRef} className={`  ${(phoneNoInputErrorState) ? "bg-background-errorLight " : ""} ${phoneNoInputErrorState ? "border-error-type1 " : ""} 
                ${phoneNoInputWidgetIsActive ? "border-2 " : "border "} ${phoneNoInputErrorState ? "border-error-type1 " : phoneNoInputWidgetIsActive ? "border-dark " : "border-border-dark "}
                relative cursor-text flex h-14 w-full 
                 rounded-lg mt-4 text-base leading-5 font-normal text-textColor-light`} onClick={phoneNoWidgetClicked}>
                        <div className="flex relative bg-transparent">
                            <div className={`${phoneNoInputWidgetIsActive ? "-translate-y-2 scale-75 " : ""} absolute top-[18px] left-[12px] right-[12px]  transition-all origin-0`}>
                                <div className={`${phoneNoInputErrorState ? "text-error-type1 font-semibold " : ""}max-w-full overflow-hidden overflow-ellipsis`}>{uistring.loginSignupModal.placeholder.phoneNumber}</div>
                            </div>
                            <div className={`${phoneNoInputWidgetIsActive ? "opacity-100 text-textColor-heavy " : "opacity-0 "}flex bg-transparent`}>
                                <div className="pt-[26px] pl-[12px] mr-[-6px]">+91</div>
                                <input ref={phoneNoInputWidgetRef} className="w-[400px] border-none outline-none mt-[28px] mx-[12px] mb-[10px] min-h-1 bg-transparent " type='text'
                                    maxLength="10" onChange={(e) => { setPhoneNoInput(e) }} onKeyDown={(e) => { keyDownInPhoneNoInput(e) }} />
                            </div>
                        </div>
                    </div>

                    {phoneNoInputErrorState ?
                        // Error display
                        <div className="flex text-error-type1 text-xs mt-1 items-center">
                            <RiErrorWarningFill className="w-5 h-5" />
                            <span className="ml-1">{errorString}</span>
                        </div>
                        :
                        // privacy policy
                        < div className="text-xs mt-1">
                            <span>{uistring.loginSignupModal.weWillCallYou}</span>
                            <span>&nbsp;</span>
                            <a href="/privacy" className="font-semibold underline">{uistring.loginSignupModal.privacySetting}</a>
                        </div>
                    }
                    {/* Continue button */}
                    <ContinueButton continueButtonClicked={continueButtonClicked} />

                    {/* Or line */}
                    <div className="w-full my-4 font-normal text-xs overflow-hidden text-center">
                        <span className="p-4 relative after:border-b after:border-border after:top-1/2 after:left-full after:w-[500px] after:absolute
                    before:border-b before:border-border before:top-1/2 before:right-full before:w-[500px] before:absolute">{uistring.loginSignupModal.or}</span>
                    </div>

                    {/* Social signin div */}
                    <div className="w-full pb-4">
                        <FacebookLoginComp />
                        <GoogleLoginComp />
                    </div>
                </div>
                :
                // OTP modal content
                <div className="px-6 mt-6 pb-10 flex flex-col text-textColor-heavy">
                    <div className="flex">
                        <span>{uistring.loginSignupModal.enterTheCode}</span>
                        <span>&nbsp;</span>
                        <span>+91</span>
                        <span>&nbsp;</span>
                        <span>{phoneNo}</span>
                        <span>:</span>
                    </div>

                    {/* Otp input fields */}
                    <OTPInputs />

                    <div className="mt-4 flex">
                        <span>{uistring.loginSignupModal.haventReceivedCode}</span>
                        <span>&nbsp;</span>
                        <div className="underline font-semibold cursor-pointer" onClick={closeModal}>
                            {uistring.loginSignupModal.tryAgain}
                        </div>
                    </div>
                </div>
            }

        </div >
    )
}

export default LoginSignupModal
