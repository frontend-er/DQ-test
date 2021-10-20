import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { Tabs, widgetTabs } from "../../widgets/NewsWidget/types";
import { NewsItem } from "../../models/newsItem";
import { Pagination } from "../../models/pagination";

export enum NewsView {
    All = "All",
    Bookmarks = "Bookmarks",
}

export interface NewsPart {
    news: NewsItem[]
    hasNext: boolean
    hasPrev: boolean
}

interface InitialState extends Pagination {
    NewsParts: NewsPart[]
    news: NewsItem[]
    bookmarksParts: NewsPart[]
    bookmarks: NewsItem[]
    searchResults: NewsItem[]
    searchParts: NewsPart[]
    searchText: string
    activeTab: Tabs
    isLoading: boolean
    latest?: NewsItem,
    error?: string
}

const initialState: InitialState = {
    news: [],
    NewsParts: [],
    bookmarks: [],
    bookmarksParts: [],
    searchResults: [],
    searchParts: [],
    searchText: '',
    activeTab: widgetTabs[0].value,
    isLoading: true,
    currentPage: 0,
    totalCount: 0,
    pageSize: 6,
    error: ''
}

const part = (items: NewsItem[], state: InitialState): NewsPart[] => {
    const newArrayOfNews: NewsPart[] = []
    const totalPages = Math.ceil(items.length / state.pageSize)



    for (let i = 0; i < totalPages; i += 1) {


        const skip = i * state.pageSize
        const item: NewsPart = {
            news: items.slice(skip, skip + state.pageSize),
            hasNext: i + 1 !== totalPages,
            hasPrev: i !== 0
        }
        newArrayOfNews.push(item)

    }
    return newArrayOfNews
}




export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        newsFetching(state) {
            state.isLoading = true;
        },
        newsFetchingSucces(state, { payload }: PayloadAction<NewsItem[]>) {
            state.isLoading = false;
            state.error = '';
            state.news = payload;
            state.latest = state.news.sort((a, b) => b.datetime - a.datetime)[0]
            state.NewsParts = part(payload, state)
            state.totalCount = state.news.length
        },
        newsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = true;
            state.error = action.payload;
        },
        setNews(state, { payload }: PayloadAction<NewsItem[]>) {
            state.news = payload;
            state.latest = state.news.sort((a, b) => b.datetime - a.datetime)[0]
            state.NewsParts = part(payload, state)
            state.totalCount = state.news.length
        },
        partNews: (state) => {
            state.NewsParts = part(state.news, state)
        },

        addToBookmark: (state, { payload }) => {
            const existingBookmark = state.bookmarks.find(({ id }) => payload.id === id)

            if (existingBookmark) {
                state.bookmarks = state.bookmarks.filter(({ id }) => id !== payload.id)
            } else {
                state.bookmarks = state.bookmarks.concat([payload])
            }
        },
        partBookmarks: (state) => {
            state.bookmarksParts = part(state.bookmarks, state)
        },
        setSearch: (state, { payload }: PayloadAction<{ query: string, items: NewsItem[] }>) => {
            state.searchText = payload.query
            state.searchResults = state.searchText ? payload.items.filter(item => {
                const search = payload.query.toLowerCase()
                return item.headline.toLowerCase().includes(search) || item.summary.toLowerCase().includes(search)
            }) : []
            state.searchParts = part(state.searchResults, state)
            state.totalCount = state.searchText ? state.searchResults.length : payload.items.length
            state.currentPage = 0
        },
        setActiveTab: (state, { payload }: PayloadAction<Tabs>) => {
            state.activeTab = payload
            state.searchText = ''
            state.searchResults = []
            state.searchParts = []
            state.currentPage = 0
        },
        setPageSize: (state, { payload }: PayloadAction<number>) => {
            state.pageSize = payload
        },
        setNextPage(state) {
            state.currentPage += 1
        },
        setPrevPage(state) {
            state.currentPage -= 1
        },
    },
})

export const getCurrentBookmarkPart = ({ news }: RootState) => news.bookmarksParts[news.currentPage]
export const getSearchPart = ({ news }: RootState) => news.searchParts[news.currentPage]

export const getCurrentPart = ({ news }: RootState) => news.NewsParts[news.currentPage]



export const { setNews, addToBookmark, setSearch, setActiveTab, setPageSize, partBookmarks, partNews, setNextPage, setPrevPage } = newsSlice.actions
export default newsSlice.reducer