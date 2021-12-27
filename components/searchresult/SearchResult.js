import SearchFilters from "./searchFilters/SearchFilters"
import SearchResultTop from "./SearchResultTop"
import { useQuery } from 'react-query'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import SearchResultCard from "./SearchResultCard"
import apis from '../../data/api.json'
import { useSelector } from 'react-redux';

function isEmptyValues(obj) {
    for (let key in obj) {
        if (obj[key].length > 0)
            return false;
    }

    return true;
}


function SearchResult({ serachedLocationWidgetValue, searchedServicesWidgetValue }) {

    const searchDetail = useSelector(state => state.searchDetail)

    // const [shouldSkipQuery, setShouldSkipQuery] = useState(isEmptyValues(searchDetail) === false)
    // const [triggerQuery, setTriggerQuery] = useState(false)

    // // This effect is being used to stop multiple calls on seach detail change
    // useEffect(() => {
    //     console.log("search detail changed")
    //     console.log(searchDetail)
    //     setShouldSkipQuery(true);
    //     console.log(shouldSkipQuery)
    // }, [searchDetail])

    // useEffect(() => {
    //     console.log("inside another effect")
    //     console.log(shouldSkipQuery)
    //     setTriggerQuery(true);

    // }, [shouldSkipQuery])

    const { isLoading, data } = useQuery([searchDetail], async ({ queryKey }) => {

        const searchFilter = {
            searchLocation: "place",
            searchService: "service",
            searchLat: "lat",
            searchLng: "lng",
            searchCancellationPolicy: "cancellation_policy",
            searchMinPrice: "min_price",
            searchMaxPrice: "max_price",
            searchCalenderDate: "date",
            searchMinCompletedProjects: "min_completed_projects",
            searchMinReview: "min_review",
            searchResultPage: "page"
        }
        const qs = Object.keys(queryKey[0])
            .map(key => `${searchFilter[key]}=${queryKey[0][key]}`)
            .join('&');

        return await axios.get(apis.photographers + "?" + qs);
    },
        {
            enabled: isEmptyValues(searchDetail) === false,
            refetchInterval: false,
            refetchIntervalInBackground: false,
            refetchOnWindowFocus: false
        }
    )

    // // This effect will restrict to just 1 call on each data change.
    // useEffect(() => {
    //     setShouldSkipQuery(false);
    //     setTriggerQuery(false);
    // }, [data])


    return (

        <div className="mt-miniHeader relative px-customSm md:px-customMd mx-auto max-w-custom">
            {isLoading || data == undefined ? "" :

                <div className="md:px-40">

                    {/* Extra padding for search result page */}
                    <SearchResultTop />
                    <SearchFilters
                        minPriceOfResults={data.data.minprice}
                        maxPriceOfResults={data.data.maxprice}
                    />

                    <div className="mt-3 mb-6 border-b border-b-border-light" />
                    <div className="mt-6  flex flex-col ">


                        <div className="flex">

                            {/* Left search result pa */}
                            <div className="flex-grow">

                                {data.data.photographers.map((d) =>
                                    <SearchResultCard
                                        key={d.id}
                                        images={d.images}
                                        name={d.name}
                                        desc={d.desc}
                                        package={d.packages}
                                        price={d.price}
                                        about={d.about}
                                    />
                                )}
                            </div>
                        </div>
                    </div>


                </div>
            }
        </div>
    )
}

export default SearchResult
