import React from 'react'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import { ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router';

function SearchResultPageNav({ currentPage, totalResults, resultcount }) {

    const isPrev = parseInt(currentPage) > 1;
    const totNoOfPage = Math.ceil(parseInt(totalResults) / parseInt(resultcount))
    const isNext = totNoOfPage > parseInt(currentPage);
    const shouldShowSection = parseInt(resultcount) < parseInt(totalResults);

    const router = useRouter();
    const onClickNextPrev = (isNext) => {
        router.query.page = isNext ? parseInt(currentPage) + 1 : parseInt(currentPage) - 1;
        router.push(router);
    }

    return (

        <div className={`${shouldShowSection ? "" : "hidden "} w-full mt-6`}>
            <div className="mx-auto mb-8">

                {/* Pages nos with prev and next button */}
                <div className="flex flex-col items-center">
                    <nav className="block w-full">

                        {/*For bigger screen */}
                        <div className="md:flex gap-8 text-center hidden justify-center">
                            <button className={`${isPrev ? "text-textColor-extraHeavy hover:bg-background-light " : "text-textColor-lightest cursor-not-allowed "} flex font-semibold 
                            items-center justify-center rounded-lg  py-2 pr-2`} onClick={() => onClickNextPrev(false)}>
                                <ChevronLeftIcon className="h-6 mt-0.5 mr-1" />
                                <h4 className="underline">Previous Page</h4>
                            </button>

                            <button className={`${isNext ? "text-textColor-extraHeavy hover:bg-background-light " : "text-textColor-lightest cursor-not-allowed "} flex font-semibold
                             items-center justify-center rounded-lg  py-2 pl-2`} onClick={() => onClickNextPrev(true)}>
                                <h4 className="underline">Next Page</h4>
                                <ChevronRightIcon className="h-6 mt-0.5 ml-0.5" />
                            </button>
                        </div>

                        {/* for smaller screen */}
                        <div className="md:hidden flex justify-evenly">
                            <button className={`${isPrev ? "text-textColor-extraHeavy shadow-shadowForPrevNextButton hover:shadow-lg " :
                                "opacity-50 cursor-not-allowed text-textColor-lightest border-textColor-lightest bg-white"}
                             rounded-full border items-center justify-center transition-all w-12 h-12`} onClick={() => onClickNextPrev(false)}>
                                <ChevronLeftIcon className="h-6 m-auto" />
                            </button>

                            <button className={`${isNext ? "text-textColor-extraHeavy shadow-shadowForPrevNextButton hover:shadow-lg " :
                                "opacity-50 cursor-not-allowed text-textColor-lightest border-textColor-lightest bg-white "} 
                            rounded-full border items-center justify-center transition-all w-12 h-12 `} onClick={() => onClickNextPrev(true)}>
                                <ChevronRightIcon className="h-6 m-auto" />
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default SearchResultPageNav
