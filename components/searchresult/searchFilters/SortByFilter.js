import React from 'react'
import uistringGlobal from '../../../data/uistring.json'
import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react'
import FilterButton from './searchFiltersWidget/FilterButton'
import { useRouter } from 'next/router';

const sortByFilterValues = {
    "relevance": { "urlString": "relevance", "uiString": uistringGlobal.searchFilters.relevance },
    "popularity": { "urlString": "popularity", "uiString": uistringGlobal.searchFilters.popularity },
    "priceLowToHigh": { "urlString": "price_low_to_high", "uiString": uistringGlobal.searchFilters.priceLowToHigh },
    "priceHighToLow": { "urlString": "price_high_to_low", "uiString": uistringGlobal.searchFilters.priceHighToLow },
}

function SortByFilterDropDownEntry({ string, isSelected, onClick }) {

    return (
        <div className={`${isSelected ? "font-semibold  " : "font-normal "} text-sm text-textColor-extraHeavy cursor-pointer hover:bg-background-light
        px-5 py-3 tracking-wide`} onClick={onClick}>{string}</div>
    )
}

function SortByFilter() {
    const sortByOptionFromURL = useSelector(state => state.searchDetail.searchSortByOption);

    const [sortByOption, setSortByOption] = useState({
        initialValue: "popularity",
        selectedValue: "popularity"
    });

    const [showFilterPopup, setShowFilterPopup] = useState(false);

    // Update toggle button state on basis of url data
    useEffect(() => {
        Object.keys(sortByFilterValues).forEach((key) => {
            if (sortByOptionFromURL === sortByFilterValues[key].urlString) {
                setSortByOption({
                    initialValue: key,
                    selectedValue: key
                })
            }
        })


    }, [sortByOptionFromURL])


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

    const router = useRouter();

    const dropDownEntryClicked = (key) => {

        setSortByOption({
            ...sortByOption,
            selectedValue: key
        })
        if (sortByOption.initialValue != key) {
            setShowFilterPopup(false);
            router.query.sortby = sortByFilterValues[key].urlString;
            router.push(router);
        }
    }

    let buttonString = uistringGlobal.searchFilters.sort + ": " + sortByFilterValues[sortByOption.selectedValue].uiString

    return (
        <div className="relative inline">
            <FilterButton
                buttonText={buttonString}
                onClick={() => { setShowFilterPopup(!showFilterPopup) }}
                buttonRef={filterButtonRef}
                isFilterApplied={showFilterPopup}
            />

            {/* Free cancellation popup */}
            <div ref={filterPopupRef} className={`${showFilterPopup ? "inline-block " : "hidden "} absolute right-0 top-[54px] left-auto z-50 bg-white border-[0.5px] rounded-xl 
            overflow-hidden shadow-lg `}>
                <div className="block">
                    <div className="max-h-[calc(100vh-300px)] min-w-[240px] overflow-y-auto">
                        <div className="flex flex-col justify-between py-2 justify-items-start">

                            <SortByFilterDropDownEntry
                                string={sortByFilterValues.relevance.uiString}
                                isSelected={sortByOption.selectedValue === "relevance"}
                                onClick={() => dropDownEntryClicked("relevance")}
                            />
                            <SortByFilterDropDownEntry
                                string={sortByFilterValues.popularity.uiString}
                                isSelected={sortByOption.selectedValue === "popularity"}
                                onClick={() => dropDownEntryClicked("popularity")}
                            />
                            <SortByFilterDropDownEntry
                                string={sortByFilterValues.priceHighToLow.uiString}
                                isSelected={sortByOption.selectedValue === "priceHighToLow"}
                                onClick={() => dropDownEntryClicked("priceHighToLow")}
                            />
                            <SortByFilterDropDownEntry
                                string={sortByFilterValues.priceLowToHigh.uiString}
                                isSelected={sortByOption.selectedValue === "priceLowToHigh"}
                                onClick={() => dropDownEntryClicked("priceLowToHigh")}
                            />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SortByFilter
