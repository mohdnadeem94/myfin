import React,{useState} from 'react'
import './StockCard.css'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import axios from '../../axios';

function StockCard({tickerData}) {
    var randomColor1 = Math.round(Math.random()*150)
    var randomColor2 = Math.round(Math.random()*80)
    var randomColor3 = Math.round(Math.random()*280)
    const [tickerDataClose, settickerDataClose] = useState([])
    React.useEffect(() => {
        async function fetchData() {
            const requestCurrentPrice = await axios.get(`/api/v1/stocks/current/${tickerData.value}`);
            settickerDataClose(requestCurrentPrice.data)
        }
        fetchData()
    },[tickerData.value])

    return (
        <div className='stock_card'>
            <h5 className='stock_cardTicker' style={{backgroundColor:`rgb(${randomColor1},${randomColor2},${randomColor3})`}}>{tickerData.value}</h5>        
            <div className='stock_cardName'>
                <h4>{tickerData.name}</h4>
            </div>
            {tickerDataClose[1]?<h3 className='stock_cardPrice'>💰 {tickerDataClose[1].Close}</h3>:<h3 className='stock_cardPrice'>Updating</h3>}
            {tickerDataClose[1]?
            <div className='stock_cardPercentBox'>
                <div className={tickerDataClose[1].Close-tickerDataClose[0].Close>0?'topRight_PriceChange topRight_PriceChange_High':'topRight_PriceChange topRight_PriceChange_Low'}>
                    {tickerDataClose[1].Close-tickerDataClose[0].Close>0?<ExpandLessIcon/>:<ExpandMoreIcon/>}
                    <h3>{Math.abs(Math.round((tickerDataClose[1].Close-tickerDataClose[0].Close)*100)/100)}</h3>
                </div>
                <AddCircleOutlineTwoToneIcon/>
            </div>:''}
        </div>
    )
}

export default StockCard
// className='stock_cardPercent Ֆ'  