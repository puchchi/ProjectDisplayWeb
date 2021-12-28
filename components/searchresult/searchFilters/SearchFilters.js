import uistring from '../../../data/uistring.json'
import FreeCancellation from './FreeCancellation'
import PriceFilterClassComp from './PriceFilterClassComp'
import AvailabilityFilter from './AvailabilityFilter'
import MoreFilters from './MoreFilters'
import SortByFilter from './SortByFilter'
import FilterButton from './searchFiltersWidget/FilterButton'
import { useRouter } from 'next/router';

function SearchFilters(props) {
    const router = useRouter();

    return (
        <div className="w-full mt-6 flex items-center justify-between">
            {props.isPlaceholder ?
                <FilterButton
                    isPlaceholder={true}
                />
                :
                <>
                    <div className="">
                        <FreeCancellation />
                        <PriceFilterClassComp
                            minPriceOfResults={props.minPriceOfResults}
                            maxPriceOfResults={props.maxPriceOfResults}
                            router={router}
                        />
                        <AvailabilityFilter
                            router={router}
                        />
                        <MoreFilters />
                    </div>
                    <div className="">
                        <SortByFilter/>
                    </div>
                </>
            }
        </div>
    )
}

export default SearchFilters
