import axios from "axios";
import { AppDispatch } from "../store";
import { newsSlice } from "../store/reducers/NewsSlice";
import { NewsItem } from "../models/newsItem";


export const fetchNews = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(newsSlice.actions.newsFetching())
        const { data } = await axios.get<NewsItem[]>(`https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2021-03-01&token=bpjsf67rh5r9328ecgvg`)
        dispatch(newsSlice.actions.newsFetchingSucces(data))

        console.log(data);
        return data
    } catch (error) {
        dispatch(newsSlice.actions.newsFetchingError('error'))
    }
}
