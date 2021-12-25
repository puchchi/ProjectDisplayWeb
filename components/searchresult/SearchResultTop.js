import { useSelector, useDispatch } from 'react-redux';

import uistring from '../../data/uistring.json'

function SearchResultTop() {

    // Data from redux store
    const searchedLocation = useSelector(state => state.searchDetail.searchLocation);
    const searchedService = useSelector(state => state.searchDetail.searchService);

    let location = searchedLocation;
    if (location.length > 0)
        location = location.split(",")[0];

    return (
        <div className="pt-10 relative overflow-hidden overflow-ellipsis whitespace-nowrap w-full">
            <h1 className="heading-type-100 tracking-wide">
                <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">{searchedService}&nbsp;{uistring.searchResultTop.in}&nbsp;{location}</span>
            </h1>
        </div>
    )
}

export default SearchResultTop
