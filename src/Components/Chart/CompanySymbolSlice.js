import { createSlice } from '@reduxjs/toolkit';

export const CompanySymbolSlice = createSlice({
    name : 'companySymbol',
    initialState:{
        stock_symbol:'AAPL'
    },
    reducers:{
        getSymbol:(state,action)=>{
            state.stock_symbol = action.payload
        }
    }
})

export const {getSymbol} = CompanySymbolSlice.actions

export const selectSymbol = (state)=>state.companySymbol.stock_symbol

export default CompanySymbolSlice.reducer