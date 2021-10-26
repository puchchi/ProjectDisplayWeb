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
            {/* Extra padding for search result page */}
            <div className="md:px-8">
                <SearchResultTop />
                <SearchFilters />

                <div className="mt-3 mb-6 border-b border-b-border-light" />
                <div className="mt-6  flex flex-col ">
                    {/* <SearchResultCard
                        images={["/images/dynamic/pexels-photo-139829.jpeg",
                            "/images/dynamic/pexels-photo-368893.jpeg",
                            "/images/dynamic/pexels-photo-598917.jpeg",
                            "/images/dynamic/pexels-photo-1264210.jpeg"]}
                        name={"Prashant's cool photography"}
                        desc={"Best photographer in delhi-ncr"}
                        packages={[
                            {
                                "default": "7000/day",
                                "full": "25000/wedding"
                            }
                        ]}
                        price={5000}
                    /> */}


                    {isLoading ? "" :
                        <div className="flex">

                            {/* Left search result pa */}
                            <div className="flex-grow">

                                {data.data.map((d) =>
                                    <SearchResultCard
                                        images={d.images}
                                        name={d.name}
                                        desc={d.desc}
                                        package={d.packages}
                                        price={d.price}
                                        about={d.about}
                                    />
                                )}
                            </div>

                            <div className="w-[360px] bg-background-dark hidden lg:inline-block ml-4">

                            </div>
                        </div>
                    }

                </div>

                {console.log(data)}
            </div>
        </div>
    )
}

export default SearchResult
