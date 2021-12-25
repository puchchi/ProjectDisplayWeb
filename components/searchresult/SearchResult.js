import SearchFilters from "./searchFilters/SearchFilters"
import SearchResultTop from "./SearchResultTop"
import { useQuery } from 'react-query'
import axios from 'axios'
import SearchResultCard from "./SearchResultCard"


function SearchResult({ serachedLocationWidgetValue, searchedServicesWidgetValue }) {

    const { isLoading, data } = useQuery('search-result', () => {
        return axios.get('http://localhost:4000/photographers/')
    })

    return (

        <div className="mt-miniHeader relative px-customSm md:px-customMd mx-auto max-w-custom">
            {isLoading ? "" :

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
