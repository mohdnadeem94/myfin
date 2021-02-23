import { configureStore } from '@reduxjs/toolkit';
import getSymbolReducer from  '../features/TickerSymbolSlice'
import getClosePriceReducer from '../features/TickerCloseSlice'
import getCompanySymbolReducer from '../Components/Chart/CompanySymbolSlice'

const store = configureStore({
    reducer:{
        tickerSymbol : getSymbolReducer,
        tickerClose  : getClosePriceReducer,
        companySymbol : getCompanySymbolReducer
    }
})

export default store