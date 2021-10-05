import { useState, useRef, useEffect } from 'react'

import uistring from '../../data/uistring.json'

function UserLoginDetails({ showDropDown, setHideUserDefailDown }) {

    const userDetailDropDownRef = useRef(null);

    const clickedOutsideOfRef = (ref) => {
        useEffect(() => {
            let handleClickOutside;
                handleClickOutside = (event) => {
                    if (ref.current && !ref.current.contains(event.target)) {
                        setHideUserDefailDown()
                    }
                }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    clickedOutsideOfRef(userDetailDropDownRef);

    return (
        <div className={`${showDropDown ? "" : "hidden "} flex rounded-2xl bg-white shadow-locationResult w-[12rem] right-0
        absolute mr-customSm md:mr-customMd mt-3 py-2 text-textColor-heavy border text-sm 
        `} ref={userDetailDropDownRef}>
            <section className="w-full">
                <ul className="cursor-pointer" >
                    <li className="font-medium py-2 px-4 hover:bg-gray-100">{uistring.header.signup}</li>
                    <li className="py-2 px-4 hover:bg-gray-100">{uistring.header.login}</li>
                    <li className="w-full"><hr className="" /></li>
                    <li className=" py-2 px-4 hover:bg-gray-100">{uistring.header.help}</li>
                </ul>
            </section>
        </div>
    )
}

export default UserLoginDetails
