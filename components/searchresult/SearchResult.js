import SearchFilters from "./searchFilters/SearchFilters"
import SearchResultTop from "./SearchResultTop"

function SearchResult({ serachedLocationWidgetValue, searchedServicesWidgetValue }) {
    return (
        <div className="mt-miniHeader relative px-customSm md:px-customMd mx-auto max-w-custom">
            {/* Extra padding for search result page */}
            <div className="md:px-8">
                <SearchResultTop />
                <SearchFilters/>
            </div>
        </div>
    )
}

export default SearchResult
