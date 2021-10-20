import { useState, useRef, useEffect, React } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import LocationWidget from './LocationWidget';

import data from '../../data/common.json'
import uistring from '../../data/uistring.json'

import { SearchIcon } from '@heroicons/react/solid'
import { MenuIcon } from '@heroicons/react/outline'
import { UserCircleIcon } from '@heroicons/react/solid'
import { XIcon } from '@heroicons/react/solid'
import UserLoginDetails from './UserLoginDetails';
import { useFocus } from '../hooks/useFocus'
import MainIcon from '../icon/MainIcon';



const MiniSearchBarRender = ({ showInMd, searchBarExpandedState, searchBarOnClick, showPlaceAndCategoryInSearchBar, serachedLocationWidgetValue, searchedServicesWidgetValue }) => {

    // Data from redux store
    const searchedLocation = useSelector(state => state.searchDetail.searchLocation);
    const searchedService = useSelector(state => state.searchDetail.searchService);

    let location = searchedLocation;
    if (showPlaceAndCategoryInSearchBar && location.length > 0)
        location = location.split(",")[0];
    return (

        <div className={`${showInMd ? "inline-flex lg:hidden " : "lg:inline-flex hidden"} w-full`}>
            <button className={`${searchBarExpandedState ? "hidden" : "inline"} flex  border shadow-search rounded-full border-border hover:shadow-md justify-between ml-2 mx-0 lg:mx-auto cursor-pointer lg:w-72 md:w-64 h-12`}
                type="button"
                onClick={searchBarOnClick}>
                {!showPlaceAndCategoryInSearchBar ?
                    <>
                        <div className="pl-5  my-auto font-medium text-sm text-dark tracking-wide">
                            <span className="hidden sm:inline-flex">{uistring.header.placeholder.searchPlaceholder}</span>
                            <span className="inline-flex sm:hidden">{uistring.header.placeholder.miniSearchPlaceholder}</span>
                        </div>
                        <SearchIcon className="w-8 bg-primary text-white rounded-full p-2  mx-2 my-auto " />
                    </>
                    :
                    <>
                        <div className="pl-5  my-auto font-medium text-sm text-dark tracking-wide w-full flex justify-between gap-2">
                            <div className="h-full my-auto">
                                <span className="overflow-hidden overflow-ellipsis h-6 whitespace-nowrap">{location}</span>
                            </div>
                            <span className="h-6 w-[1px] bg-border"></span>
                            <div className="h-full my-auto">
                                <span className="overflow-hidden overflow-ellipsis h-6 whitespace-nowrap">{searchedService}</span>
                            </div>
                        </div>
                        <SearchIcon className="w-8 bg-primary text-white rounded-full p-2  mx-2 my-auto " />
                    </>
                }
            </button>

        </div>
    )
}

const latLngInitialState = {
    lat: null,
    lng: null
}

function Header({ showPlaceAndCategoryInSearchBar = false }) {
    // State responsible to expand/unexpand state of search button.
    const [searchBarExpandedState, setSearchBarExpandedState] = useState(false)

    // State for expanded location widget
    const [locationWidgetExpandedState, setLocationWidgetExpandedState] = useState(true)

    // State for expanded services widget
    const [servicesWidgetExpandedState, setServicesWidgetExpandedState] = useState(false)

    // Getting searched data from redux store
    const searchedLocation = useSelector(state => state.searchDetail.searchLocation);
    const searchedService = useSelector(state => state.searchDetail.searchService);


    // State for storing input value of location widget
    const [locationWidgetValue, setLocationWidgetValue] = useState("")          // For server
    const [servicesWidgetValue, setServicesWidgetValue] = useState("")          // For server
    const [locationCoordinates, setLocationCoordinates] = useState(latLngInitialState);     // For server

    useEffect(() => {
        setLocationWidgetValue(searchedLocation)
    }, [searchedLocation]);

    useEffect(() => {
        setServicesWidgetValue(searchedService)
    }, [searchedService]);


    // State for storing location search results
    const [locationSuggestions, setLocationSuggestions] = useState([])

    // State for storing search button state
    const [searchButtonState, setSearchButtonState] = useState(false)

    // State to show/hide user detail dropdown (login/signup)
    const [showUserDetailDropDown, setShowUserDetailDropDown] = useState(false)

    // const [address, setAddress] = useState("")

    const headerRef = useRef(null);
    const expandedSearchWidgetRef = useRef(null);

    const router = useRouter()                          // For pushing search url

    let [locationInputRef, setLocationInputFocus] = useFocus()
    const [servicesInputRef, setServicesInputFocus] = useFocus()

    const searchBarOnClick = (e) => {
        e.preventDefault()
        setSearchBarExpandedState(!searchBarExpandedState)
        setLocationWidgetExpandedState(true)
        //setLocationWidgetValue("")
        //setServicesWidgetValue("")
        //setLocationSuggestions([])
    }

    const openLocationWidget = () => {
        //e.preventDefault()
        setLocationWidgetExpandedState(true)
        setLocationInputFocus();

        setServicesWidgetExpandedState(false);
        setLocationCoordinates(latLngInitialState);
    }

    const serviceWidgetClicked = (e) => {
        e.preventDefault()
        setServicesWidgetExpandedState(true)
        setServicesInputFocus();

        setLocationWidgetExpandedState(false)
    }

    const clickedOutsideOfRef = (ref, widgetName) => {
        useEffect(() => {
            let handleClickOutside;
            if (widgetName == "header") {
                handleClickOutside = (event) => {
                    if (ref.current && !ref.current.contains(event.target)) {
                        setSearchBarExpandedState(false)
                    }
                }
            }

            if (widgetName == "expanded_search") {
                handleClickOutside = (event) => {
                    if (ref.current && !ref.current.contains(event.target)) {
                        setLocationWidgetExpandedState(false)
                        setServicesWidgetExpandedState(false)
                    }
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    clickedOutsideOfRef(headerRef, "header");
    clickedOutsideOfRef(expandedSearchWidgetRef, "expanded_search");

    // Effect is used for transition of expanded state of search bar
    useEffect(() => {
        let maxHeight = "0px";
        if (searchBarExpandedState) {
            maxHeight = "1000px"
        }
        expandedSearchWidgetRef.current.style.maxHeight = maxHeight;
    })

    useEffect(() => {
        setSearchButtonState(locationWidgetExpandedState || servicesWidgetExpandedState);

    }, [locationWidgetExpandedState, servicesWidgetExpandedState])

    const searchSubmit = () => {
        if (locationWidgetValue.length > 0 && locationCoordinates.lat != null) {
            router.push({
                pathname: '/s',
                query: {
                    place: locationWidgetValue,
                    service: servicesWidgetValue,
                    lat: locationCoordinates.lat,
                    lng: locationCoordinates.lng
                },
            });
        }
        else
            openLocationWidget();
    }

    return (
        <>
            <header ref={headerRef} className="fixed top-0 z-30 py-4 bg-white shadow-md w-full">

                <div className="relative px-customSm md:px-customMd mx-auto max-w-custom grid lg:grid-cols-3 grid-cols-2 justify-between items-center h-full">
                    {/*  Left side div */}

                    <div className="flex ">
                        <Link href="/" >
                            <div className="text-2xl font-bold self-center my-2 cursor-pointer">
                                <div className="relative  sm:inline hidden">{data.projectTitle}</div>
                                <MainIcon className="sm:hidden inline" />
                            </div>
                        </Link>
                        <MiniSearchBarRender
                            key={searchBarExpandedState}
                            showInMd={true}
                            searchBarExpandedState={searchBarExpandedState}
                            searchBarOnClick={searchBarOnClick}
                            showPlaceAndCategoryInSearchBar={showPlaceAndCategoryInSearchBar} />
                    </div>

                    {/* Center div */}
                    <MiniSearchBarRender
                        key={searchBarExpandedState}
                        showInMd={false}
                        searchBarExpandedState={searchBarExpandedState}
                        searchBarOnClick={searchBarOnClick}
                        showPlaceAndCategoryInSearchBar={showPlaceAndCategoryInSearchBar} />


                    {/* Right div */}
                    <div className="flex justify-end">
                        <Link href="/artistonboarding">
                            <a className="text-sm text-textColor-heavy font-medium p-3 tracking-wide hover:bg-gray-100 rounded-full hidden sm:inline-flex">{uistring.header.becomeAnArtist}</a>
                        </Link>
                        <div>
                            <button className="flex items-center rounded-full p-2 text-textColor-heavy border gap-1 ml-2 cursor-pointer hover:shadow-md transition-shadow duration-500"
                                onClick={() => setShowUserDetailDropDown(true)}>
                                <MenuIcon className="mx-1 h-4 " />
                                <UserCircleIcon className="h-6" />
                            </button>

                            <UserLoginDetails
                                showDropDown={showUserDetailDropDown}
                                setHideUserDetailDown={() => setShowUserDetailDropDown(false)}
                            />

                        </div>
                    </div>
                </div>

                {/* Expanded search bar */}
                <form role="search" className={`${searchBarExpandedState ? "grid " : " hidden "} mt-4 mx-4 grid-cols-1 z-100`}>
                    <div ref={expandedSearchWidgetRef} className={`${(locationWidgetExpandedState || servicesWidgetExpandedState) ? "bg-gray-50 " : "bg-transparent "} border rounded-full border-gray-300 
                     self-center text-gray-300  mx-auto  flex max-h-0 transition-max-height duration-200 
                      `}>
                        {/* Location widget */}

                        <div className={`${locationWidgetExpandedState ? "bg-white shadow-location border-gray-50 z-10 " : "bg-transparent hover:bg-gray-200 "}  
                        border border-transparent m-[-1px] rounded-full flex `} onClick={openLocationWidget}>

                            <LocationWidget
                                locationInputRef={locationInputRef}
                                locationWidgetExpandedState={locationWidgetExpandedState}
                                locationWidgetValue={locationWidgetValue}
                                setLocationWidgetValue={setLocationWidgetValue}
                                locationSuggestions={locationSuggestions}
                                setLocationSuggestions={setLocationSuggestions}
                                setLocationCoordinates={setLocationCoordinates}
                            />

                        </div>

                        {/* Divider */}
                        <div className="self-center h-8 border-r border-gray-300"></div>

                        {/* Service  widget */}
                        <div className={`${servicesWidgetExpandedState ? "bg-white shadow-location border-gray-50 z-10" : "bg-transparent hover:bg-gray-200 "}
                         border border-transparent m-[-1px] rounded-full flex `} >
                            <label className="cursor-pointer py-3.5 px-8 block z-1" onClick={serviceWidgetClicked}>
                                <div>
                                    <div className="font-bold text-xs pb-0.5 text-textColor-heavy tracking-wide">
                                        {uistring.header.services}
                                    </div>
                                    <input ref={servicesInputRef} type="text" placeholder={uistring.header.placeholder.servicePlaceholder} className="block w-full bg-transparent outline-none text-sm font-medium overflow-ellipsis
                                 text-textColor-heavy expanded-search-placeholder tracking-wide cursor-pointer md:w-48" onChange={e => setServicesWidgetValue(e.target.value)}
                                        value={servicesWidgetValue} />
                                </div>
                            </label>

                            {/* Cross button in service widget */}
                            <div className="relative">
                                <div className={`${servicesWidgetValue.length && servicesWidgetExpandedState ? "inline " : "hidden "} absolute top-[55%] right-4  -translate-y-2/4`}>
                                    <button type="button" className="rounded-full bg-gray-200 hover:bg-gray-300 text-black " onClick={() => setServicesWidgetValue("")} >
                                        <XIcon className="h-6 p-[5px]" />
                                    </button>
                                </div>
                            </div>

                            <div className="h-full flex mr-3">
                                <button type="button" className={`${searchButtonState ? "sm:w-[6.75rem] " : "w-[2.75rem] "}
                                bg-primary flex self-center rounded-full p-3 items-center transition-width `} onClick={searchSubmit} >
                                    <SearchIcon className="w-5  text-white rounded-full  " />
                                    <span className={`${searchButtonState ? "sm:inline " : ""}font-semibold text-base 
                                    leading-4 tracking-wide text-white mx-1 hidden `}>{uistring.header.searchBtnText}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

            </header>

            {/* Transparent drape */}
            <div className={`${searchBarExpandedState ? "inline-flex " : "hidden "}inset-0 fixed z-20 bg-transparentBackground-light`}>
            </div>
        </>
    )
}

export default Header
