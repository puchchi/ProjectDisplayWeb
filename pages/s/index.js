import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import Header from '../../components/header/Header'
import Footer from '../../components/Footer'
import SearchResult from '../../components/searchresult/SearchResult';
import { setSearchFilters } from '../../redux';

import EditorsPick from '../../components/homepage/EditorsPick'



function s() {
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!router.isReady) return;

        const query = router.query
        const { place,
            service,
            lat,
            lng,
            cancellation_policy,
            min_price,
            max_price,
            date,
            min_completed_projects,
            min_review,
            page,
            sortby
        } = query
        
        const searchFilter ={
            searchLocation: place,
            searchService: service,
            searchLat:lat,
            searchLng:lng,
            searchCancellationPolicy:cancellation_policy,
            searchMinPrice:min_price,
            searchMaxPrice:max_price,
            searchCalenderDate:date,
            searchMinCompletedProjects:min_completed_projects,
            searchMinReview:min_review,
            searchResultPage:page,
            searchSortByOption:sortby
        }

        dispatch(setSearchFilters(searchFilter))
    }, [router.isReady, router]);

    return (
        <>
            <Header
                showPlaceAndCategoryInSearchBar={true}
            />
            <SearchResult />
            <Footer fixedFooter={false} />
        </>
    )
}

export default s
