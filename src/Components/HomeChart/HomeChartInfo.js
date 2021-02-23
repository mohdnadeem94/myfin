import React from 'react'
import './HomeChartInfo.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {useSelector} from 'react-redux'
// import {selectSymbol} from '../../features/TickerSymbolSlice'
import {selectClose} from '../../features/TickerCloseSlice'

function HomeChartInfo({companyInfo}) {

    // const tickerSymbol = useSelector(selectSymbol)
    const tickerClose = useSelector(selectClose)

    function ConvertingNumbers (labelValue) {
        // Nine Zeroes for Billions
        return Math.abs(Number(labelValue)) >= 1.0e+12
        ? Math.round((Math.abs(Number(labelValue)) / 1.0e+12)*100)/100 + " Trillion"
        :Math.abs(Number(labelValue)) >= 1.0e+9
        ? Math.round((Math.abs(Number(labelValue)) / 1.0e+9)*100)/100 + " Billion"
        // Six Zeroes for Millions 
        : Math.abs(Number(labelValue)) >= 1.0e+6
        ?  Math.round((Math.abs(Number(labelValue)) / 1.0e+6)*100)/100 + " Million"
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3
        ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"
        : Math.abs(Number(labelValue));
    }

    return (
        <div className="homeChart_ChartInfo">
            <div className='homechartinfo_name'>
                <img src={companyInfo.logo_url} alt=""/>
                <h4>{companyInfo.longName}</h4>
            </div>
            <div className="topRight_Price">
                <h1>${Math.round(tickerClose[Object.keys(tickerClose).length-1].Close*100)/100}</h1>
                <div className={tickerClose[1].Close-tickerClose[0].Close>0?'topRight_PriceChange topRight_PriceChange_High':'topRight_PriceChange topRight_PriceChange_Low'}>
                    {tickerClose[1].Close-tickerClose[0].Close>0?<ExpandLessIcon/>:<ExpandMoreIcon/>}
                    <h3>{Math.abs(Math.round((tickerClose[1].Close-tickerClose[0].Close)*100)/100)}</h3>
                </div>
            </div>
            <h3>{companyInfo.industry}</h3>
            <div className="topRight_HiLo">
                <h4>Day 
                <p className="topRight_HiLoText" >High - Low</p>
                </h4>
                <h3 className='topRight_Low'>{Math.round(tickerClose[1].Low*100)/100}</h3>
                <h3 className='topRight_Hi'>{Math.round(tickerClose[1].High*100)/100}</h3>
            </div>
            <div className="topRight_HiLo">
                <h4>Year
                <p className="topRight_HiLoText" >High - Low</p>
                </h4>
                <h3 className='topRight_Low'>{Math.round(companyInfo.fiftyTwoWeekLow*100)/100}</h3>
                <h3 className='topRight_Hi'>{Math.round(companyInfo.fiftyTwoWeekHigh*100)/100}</h3>
            </div>
            
            <h4>Market Cap : {ConvertingNumbers(companyInfo.marketCap)}</h4>
            <h4>Avg Volume : {ConvertingNumbers(companyInfo.regularMarketVolume)}</h4>
            <h4>Dividend Yield : {`${Math.round((companyInfo.dividendYield*100)*100)/100} %`}</h4>
            <h5>{`${companyInfo.city}, ${companyInfo.state}`}</h5>
        </div>
    )
}

export default HomeChartInfo
