import React, { FC, memo, useEffect, useMemo } from 'react'

import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import Card from "../../../../components/Card/Card";
import bookmarksStyle from './bookmarks.module.css'
import Pagination from "../../../Pagination";
import {
    getCurrentBookmarkPart,
    getSearchPart,
    setNextPage,
    setPrevPage, partBookmarks, setPageSize,
    setSearch
} from "../../../../store/reducers/NewsSlice";

const size = 6
const Bookmarks: FC = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)
    const { bookmarks, searchResults, searchText, pageSize, currentPage } = state.news
    const bookmarkPart = getCurrentBookmarkPart(state)
    const searchPart = getSearchPart(state)

    const part = searchPart || bookmarkPart

    useEffect(() => {
        dispatch(setPageSize(size))
    }, [dispatch])

    useEffect(() => {
        dispatch(partBookmarks())
    }, [bookmarks.length, dispatch])

    useEffect(() => {
        if (searchText) {
            dispatch(setSearch({ query: searchText, items: bookmarks }))
        }
    }, [searchText, bookmarks, dispatch])

    const news = useMemo(() => {
        if (searchPart) {
            return searchPart.news
        } else {
            return searchText ? [] : bookmarkPart?.news || []
        }
    }, [searchPart, bookmarkPart, searchText])

    return (
        <div>
            <div className={bookmarksStyle.container}>
                {
                    news.map(item => (
                        <Card key={item.id} item={item} />
                    ))
                }
            </div>
            {
                part && (
                    <div className={bookmarksStyle.paginationContainer}>
                        <Pagination
                            onNext={() => {
                                dispatch(setNextPage())
                            }}
                            onPrev={() => {
                                dispatch(setPrevPage())
                            }}
                            pageSize={pageSize}
                            totalCount={searchText ? searchResults.length : bookmarks?.length ?? 0}
                            currentPage={currentPage}
                            hasNext={part.hasNext}
                            hasPrev={part.hasPrev}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default memo(Bookmarks)