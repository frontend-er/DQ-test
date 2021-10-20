import React, { ChangeEvent, FC, memo } from 'react'
import widgetStyle from './widget.module.css'
import Input from "../../components/Input";
import { Tabs } from "./types";
import News from "./components/News";
import Bookmarks from "./components/Bookmarks";
import WidgetTabs from "./components/WidgetTabs";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { setActiveTab, setSearch } from "../../store/reducers/NewsSlice";

const NewsWidget: FC = () => {
    const dispatch = useAppDispatch()
    const { searchText, activeTab, news, bookmarks } = useAppSelector(state => state.news)

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const items = activeTab === "news" ? news : bookmarks
        dispatch(setSearch({ query: event.target.value, items }))
    }

    const handleTabClick = (tab: Tabs) => {
        dispatch(setActiveTab(tab))
    }

    return (
        <div className={widgetStyle.widget}>
            <div className='flex'>
                <WidgetTabs activeTab={activeTab} onTabClick={handleTabClick} />
                <div className='ml-auto'>
                    <Input onInput={handleSearch} value={searchText} />
                </div>
            </div>
            {activeTab === "news" && <News />}
            {activeTab === "bookmarks" && <Bookmarks />}
        </div>
    )
}

export default memo(NewsWidget)