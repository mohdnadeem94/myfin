import { createSlice } from '@reduxjs/toolkit';

export const TickerSymbolSlice = createSlice({
    name : 'tickerSymbol',
    initialState:{
        stock_symbol:'AAPL'
    },
    reducers:{
        getSymbol:(state,action)=>{
            state.stock_symbol = action.payload
        }
    }
})

export const {getSymbol} = TickerSymbolSlice.actions

export const selectSymbol = (state)=>state.tickerSymbol.stock_symbol

export default TickerSymbolSlice.reducer