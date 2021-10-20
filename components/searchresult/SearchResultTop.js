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
        <div className="pt-10 relative">
            <h1 className="heading-type-100 tracking-wide">
                <span>{searchedService}</span>
                <span>&nbsp;{uistring.searchResultTop.in}&nbsp;</span>
                <span>{location}</span>
            </h1>
        </div>
    )
}

export default SearchResultTop
