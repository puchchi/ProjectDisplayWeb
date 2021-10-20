import uistring from '../../../../data/uistring.json'

function ClearSavePane({ isClearButtonDisbaled, clearButtonClicked, saveButtonClicked }) {
    return (
        <>
            {/* cancel button */}
            <button className={`${isClearButtonDisbaled ? "text-textColor-lightest cursor-not-allowed " : "cursor-pointer text-textColor-heavy "}
                        relative px-[10px] py-2 hover:bg-background-light rounded-lg underline 
                        font-semibold text-base ml-[-5px] text-center tracking-wide`} onClick={clearButtonClicked}>
                {uistring.searchFilters.clear}
            </button>

            {/* save button */}
            <button className="cursor-pointer relative text-center w-auto text-sm font-semibold rounded-lg
                        py-2 px-4 hover:bg-black text-white bg-textColor-extraHeavy tracking-wide " onClick={saveButtonClicked}>
                {uistring.searchFilters.save}
            </button>
        </>
    )
}

export default ClearSavePane
