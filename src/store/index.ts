import { combineReducers, configureStore } from '@reduxjs/toolkit'
import newsReducer from './reducers/NewsSlice'

const rootReducer = combineReducers({
    news: newsReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']