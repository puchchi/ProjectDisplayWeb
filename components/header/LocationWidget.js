import { useState } from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";

import uistring from '../../data/uistring.json'
import placeholder from '../../data/placeholder.json'

import { XIcon } from '@heroicons/react/solid'
import { LocationMarkerIcon } from '@heroicons/react/solid'

// Search restriction. It is restricted to India only 
// More info: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#ComponentRestrictions
const searchOptions = {
    componentRestrictions: { country: ['in'] },
    types: ['(cities)']
}

function LocationWidget({ locationInputRef, locationWidgetExpandedState, locationWidgetValue, setLocationWidgetValue, locationSuggestions, setLocationSuggestions }) {

    const LocationResultRender = ({ result }) => {
        return (
            <li className="flex py-2 pl-8 pr-4 cursor-pointer text-textColor-heavy hover:bg-gray-100">
                <div className="bg-gray-200 border-gray-500 border-opacity-30  border min-w-[3rem] h-12 items-center justify-center flex mr-4 rounded-lg">
                    <LocationMarkerIcon className="h-5" />
                </div>
                <div className=" overflow-clip flex items-center font-normal">{result}
                </div>
            </li>
        )
    }

    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    });

    const [locationSuggestionLoadingState, setLocationSuggestionLoadingState] = useState(false)

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setLocationWidgetValue(value);
        setCoordinates(latLng);
    };

    const setLocationSuggestionData = ({ suggestions, loading }) => {
        if (loading) {
            setLocationSuggestionLoadingState(true);
        }

        if (locationSuggestionLoadingState && suggestions != locationSuggestions) {
            setLocationSuggestions(suggestions);
            setLocationSuggestionLoadingState(false);
        }
    }
    return (

        <PlacesAutocomplete
            value={locationWidgetValue}
            onChange={setLocationWidgetValue}
            onSelect={handleSelect}
            searchOptions={searchOptions}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <>
                    <label className="cursor-pointer py-3.5 px-8 block z-1">
                        <div>
                            <div className="font-bold text-xs pb-0.5 text-textColor-heavy tracking-wide">
                                {uistring.header.location}
                            </div>
                            <input autoFocus ref={locationInputRef} type="text" placeholder={placeholder.header.locationPlaceholder} className="block w-full bg-transparent outline-none text-sm font-medium overflow-ellipsis
                                 text-textColor-heavy expanded-search-placeholder tracking-wide cursor-pointer md:w-48" {...getInputProps()} />
                        </div>
                    </label>

                    {/* Cross button in location widget */}
                    <div className="relative">
                        <div className={`${locationWidgetValue.length && locationWidgetExpandedState ? "inline " : "hidden "} absolute top-[55%] right-4  -translate-y-2/4`}>
                            <button type="button" className="rounded-full bg-gray-200 hover:bg-gray-300 text-black " onClick={() => {
                                setLocationWidgetValue("");
                                setLocationSuggestions([]);
                            }} >
                                <XIcon className="h-6 p-[5px]" />
                            </button>
                        </div>
                    </div>

                    {/* Location search result */}
                    {setLocationSuggestionData({ suggestions: suggestions, loading: loading })}

                    <div className={`${locationSuggestions.length && locationWidgetExpandedState ? "" : "hidden "}absolute left-auto top-full rounded-[2rem] mt-3 overflow-x-hidden overflow-y-auto py-4  bg-white shadow-locationResult 
                    location-result-height`}>
                        <section>
                            <div>
                                <ul className="overflow-ellipsis w-[30rem] pt-2">
                                    {locationSuggestions.map(suggestion => {
                                        return (
                                            <LocationResultRender
                                                result={suggestion.description}
                                                key={suggestion.index}
                                            />
                                        )
                                    })}
                                </ul>
                            </div>
                        </section>
                    </div>
                </>
            )}
        </PlacesAutocomplete>
    )
}

export default LocationWidget
