import React, { FC, memo, useMemo } from 'react'
import FirstCardStyle from './firstCard.module.css'
import PhotoObject from "../PhotoObject";

import { ReactComponent as BookmarkFilledIcon } from "../../assets/svg/bookmark-filled.svg";
import { ReactComponent as BookmarkIcon } from "../../assets/svg/bookmark.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { addToBookmark } from "../../store/reducers/NewsSlice";
import { format } from "date-fns";
import { NewsItem } from '../../models/newsItem';


interface FirstCardProps {
    item: NewsItem
}
const FirstCard: FC<FirstCardProps> = ({ item }) => {
    const dispatch = useAppDispatch()
    const { bookmarks } = useAppSelector(state => state.news)

    const isBookmarked = useMemo(() => {
        return bookmarks.some(({ id }) => id === item.id)
    }, [bookmarks, item.id])

    const handleSave = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        dispatch(addToBookmark(item))



    }


    const dateCard = React.useMemo(() => format(item.datetime * 1000, "d MMM"), [
        item.datetime,
    ]);


    return (
        <a href={item.url} target='_blank' rel="noreferrer" className={FirstCardStyle.card}>
            <div className={FirstCardStyle.related}>
                {item.related}
            </div>
            <div className={FirstCardStyle.latestTag}>
                Latest research
            </div>
            <PhotoObject image={item.image} />
            <div className={FirstCardStyle.overlay}></div>
            <div className={FirstCardStyle.cardInner}>

                <div className={FirstCardStyle.cardHeadline}>
                    {item.headline}
                </div>
                <div>
                    <div className={FirstCardStyle.summary}>{item.summary}</div>
                </div>

                <div className={FirstCardStyle.footer}>
                    <div className={FirstCardStyle.date}>
                        {dateCard}
                    </div>
                    <div className={FirstCardStyle.sourse}>
                        {item.source}
                    </div>
                    <div className={FirstCardStyle.iconContainer} onClick={handleSave}>
                        {
                            isBookmarked ? (
                                <BookmarkFilledIcon className={FirstCardStyle.icon} />
                            ) : (
                                <BookmarkIcon className={FirstCardStyle.icon} />
                            )
                        }
                    </div>
                </div>
            </div>
        </a>
    )
}

export default memo(FirstCard)