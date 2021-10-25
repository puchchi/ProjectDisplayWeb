import Carousel, { consts } from 'react-elastic-carousel'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

import { IoHeartOutline } from "react-icons/io5";

const imageWidth = 300;

function carouselArrowHidden({ type, onClick, isEdge }) {

    const isNextArrow = type == consts.NEXT;
    return (

        <div className={`${isNextArrow ? "mr-[-50px] right-[50px] " : "ml-[-50px] left-[50px] "}relative z-10 top-[45%] h-8  `}>
            <div className={`rounded-full shadow-lg border-transparent border-none w-8 h-8 `}>
            </div>
        </div>

    )
}

function carouselArrow({ type, onClick, isEdge }) {

    const isNextArrow = type == consts.NEXT;
    return (

        <div className={`${isNextArrow ? "mr-[-50px] right-[50px] " : "ml-[-50px] left-[50px] "}relative z-10 top-[45%] h-8  `}>
            <div className={`${isEdge ? "bg-transparent " : "rounded-full shadow-lg border-transparent border-2 bg-background-light hover:bg-white "} w-8 h-8 hover:scale-105 transition-all `}
                onClick={isEdge ? () => { } : onClick}>
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
        <div className="rounded-xl overflow-hidden relative h-[200px] w-[300px]
        border border-border-dark">
            <Link href="/">
                <Image src={image}
                    width={imageWidth}
                    height={200}
                    objectFit="cover"
                />
            </Link>
        </div>
    )
}

function SearchResultCard({ images, name, packages, price, desc }) {
    const [showCarousel, setShowCarousel] = useState(false)

    return (
        <>

            <div className="flex pl-[10px] cursor-pointer">

                {/* Search result image */}
                <div className={`w-[300px] rounded-xl  `} onMouseEnter={() => {
                    console.log("mouse in")
                    setShowCarousel(true);
                }} onMouseLeave={() => setShowCarousel(false)} >
                    <Carousel
                        itemsToShow={1}
                        pagination={true}
                        renderArrow={showCarousel ? carouselArrow : carouselArrowHidden}
                        renderPagination={carouselDots}
                        itemPadding={[0, 0, 0, 0]}
                    >
                        {
                            images.map((image) =>
                                <ImageCard
                                    image={image}
                                />
                            )
                        }
                    </Carousel>
                </div>

                {/* Search details */}
                <div className="flex flex-col h-[200px] ml-4 flex-grow ">
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
                        bg-transparent hover:bg-background-light active:scale-90 transition-all rounded-full p-3 mr-[-6px]">
                            <IoHeartOutline className="h-7 w-7 text-textColor-extraHeavy stroke overflow-visible" />
                        </button>
                    </div>

                </div>
            </div>

            <div className="mb-4 border-b border-b-border-light" />
        </>
    )
}

export default SearchResultCard
