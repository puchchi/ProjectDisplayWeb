import SearchFilters from "./searchFilters/SearchFilters"
import SearchResultTop from "./SearchResultTop"
import { useQuery } from 'react-query'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import SearchResultCard from "./SearchResultCard"
import apis from '../../data/api.json'
import { useSelector } from 'react-redux';
import SearchResultPageNav from "./SearchResultPageNav"

const maxNoOfResult = 20;

function isEmptyValues(obj) {
    for (let key in obj) {
        if (obj[key].length > 0)
            return false;
    }

    return true;
}

function SearchResult({ serachedLocationWidgetValue, searchedServicesWidgetValue }) {

    const searchDetail = useSelector(state => state.searchDetail)

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

    return (

        <div className="mt-miniHeader relative px-customSm md:px-customMd mx-auto max-w-custom">
            <div className="lg:px-40">

                {/* Extra padding for search result page */}
                <SearchResultTop />
                {isLoading || data == undefined ?
                    <SearchFilters
                        isPlaceholder={true}
                    />
                    :
                    <SearchFilters
                        isPlaceholder={false}
                        minPriceOfResults={data.data.minprice}
                        maxPriceOfResults={data.data.maxprice}
                    />
                }

                <div className="mt-3 mb-6 border-b border-b-border-light" />
                <div className="mt-6  flex flex-col ">

                    <div className="flex">

                        {/* search result */}
                        <div className="flex-grow">
                            {isLoading || data == undefined ?
                                Array(maxNoOfResult).fill(0).map((d) =>
                                    <SearchResultCard
                                        key={d.id}
                                        isPlaceholder={true}
                                    />
                                )
                                :
                                data.data.photographers.map((d) =>
                                    <SearchResultCard
                                        key={d.id}
                                        isPlaceholder={false}
                                        images={d.images}
                                        name={d.name}
                                        desc={d.desc}
                                        package={d.packages}
                                        price={d.price}
                                        about={d.about}
                                    />
                                )

                            }
                        </div>
                    </div>
                </div>

                {isLoading || data == undefined ? "" :
                    <SearchResultPageNav
                        currentPage={data.data.page}
                        totalResults={data.data.totalresults}
                        resultcount={data.data.resultcount}
                    />
                }

            </div>

        </div>
    )
}

export default SearchResult
