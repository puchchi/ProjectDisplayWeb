import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import Header from '../../components/header/Header'
import SearchResult from '../../components/searchresult/SearchResult';
import { setSearchLocation, setSearchService } from '../../redux';

import EditorsPick from '../../components/homepage/EditorsPick'

function s() {
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!router.isReady) return;

        const query = router.query
        const { place, service, lat, lng } = query

        dispatch(setSearchLocation(place));
        dispatch(setSearchService(service));
    }, [router.isReady, router]);

    return (
        <>
            <Header
                showPlaceAndCategoryInSearchBar={true}
            />
            <SearchResult />
            <EditorsPick/>
        </>
    )
}

export default s
