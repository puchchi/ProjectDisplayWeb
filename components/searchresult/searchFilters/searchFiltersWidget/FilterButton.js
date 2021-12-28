import React from 'react'

function FilterButton({ buttonText, onClick, buttonRef, isFilterApplied = false, isPlaceholder = false }) {
    return (

        isPlaceholder ?
            <div className={`pr-2 py-1 animate-pulse inline-block w-full`}>
                <div className="rounded-3xl bg-loading h-9
                py-2 px-4 text-sm tracking-wide  w-full" ></div>

            </div>
            :
            <div ref={buttonRef} className={`${isFilterApplied ? "pr-1.5 pb-0.5 " : "pr-2 py-1 "}  whitespace-nowrap inline-block`}>
                <button className={`${isFilterApplied ? "border-dark border-2 bg-background-light " : "border-border-dark border "} cursor-pointer text-center  outline-none rounded-3xl
                py-2 px-4 text-sm tracking-wide hover:border-dark text-textColor-extraHeavy`} onClick={onClick}>{buttonText}</button>

            </div>


    )
}

export default FilterButton
