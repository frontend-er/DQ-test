import React from 'react';

import NewsWidget from "./widgets/NewsWidget";
import wrapperStyle from './assets/css/wrapper.module.css'
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from './store/hooks/hooks';

function App() {
    return (
        <div className="App">
            <div className={wrapperStyle.container}>
                <NewsWidget />
            </div>
        </div>
    );
}

export default App;
