import uistring from '../../../data/uistring.json'
import FreeCancellation from './FreeCancellation'
import PriceFilterClassComp from './PriceFilterClassComp'
import AvailabilityFilter from './AvailabilityFilter'
import MoreFilters from './MoreFilters'
import FilterButton from './searchFiltersWidget/FilterButton'
import { useRouter } from 'next/router';


function SearchFilters(props) {
    const router = useRouter();

    return (
        <div className="w-full mt-6">

            <FreeCancellation />
            <PriceFilterClassComp
                minPriceOfResults={props.minPriceOfResults}
                maxPriceOfResults={props.maxPriceOfResults}
                router={router}
            />
            <AvailabilityFilter />
            <MoreFilters />
            <FilterButton
                buttonText="Sort: Relevance"
            />

        </div>
    )
}

export default SearchFilters
