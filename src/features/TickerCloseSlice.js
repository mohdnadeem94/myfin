import { createSlice } from '@reduxjs/toolkit';
 
export const TickerCloseSlice = createSlice({
    name : 'tickerClose',
    initialState:{
        stockClose:[
            {Close:123},
            {Close:123},
        ]
    },
    reducers:{
        getClose:(state,action)=>{
            state.stockClose =action.payload
        }
    }
})

export const {getClose} = TickerCloseSlice.actions

export const selectClose = (state)=>state.tickerClose.stockClose

export default TickerCloseSlice.reducer