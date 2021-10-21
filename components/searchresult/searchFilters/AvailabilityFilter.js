import uistring from '../../../data/uistring.json'
import FilterButton from './searchFiltersWidget/FilterButton'
import { useState, useRef, useEffect } from 'react'
import ClearSavePane from './searchFiltersWidget/ClearSavePane'

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';


function Test(date) {
    console.log(date.getDate())    //let dt = date.split(" ")
    //console.log(dt)
    return (
        <div className=" leading-8">{date.getDate()}</div>
    )
}

function AvailabilityFilter() {
    const [showFilterPopup, setShowFilterPopup] = useState(false)
    const initialDate = new Date();
    const [selectedDate, setSelectedDate] = useState(initialDate)
    const filterPopupRef = useRef(null);
    let filterButtonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterPopupRef.current && !filterPopupRef.current.contains(event.target) &&
                filterButtonRef.current && !filterButtonRef.current.contains(event.target)) {
                setShowFilterPopup(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const clearButtonClicked = () => {
        setSelectedDate(initialDate)
    }

    const saveButtonClicked = () => {
        console.log("save button clicked")
    }

    return (
        <div className="relative inline">
            <FilterButton
                buttonText={uistring.searchFilters.availabilty}
                onClick={() => { setShowFilterPopup(!showFilterPopup) }}
                buttonRef={filterButtonRef}
                isFilterApplied={initialDate.getDate() != selectedDate.getDate()}
            />

            <div ref={filterPopupRef} className={`${showFilterPopup ? "inline-block " : "hidden "} absolute left-0 top-[54px] right-auto z-50 bg-white border-[0.5px] rounded-xl 
            overflow-hidden shadow-lg `}>
                <div className="block">
                    <div className="max-h-[calc(100vh-200px)] px-2 min-w-[320px] overflow-y-auto">
                        <Calendar
                            date={selectedDate}
                            onChange={setSelectedDate}
                            minDate={new Date()}
                            className="text-textColor-heavy !font-medium !text-base"
                            showMonthAndYearPickers={false}
                            color={`#232323`}
                        //dayContentRenderer={Test}
                        />
                    </div>

                    {/* Clear save pane */}
                    <div className="flex justify-between py-3 px-[14px] border-t border-t-border-light items-center ">
                        {console.log("initial date:" + initialDate)}
                        {console.log("selected date: " + selectedDate)}
                        <ClearSavePane
                            isClearButtonDisbaled={initialDate.getDate() == selectedDate.getDate()}
                            clearButtonClicked={clearButtonClicked}
                            saveButtonClicked={saveButtonClicked}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AvailabilityFilter
