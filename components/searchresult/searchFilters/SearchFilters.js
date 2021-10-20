import uistring from '../../../data/uistring.json'
import FilterButton from './searchFiltersWidget/FilterButton'
import FreeCancellation from './FreeCancellation'
import PriceFilter from './PriceFilter'
import PriceFilterClassComp from './PriceFilterClassComp'


function SearchFilters() {
    return (
        <div className="w-full mt-6">

            <FreeCancellation/>

            <PriceFilterClassComp/>

            <FilterButton
                buttonText={uistring.searchFilters.availabilty}
            />
            <FilterButton
                buttonText={uistring.searchFilters.moreFilters}
            />

        </div>
    )
}

export default SearchFilters
