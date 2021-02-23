import React,{useEffect,useState} from 'react'
import './MarketStock.css'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import axios from '../../axios';

function MarketStock({data}) {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    const [newsData,setNewsData] = useState('')
    const [timeData,setTimeData] = useState('')
    const [linkData,setLinkData] = useState('')
    useEffect(() => {
        async function fetchData() {
            const requestNews = await axios.get(`/api/v1/stocks/daily/stocknews/${data.ticker}`)
            if (requestNews.data[0])
            {setNewsData(requestNews.data[0][Object.keys(requestNews.data[0])[0]].title)
            setTimeData(Object.keys(requestNews.data[0])[0])
            setLinkData(requestNews.data[0][Object.keys(requestNews.data[0])[0]].link)}
            else{
                setNewsData('No News Regarding this stock currently...')
                setTimeData(' ')
                setLinkData(' ')
            }
        }
        fetchData()
    },[data.ticker])
    return (
        <div className='market_Stock'>
                <div className='market_StockTicName'>
                    <h5 className='market_StockTic' style={{backgroundColor:'#'+randomColor}}>{data.ticker}</h5>        
                    <div className='market_StockName'>
                        <h4>{data.companyName}</h4>
                    </div>
                </div>
                <div className='market_StockNewsBox'>
                    <p className='market_StockNews'>{newsData}  <a style={{color:'grey'}} target='_blank' href={linkData}>Read More..</a></p>
                    <br/>
                    <p>{timeData}</p>
                </div>
                <h4 className='market_StocPrice'>${data.price}</h4>
            <div className='market_StockPercentBox'>
                <div className={data.changesPercentage.includes('+')?'market_StockPercent green':'market_StockPercent red'}>
                    {data.changesPercentage.includes('+')?<ExpandLessIcon/>:<ExpandMoreIcon/>}
                    <h4>{data.changesPercentage.replace('(','').replace(')','').replace('+','').replace('-','')}</h4>
                </div>
                <AddCircleOutlineTwoToneIcon/>
            </div>
        </div>
    )
}

export default MarketStock

                    {/* <div className="market_StockNewsSenti">
                        <div className="market_StockNewsSentiBox">
                            <h4>Negative : </h4>
                            <p className='market_StockNewsSentiScore red'>0.1</p>
                        </div>
                        <div className="market_StockNewsSentiBox">
                            <h4>Neutal : </h4>
                            <p className='market_StockNewsSentiScore neutral'>0.0</p>
                        </div>
                        <div className="market_StockNewsSentiBox">
                            <h4>Positive :</h4>
                            <p className='market_StockNewsSentiScore green'>0.9</p>
                        </div>
                    </div> */}