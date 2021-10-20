import { BiCheck } from "react-icons/bi";

function ToggleButton({ isSelected, toggleButtonState }) {
    const toggleButtonStateLocal = () => {
        toggleButtonState(!isSelected)
    }

    return (
        <button className={`${isSelected ? "bg-textColor-extraHeavy border-textColor-extraHeavy  " : "bg-background-dark hover:bg-textColor-light hover:border-textColor-light "} 
        border rounded-full h-8 min-w-[48px] w-12 border-border-dark relative`} onClick={toggleButtonStateLocal}>
            <div className={`${isSelected ? "translate-x-4 border-textColor-extraHeavy text-textColor-extraHeavy " : "border-border-dark hover:border-textColor-light "}
                                        bg-white rounded-full border-2 h-8 left-[-1px] absolute
                                        top-[-1px] transform-gpu w-8 flex items-center justify-center transition-all`}>
                {isSelected ? <BiCheck /> : ""}
            </div>
        </button>
    )
}

export default ToggleButton
