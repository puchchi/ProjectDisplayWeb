import uistring from '../../../data/uistring.json'
import FilterButton from './searchFiltersWidget/FilterButton'
import { useState, useRef, useEffect } from 'react'
import ClearSavePane from './searchFiltersWidget/ClearSavePane'
import { useSelector } from 'react-redux';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';


function AvailabilityFilter({ router }) {
    // We will save date in form yyyy-mm-dd. (Month will be from 0-11)
    const urlParamData = useSelector(state => state.searchDetail.searchCalenderDate);

    const [showFilterPopup, setShowFilterPopup] = useState(false)

    const [dates, setDates] = useState({
        initialDate: new Date(),
        selectedDate: new Date()
    })

    const now = new Date();
    const filterPopupRef = useRef(null);
    let filterButtonRef = useRef(null);

    const setSelectedDate = (date) => {
        setDates({
            ...dates,
            selectedDate: date
        })
    }

    useEffect(() => {
        if (urlParamData !== undefined && urlParamData.length > 0) {
            const arr = urlParamData.split("-");
            if (arr.length == 3) {
                let year = arr[0];
                let month = arr[1];
                let day = arr[2];
                if (year > dates.initialDate.getFullYear() ||
                    (year == dates.initialDate.getFullYear() && month > dates.initialDate.getMonth()) ||
                    (year == dates.initialDate.getFullYear() && month == dates.initialDate.getMonth() && day > dates.initialDate.getDate())) {
                    let newDate = new Date(year, month, day)
                    setDates({
                        initialDate: newDate,
                        selectedDate: newDate
                    })
                }
            }
        }
    }, [urlParamData])

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

    // Update date when popup is closed
    useEffect(() => {
        if (showFilterPopup) {
            setDates({
                ...dates,
                selectedDate: dates.initialDate
            })
        }
    }, [showFilterPopup])


    const clearButtonClicked = () => {
        setDates({
            ...dates,
            selectedDate: dates.initialDate
        })
    }

    const saveButtonClicked = () => {
        setDates({
            ...dates,
            initialDate: dates.selectedDate
        })
        setShowFilterPopup(false);
        if (dates.initialDate != dates.selectedDate) {
            router.query.date = dates.selectedDate.getFullYear() + "-" + dates.selectedDate.getMonth() + "-" + dates.selectedDate.getDate();
            router.push(router);
        }
    }



    return (

        <div className="relative inline">


            <FilterButton
                buttonText={uistring.searchFilters.availabilty}
                onClick={() => { setShowFilterPopup(!showFilterPopup) }}
                buttonRef={filterButtonRef}
                isFilterApplied={now.getDate() != dates.selectedDate.getDate()}
            />

            <div ref={filterPopupRef} className={`${showFilterPopup ? "inline-block " : "hidden "} absolute left-0 top-[54px] right-auto z-50 bg-white border-[0.5px] rounded-xl 
            overflow-hidden shadow-lg `}>
                <div className="block">
                    <div className="max-h-[calc(100vh-200px)] px-2 min-w-[320px] overflow-y-auto">
                        <Calendar
                            date={dates.selectedDate}
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
                        <ClearSavePane
                            isClearButtonDisbaled={dates.initialDate.getDate() === dates.selectedDate.getDate()}
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
