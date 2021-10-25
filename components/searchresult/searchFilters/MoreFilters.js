import uistring from '../../../data/uistring.json'
import { useState, useRef, useEffect } from 'react'
import Modal from 'react-modal';
import FilterButton from './searchFiltersWidget/FilterButton'
import ClearSavePane from './searchFiltersWidget/ClearSavePane'
import { XIcon } from '@heroicons/react/solid'

function MoreFiltersModal({ closeModal, clearButtonClicked, saveButtonClicked }) {
    return (
        <div className="md:max-w-[500px]">
            <header className="flex px-4 justify-between min-h-[4rem] items-center text-textColor-heavy font-extrabold text-base border-b-2 border-b-border">

                <XIcon className="h-6 p-[5px] hover:bg-background-light rounded-full" onClick={closeModal} />
                <h2>{uistring.searchFilters.moreFilters}</h2>

                <div className="w-4" />
            </header>

            {/* Clear save pane */}
            <div className="flex justify-between py-3 px-[14px] border-t border-t-border-light items-center ">
                <ClearSavePane
                    isClearButtonDisbaled={false}
                    clearButtonClicked={clearButtonClicked}
                    saveButtonClicked={saveButtonClicked}
                />
            </div>

        </div>
    )
}

Modal.setAppElement('#__next')
function MoreFilters() {
    let filterButtonRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const clearButtonClicked = () => {
        console.log("clear button clicked")
    }

    const saveButtonClicked = () => {
        console.log("save button clicked")
    }

    return (
        <>
            <div className="relative inline">
                <FilterButton
                    buttonText={uistring.searchFilters.moreFilters}
                    onClick={() => { openModal() }}
                    buttonRef={filterButtonRef}
                //isFilterApplied={initialDate.getDate() != selectedDate.getDate()}
                />


            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="more-filters-modal"
                className={
                    {
                        base: "modal-classname",
                        afterOpen: "modal-classname-after-open",
                        beforeClose: "modal-classname-before-close"
                    }
                }
                overlayClassName="modal-overlay-classname"
            >
                <MoreFiltersModal
                    closeModal={closeModal}
                    clearButtonClicked={clearButtonClicked}
                    saveButtonClicked={saveButtonClicked}
                />

            </Modal>
        </>
    )
}

export default MoreFilters
