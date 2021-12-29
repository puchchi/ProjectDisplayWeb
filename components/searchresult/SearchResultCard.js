import Carousel, { consts } from 'react-elastic-carousel'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import uistring from '../../data/uistring.json'
import { useSelector } from 'react-redux';
import { IoHeartOutline } from "react-icons/io5";
import LoginSignupModalOpener from '../loginsignup/LoginSignupModalOpener'

const imageWidth = 300;
const imageWidthPx = "w-[300px]";
const imageHeight = 200;
const imageHeightPx = "h-[200px]";

const imageHeightSm = 300;
const imageHeightSmPx = "h-[300px]";

function carouselArrowHidden({ type, onClick, isEdge }) {

    const isNextArrow = type == consts.NEXT;
    return (

        <div className={`${isNextArrow ? "mr-[-50px] right-[50px] " : "ml-[-50px] left-[50px] "}relative z-10 top-[45%] h-8  `}>
            <div className={`rounded-full border-none w-8 h-8 `}>
            </div>
        </div>

    )
}

function carouselArrow({ type, onClick, isEdge }) {

    const isNextArrow = type == consts.NEXT;
    return (

        <div className={`${isNextArrow ? "mr-[-50px] right-[50px] " : "ml-[-50px] left-[50px] "}relative z-10 top-[45%] h-8  `}>
            <div className={`${isEdge ? "bg-transparent " : "rounded-full shadow-lg border-transparent border-2 bg-background-light hover:bg-white "} w-8 h-8 hover:scale-105 transition-transform `}
                onClick={isEdge ? () => { } : (e) => {
                    // To prevent from going to href of Link
                    e.preventDefault();
                    onClick()
                }
                }>
                <span className={`${isEdge ? "hidden" : ""}`}>
                    <svg className={`${!isNextArrow ? "transform rotate-180 " : ""} p-[9px]`} viewBox="0 0 18 18" role="img" aria-hidden="false" aria-label="Next" focusable="false" ><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd"></path></svg>
                </span>
            </div>
        </div>

    )
}

const DotRender = ({ activeImageIdx, totImages, index }) => {
    if (activeImageIdx == index) {
        return (<span
            className="scale-100 opacity-100 bg-white rounded-full h-[6px] mx-[2.5px] min-w-[6px] transition-opacity w-[6px]">
        </span>)
    }

    else if (activeImageIdx == index - 1 || activeImageIdx == index + 1) {
        return (<span
            className="scale-100 opacity-60 bg-white rounded-full h-[6px] mx-[2.5px] min-w-[6px] transition-opacity w-[6px]">
        </span>)
    }

    else if (activeImageIdx == index - 2 || activeImageIdx == index + 2 ||
        (activeImageIdx == 0 && (index == 3 || index == 4)) || (activeImageIdx == 1 && index == 4) ||
        (activeImageIdx == totImages - 1 && (index == totImages - 4 || index == totImages - 5)) || (activeImageIdx == totImages - 2 && index == totImages - 5)) {
        return (<span
            className="scale-[0.83] opacity-60 bg-white rounded-full h-[6px] mx-[2.5px] min-w-[6px] transition-opacity w-[6px]">
        </span>)
    }
    else {
        return (
            <span
                className="scale-[.60] opacity-0  bg-white rounded-full h-[6px] mx-[2.5px] min-w-[6px] transition-opacity w-[6px]">
            </span>
        )
    }
}

function carouselDots({ pages, activePage, onClick }) {
    const dotWidth = 11 // Width of a dot and margin along x-axis

    let translateBy = 0;
    const totImages = pages.length;

    // We will show only 5 dots.
    if (totImages > 5 && activePage > 2) {

        if (totImages - 1 == activePage) {
            translateBy = dotWidth * (2 - activePage + 2);
        }
        else if (totImages - 2 == activePage) {
            translateBy = dotWidth * (2 - activePage + 1);
        }
        else
            translateBy = dotWidth * (2 - activePage);
    }

    return (
        <div className="relative bottom-0 left-0 right-0 top-[-20px] flex items-end justify-center whitespace-nowrap">
            <div className="items-end justify-center h-full">
                <div className="flex pb-3 max-w-[55px]">
                    <div style={{ "--tw-translate-x": translateBy + "px" }} className="translate-x-[-0px] items-end flex justify-center transition-all">
                        {pages.map((page, index) => {
                            return (
                                <DotRender
                                    key={index}
                                    index={index}
                                    activeImageIdx={activePage}
                                    totImages={totImages}
                                />
                            )
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}

function ImageCard({ image }) {
    return (
        <div className={`rounded-xl overflow-hidden relative ${imageHeightPx} ${imageWidthPx}
        border border-border-dark`}>
            <Image src={image}
                width={imageWidth}
                height={imageHeight}
                objectFit="cover"
            />
        </div>
    )
}

function ImageCardSM({ image }) {
    return (
        <div className={`rounded-xl overflow-hidden relative ${imageHeightSmPx} w-full
        border border-border-dark`}>
            <Image src={image}
                layout="fill"
                objectFit="cover"
            />
        </div>
    )
}

function SearchResultPlaceholderCard() {
    return (
        <div>
            <div className="rounded-md w-full mx-auto">
                <div className="animate-pulse flex flex-col sm:flex-row gap-4 ">
                    <div className={`rounded-3xl bg-loading flex-shrink-0 ${imageHeightPx} ${imageWidthPx} sm:inline-block hidden`}></div>
                    <div className={`rounded-3xl bg-loading flex-shrink-0 ${imageHeightPx} w-full sm:hidden`}></div>
                    <div className="flex flex-col flex-grow gap-3">
                        <div className="flex flex-col gap-2">
                            <div className="h-4 bg-loading rounded-lg w-[40%]"></div>
                            <div className="h-8 bg-loading rounded-lg w-[90%]"></div>
                        </div>

                        <div className="hidden sm:inline-block w-8 border-t-textColor-lightest border-t"></div>
                        <div className="flex-col gap-2 hidden sm:flex">

                            <div className="h-5 bg-loading rounded-lg w-[60%]"></div>
                            <div className="h-5 bg-loading rounded-lg w-[50%]"></div>
                        </div>

                        <div className="flex items-end flex-grow self-end mb-4 sm:mb-0 w-full">

                            {/* price */}
                            <div className=" flex flex-col items-end  w-full gap-1  ">
                                <div className="h-5 bg-loading rounded-lg w-[20%]"></div>
                                <div className="h-5 bg-loading rounded-lg w-[20%]"></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-4 border-b border-b-border-light" />
        </div>
    )
}


function SearchResultCard({ isPlaceholder, images, name, packages, price, desc, about, profileType, profileId }) {
    const [showCarousel, setShowCarousel] = useState(false)

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    }
    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    }

    // Check if user is logged in
    const isUserLoggedIn = useSelector(state => state.loginDetail.isUserLoggedIn);
    const addToWishlist = (e) => {
        e.preventDefault();

        if (!isUserLoggedIn) {
            openLoginModal();
        }
        else {
            console.log("user already logged in")
            alert("Not implemented yet in SearchResultCard")
        }
    }

    if (isPlaceholder) {
        return SearchResultPlaceholderCard();
    }
    else {
        return (
            <>
                <Link href={`/profile/${profileType}/${profileId}`}>
                    <div className="flex flex-col sm:flex-row pl-[10px] cursor-pointer"
                        onMouseEnter={() => {
                            setShowCarousel(true);
                        }} onMouseLeave={() => setShowCarousel(false)}

                    >

                        {/* Search result image */}
                        {/* for bigger screen */}
                        <div className={`w-[300px] rounded-xl flex-shrink-0 hidden sm:inline-block`} >
                            <Carousel
                                itemsToShow={1}
                                pagination={true}
                                renderArrow={showCarousel ? carouselArrow : carouselArrowHidden}
                                renderPagination={carouselDots}
                                itemPadding={[0, 0, 0, 0]}
                            >
                                {
                                    images.map((image, index) =>
                                        <ImageCard
                                            key={index}
                                            image={image}
                                        />
                                    )
                                }
                            </Carousel>
                        </div>

                        <div className={`w-full rounded-xl flex-shrink-0 inline-block sm:hidden`} >
                            <Carousel
                                itemsToShow={1}
                                pagination={true}
                                renderArrow={showCarousel ? carouselArrow : carouselArrowHidden}
                                renderPagination={carouselDots}
                                itemPadding={[0, 0, 0, 0]}
                            >
                                {
                                    images.map((image, index) =>
                                        <ImageCardSM
                                            key={index}
                                            image={image}
                                        />
                                    )
                                }
                            </Carousel>
                        </div>

                        {/* Search details */}
                        <div className="flex flex-col sm:h-[200px] ml-4 flex-grow ">
                            <div className="flex items-start">
                                <div className="mr-4 flex-grow flex-shrink tracking-wide">
                                    <div className="mb-1 text-sm items-center flex w-full text-textColor-light">
                                        {desc}
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-lg overflow-hidden max-h-8 overflow-ellipsis text-textColor-extraHeavy">
                                            {name}
                                        </span>
                                    </div>
                                </div>

                                {/* Wishlist button */}
                                <button type="button" className="inline-block text-textColor-extraHeavy cursor-pointer relative
                        bg-transparent hover:bg-background-light active:scale-90 transition-all rounded-full p-3 mr-[-6px]" onClick={(e) => addToWishlist(e)}>
                                    <IoHeartOutline className="h-7 w-7 text-textColor-extraHeavy stroke overflow-visible" />
                                </button>
                            </div>

                            <div className="mt-3 hidden sm:inline-block w-8 border-t-textColor-lightest border-t"></div>
                            <div className="mt-2 hidden sm:inline-block overflow-hidden text-textColor-light text-sm font-normal max-w-[80%] max-h-11 overflow-clip">
                                {about}
                            </div>

                            <div className="flex items-end flex-grow self-end mb-4 sm:mb-0">

                                {/* price */}
                                <div className=" flex flex-col items-end    ">
                                    <div>
                                        <span className="text-lg font-medium text-textColor-extraHeavy">{uistring.searchFilters.rupeeSymbol} {price} </span>
                                        <span className="text-lg font-normal text-textColor-light"> / day</span>
                                    </div>
                                    <span className="text-base text-textColor-light">Photos+Videos</span>

                                </div>
                            </div>

                        </div>
                    </div>
                </Link>
                <div className="mb-4 border-b border-b-border-light" />

                <LoginSignupModalOpener
                    isLoginModalOpen={isLoginModalOpen}
                    loginModalClosedCallback={closeLoginModal}
                />
            </>
        )
    }
}

export default SearchResultCard
