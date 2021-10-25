import uistring from '../../../data/uistring.json'
import FreeCancellation from './FreeCancellation'
import PriceFilterClassComp from './PriceFilterClassComp'
import AvailabilityFilter from './AvailabilityFilter'
import MoreFilters from './MoreFilters'


function SearchFilters() {
    return (
        <div className="w-full mt-6">

            <FreeCancellation/>
            <PriceFilterClassComp/>
            <AvailabilityFilter/>
            <MoreFilters/>

        </div>
    )
}

export default SearchFilters
