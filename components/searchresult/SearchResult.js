import SearchFilters from "./searchFilters/SearchFilters"
import SearchResultTop from "./SearchResultTop"
import { useQuery } from 'react-query'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import SearchResultCard from "./SearchResultCard"
import apis from '../../data/api.json'
import { useSelector } from 'react-redux';
import SearchResultPageNav from "./SearchResultPageNav"
import { useRouter } from 'next/router';

const maxNoOfResult = 20;

function isEmptyValues(obj) {
    for (let key in obj) {
        if (obj[key].length > 0) {
            return false;
        }
    }
    return true;
}

function SearchResult({ serachedLocationWidgetValue, searchedServicesWidgetValue }) {

    const router = useRouter();
    const routerQuery = router.query;

    const { isLoading, data } = useQuery([routerQuery], async ({ queryKey }) => {

        const qs = Object.keys(queryKey[0])
            .map(key => `${key}=${queryKey[0][key]}`)
            .join('&');

        return await axios.get(apis.photographers + "?" + qs);
    },
        {
            enabled: isEmptyValues(routerQuery) === false,
            refetchInterval: false,
            refetchIntervalInBackground: false,
            refetchOnWindowFocus: false
        }
    )

    let placeholderComponentArray = new Array(maxNoOfResult);
    for (let i = 0; i < maxNoOfResult; i++) {
        placeholderComponentArray[i] = i;
    }

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

                                placeholderComponentArray.map((d) =>
                                    <SearchResultCard
                                        key={d}
                                        isPlaceholder={true}
                                    />
                                )
                                :
                                data.data.profiles.map((d) =>
                                    <SearchResultCard
                                        key={d.id}
                                        isPlaceholder={false}
                                        images={d.images}
                                        name={d.name}
                                        desc={d.desc}
                                        package={d.packages}
                                        price={d.price}
                                        about={d.about}
                                        profileType={d.type}
                                        profileId={d.id}
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
