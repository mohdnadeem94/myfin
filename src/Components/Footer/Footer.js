import React from 'react'
import './Footer.css'
import StockCard from './StockCard'
import Carousel from "react-elastic-carousel";
import {stockNSymbols} from '../data_StockNSymbols'

function Footer() {
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 370, itemsToShow: 2, itemsToScroll: 1 },
        { width: 600, itemsToShow: 3, itemsToScroll: 3 },
        { width: 800, itemsToShow: 3 },
        { width: 900, itemsToShow: 5 ,itemsToScroll: 4 },
        { width: 1200, itemsToShow: 6 ,itemsToScroll: 5 },
        ];
    return (
        <div className='footer'>
            <h3>Discover More Stocks</h3>
            <div className='footer_Stock'>
                <Carousel breakPoints={breakPoints}>
                    {Object.keys(stockNSymbols).map((key,index)=>{
                        return(
                            <StockCard key={index} tickerData={stockNSymbols[key]}/>
                        )
                    })
                    }
                </Carousel>
            </div>
        </div>
    )
}

export default Footer

{/* <h3>Recently Searched</h3>
<div className='footer_Stock'>
    <StockCard/>
    <StockCard/>
    <StockCard/>
    <StockCard/>
    <StockCard/>
    <StockCard/>
    <StockCard/>
</div> */}