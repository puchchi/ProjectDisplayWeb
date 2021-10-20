import React from 'react'

function FilterButton({buttonText, onClick, buttonRef}) {
    return (
        <div ref={buttonRef} className="pr-2 py-1 whitespace-nowrap inline-block">
            <button className="cursor-pointer text-center border outline-none border-border-dark rounded-3xl
                py-2 px-4 text-sm tracking-wide hover:border-dark text-textColor-extraHeavy" onClick={onClick}>{buttonText}</button>

        </div>
    
    )
}

export default FilterButton
