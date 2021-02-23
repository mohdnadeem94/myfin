import React, { useState,useEffect } from 'react'
import './CompareList.css'
import {Button} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {stockNSymbols} from '../data_StockNSymbols'
import axios from '../../axios'
import LineChart from './LineChart';


function CompareList({tickerSymbolDays,dateXaxis,dataInitial}) {
    const differnce= (ary)=> {
        var newA = [];
        for (var i = 1; i < ary.length; i++) { 
        var eachValue = (ary[i] - ary[0])/ary[0]*100
        newA.push(Math.round(eachValue*100)/100)
        }
        return newA;
    }

    const [allSymbols,setAllsymbols] = useState(stockNSymbols)
    const [comparelist,setCompareList] = useState([])
    
    // let data={
    //     labels: dateXaxis.slice(1,dateXaxis.length),
    //     datasets: [], 
    // }
    let data =dataInitial

    useEffect(() => {
        for (const symbols of comparelist){
        async function fetchStock_CompareHPriceData() {
            const requestStock_HPrice = await axios.get(`/api/v1/stocks/price/close/${symbols.value}/${tickerSymbolDays}`)
            data['datasets'].push({
                label:`${symbols.name}`,
                data:differnce(requestStock_HPrice.data.reverse()),
                borderColor:`rgb(${Math.floor(Math.random() * 201)},${Math.floor(Math.random() * 201)},${Math.floor(Math.random() * 251)}`,
                fill:false
            },)
        }
        fetchStock_CompareHPriceData()
        }
        console.log(data)
    }, [tickerSymbolDays,comparelist,dateXaxis])

    const handleSymbolList =(symbol)=> {
        setAllsymbols(allSymbols.filter((el)=>el.value!==symbol.value))
        setCompareList([...comparelist,symbol])
    }
    
    const deleteHandler = (symbol)=>{
        setCompareList(comparelist.filter((el)=>el.value!==symbol.value))
    }
    
    return (
        <div className='compareList'>
            <div className="compareList_line">
                <LineChart data = {data} days = {tickerSymbolDays}/>
            </div>
            <div className="compareList_B">
            {
              comparelist.map((symbol)=>{
                  return (
                    <div className="compareListButton">
                        <Button className='deleteButton' key = {symbol.value} onClick={()=>deleteHandler(symbol)}>
                            {symbol.name}
                            <HighlightOffIcon/>
                        </Button> 
                    </div>
                  )
              })  
            }
            {
              allSymbols.map((symbol,index)=>{
                  return (
                    <div className="compareListButton">
                        <Button key = {symbol.value} onClick={()=>handleSymbolList(symbol)}>
                            {symbol.name}
                            <AddCircleOutlineIcon/>
                        </Button> 
                    </div>
                  )
              })  
            }
            </div>
            
        </div>
    )
}

export default CompareList
