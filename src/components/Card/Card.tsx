import React, { FC, memo, useMemo } from 'react'
import cardStyle from './card.module.css'
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { addToBookmark } from "../../store/reducers/NewsSlice";
import { ReactComponent as BookmarkFilledIcon } from "../../assets/svg/bookmark-filled.svg";
import { ReactComponent as BookmarkIcon } from "../../assets/svg/bookmark.svg";
import PhotoObject from '../PhotoObject';
import { format } from "date-fns";
import { NewsItem } from '../../models/newsItem';


interface CardProps {
    item: NewsItem
}

const Card: FC<CardProps> = ({ item }) => {
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
        <a href={item.url} target='_blank' rel="noreferrer" className={cardStyle.card}>
            <div className={cardStyle.related}>
                {item.related}
            </div>
            <PhotoObject image={item.image} />
            <div className={cardStyle.overlay}></div>
            <div className={cardStyle.cardInner}>
                <div className={cardStyle.cardHeadline}>
                    {item.headline}
                </div>
                <div>
                    <div className={cardStyle.summary}>{item.summary}</div>
                </div>
                <div className={cardStyle.footer}>
                    <div className={cardStyle.date}>
                        {dateCard}
                    </div>
                    <div className={cardStyle.sourse}>
                        {item.source}
                    </div>
                    <div className={cardStyle.iconContainer} onClick={handleSave}>
                        {
                            isBookmarked ? (
                                <BookmarkFilledIcon className={cardStyle.icon} />
                            ) : (
                                <BookmarkIcon className={cardStyle.icon} />
                            )
                        }
                    </div>
                </div>
            </div>
        </a>
    )
}

export default memo(Card)