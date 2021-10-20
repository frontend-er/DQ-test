import React, { FC, memo, useEffect, useMemo } from 'react'
import Pagination from "../../../Pagination";
import newsStyle from './news.module.css'
import { fetchNews } from "../../../../requests/get-news";
import {
    getCurrentPart,
    getSearchPart,
    setNextPage,
    setPrevPage, partNews,
    setNews, setPageSize
} from "../../../../store/reducers/NewsSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import Card from "../../../../components/Card/Card";
import FirstCard from '../../../../components/FirstCard';
import { CircularProgress } from '@mui/material';


//news on page
const size = 6
const News: FC = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)
    const { searchText, pageSize, totalCount, currentPage, latest } = state.news
    const currentPart = getCurrentPart(state)
    const searchPart = getSearchPart(state)

    const part = searchPart || currentPart
    const news = useMemo(() => {
        if (searchPart) {
            return searchPart.news
        } else {
            return searchText ? [] : currentPart?.news || []
        }
    }, [searchPart, currentPart, searchText])

    useEffect(() => {
        dispatch(setPageSize(size))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchNews())
        dispatch(partNews())
    }, [dispatch])

    if (!currentPart) {
        return <div className={newsStyle.loading}><CircularProgress color="inherit" /></div>
    }

    return (
        <div className={newsStyle.container}>
            <div className={newsStyle.FirstCardContainer}>
                {
                    latest && (
                        <FirstCard item={latest} />
                    )
                }
            </div>
            <div className={newsStyle.cardsContainer}>
                <div className={newsStyle.grid}>
                    {
                        news.map(item => (
                            <Card item={item} key={item.id} />
                        ))
                    }
                </div>
                {
                    totalCount > 0 && (
                        <div className={newsStyle.paginationContainer}>
                            <Pagination
                                onNext={() => {
                                    dispatch(setNextPage())
                                }}
                                onPrev={() => {
                                    dispatch(setPrevPage())
                                }}
                                pageSize={pageSize}
                                totalCount={totalCount}
                                currentPage={currentPage}
                                hasNext={part.hasNext}
                                hasPrev={part.hasPrev}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default memo(News)