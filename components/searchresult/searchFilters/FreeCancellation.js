import uistring from '../../../data/uistring.json'
import ToggleButton from '../../widgets/ToggleButton'
import FilterButton from './searchFiltersWidget/FilterButton'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import ClearSavePane from './searchFiltersWidget/ClearSavePane'

function FreeCancellation() {
    const cancellationPolicy = useSelector(state => state.searchDetail.searchCancellationPolicy);
    const minprice = useSelector(state=>state.searchDetail.searchMinPrice);
    console.log(minprice)

    const [freeCancellationToggleButton, setToggleButtonState] = useState({
        initialValue: false,
        currentValue: false
    });
    const [showFilterPopup, setShowFilterPopup] = useState(false);

    // Update toggle button state on basis of url data
    useEffect(() => {
        let shouldEnableToggleButton = cancellationPolicy.length != 0;
        setToggleButtonState({
            initialValue: shouldEnableToggleButton,
            currentValue: shouldEnableToggleButton
        });

    }, [cancellationPolicy])

    // Update toggle button when popup is closed
    useEffect(() => {
        setToggleButtonState({
            ...freeCancellationToggleButton,
            currentValue: freeCancellationToggleButton.initialValue
        });
    }, [showFilterPopup])

    const router = useRouter();

    const clearButtonClicked = () => {
        setToggleButtonState({
            ...freeCancellationToggleButton,
            currentValue: false
        });
    }

    const saveButtonClicked = () => {
        setShowFilterPopup(false);

        if (freeCancellationToggleButton.initialValue != freeCancellationToggleButton.currentValue) {
            router.query.cancellation_policy = freeCancellationToggleButton.currentValue ? "free" : "";
            router.push(router);
        }
    }

    const filterPopupRef = useRef(null);
    let filterButtonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterPopupRef.current && !filterPopupRef.current.contains(event.target) &&
                filterButtonRef.current && !filterButtonRef.current.contains(event.target)) {
                setShowFilterPopup(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const setFreeCancellationToggleButtonState = (value) => {
        setToggleButtonState({
            ...freeCancellationToggleButton,
            currentValue: value
        })
    }


    return (
        <div className="relative inline">
            <FilterButton
                buttonText={uistring.searchFilters.freeCancellation}
                onClick={() => { setShowFilterPopup(!showFilterPopup) }}
                buttonRef={filterButtonRef}
                isFilterApplied={freeCancellationToggleButton.currentValue || showFilterPopup}
            />

            {/* Free cancellation popup */}
            <div ref={filterPopupRef} className={`${showFilterPopup ? "inline-block " : "hidden "} absolute left-0 top-[54px] right-auto z-50 bg-white border-[0.5px] rounded-xl 
            overflow-hidden shadow-lg `}>
                <div className="block">
                    <div className="max-h-[calc(100vh-300px)] p-5 min-w-[320px] overflow-y-auto">
                        <div className="flex justify-between py-3 pr-1 items-center">

                            <h4 className="text-sm text-textColor-light">{uistring.searchFilters.freeCancellationOffer}</h4>
                            {/* toggle button */}
                            <div className="min-w-[50px] ml-3 ">
                                <ToggleButton isSelected={freeCancellationToggleButton.currentValue} toggleButtonState={(value) => { setFreeCancellationToggleButtonState(value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between py-3 px-[14px] border-t border-t-border-light items-center ">

                        <ClearSavePane
                            isClearButtonDisbaled={!freeCancellationToggleButton.currentValue}
                            clearButtonClicked={clearButtonClicked}
                            saveButtonClicked={saveButtonClicked}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FreeCancellation
