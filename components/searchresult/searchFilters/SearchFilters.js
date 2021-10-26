import uistring from '../../../data/uistring.json'
import FreeCancellation from './FreeCancellation'
import PriceFilterClassComp from './PriceFilterClassComp'
import AvailabilityFilter from './AvailabilityFilter'
import MoreFilters from './MoreFilters'
import FilterButton from './searchFiltersWidget/FilterButton'


function SearchFilters() {
    return (
        <div className="w-full mt-6">

            <FreeCancellation/>
            <PriceFilterClassComp/>
            <AvailabilityFilter/>
            <MoreFilters/>
            <FilterButton
                buttonText="Sort: Relevance"
            />

        </div>
    )
}

export default SearchFilters
