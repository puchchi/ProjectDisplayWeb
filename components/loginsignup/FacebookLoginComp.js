import uistring from '../../data/uistring.json'
import { useState } from 'react'

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
//import FacebookLogin from 'react-facebook-login';

function FacebookIcon() {
    return (
        <svg viewBox="0 0 24 24" ><defs><path id="a" d="M.001 0H24v23.854H.001z"></path></defs><g fill="none" fillRule="evenodd"><mask id="b" fill="#fff"></mask><path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12" fill="#1877F2" ></path><path d="M16.671 15.469L17.203 12h-3.328V9.749c0-.949.465-1.874 1.956-1.874h1.513V4.922s-1.374-.234-2.686-.234c-2.741 0-4.533 1.66-4.533 4.668V12H7.078v3.469h3.047v8.385a12.09 12.09 0 003.75 0V15.47h2.796" fill="#FFF"></path></g></svg>

    )
}

function FacebookLoginComp() {

    const [mouseDown, setMouseDown] = useState(false)

    const responseFacebook = (response) => {
        console.log(response);
    }

    return (
        <FacebookLogin
            appId="1088597931155576"
            autoLoad={false}
            callback={responseFacebook}
            render={renderProps => (

                <button onClick={() => { console.log("fab login button clicked") }}
                    isdisabled={false}
                    isSdkLoaded={console.log("is sdk loaded")}
                    className={`${mouseDown ? "bg-gray-100 " : ""}cursor-pointer relative text-center text-sm py-3 px-3 font-medium rounded-lg
                    border-2 border-border-dark hover:border-dark text-textColor-mildHeavy dark w-full mb-4`}
                    type="" name="fb-login" onMouseDown={() => { setMouseDown(true) }} onMouseUp={() => { setMouseDown(false) }} onMouseLeave={() => { setMouseDown(false) }}
                >
                    <div className="flex justify-between">
                        <div className="w-5 h-5"><FacebookIcon /></div>
                        <div><span>{uistring.loginSignupModal.continueWithFacebook}</span></div>
                        <div className="w-5" />
                    </div>
                </button>
            )}
        />
    )
}

export default FacebookLoginComp