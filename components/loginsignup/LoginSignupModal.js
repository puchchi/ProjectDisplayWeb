import { XIcon } from '@heroicons/react/solid'
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
            <button type="button" className={`${mouseDown ? "scale-95 " : ""}cursor-pointer relative text-base leading-5 font-medium py-[14px] px-6 bg-primary 
                    text-white w-full transition-all rounded-lg tracking-wide`} onMouseDown={() => { setMouseDown(true) }} onMouseLeave={() => { setMouseDown(false) }}
                onMouseUp={() => { setMouseDown(false) }} onClick={continueButtonClicked}>{uistring.loginSignupModal.continue}</button>
        </div >
    )
}

function LoginSignupModal() {

    const [phoneNoInputWidgetIsActive, setPhoneNoInputWidgetIsActive] = useState(false)
    const [phoneNo, setPhoneNo] = useState("")

    const phoneNoWidgetRef = useRef(null);

    const [phoneNoInputWidgetRef, setPhoneNoInputWidgetRef] = useFocus()

    // Use to store input error state 
    const [phoneNoInputErrorState, setPhoneNoInputErrorState] = useState(false)
    const [errorString, setErrorString] = useState("")

    const setPhoneNoInput = (e) => {
        setPhoneNo(e.target.value);
        setPhoneNoInputErrorState(false);
    }
    const phoneNoWidgetClicked = () => {
        setPhoneNoInputWidgetRef();
        setPhoneNoInputWidgetIsActive(true);
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

        console.log(errorString)
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

    return (

        <div className="md:max-w-[500px]">
            <header className="flex px-4 justify-between min-h-[4rem] items-center text-textColor-heavy font-extrabold text-base border-b-2 border-b-border">
                <XIcon className="h-6 p-[5px]" />
                <h2>{uistring.loginSignupModal.loginOrSignup}</h2>
                <div className="w-4" />
            </header>

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
                            <input ref={phoneNoInputWidgetRef} className="w-[400px] border-none outline-none mt-[28px] mx-[12px] mb-[10px] min-h-1 bg-transparent " type='text' maxLength="10" onChange={(e) => { setPhoneNoInput(e) }} />
                        </div>
                    </div>
                </div>

                {phoneNoInputErrorState ?
                    // Error display
                    <div className="flex text-error-type1 text-xs mt-1 items-center">
                        <RiErrorWarningFill className="w-5 h-5"/>
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
        </div >
    )
}

export default LoginSignupModal
