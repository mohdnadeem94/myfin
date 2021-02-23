import {Line} from 'react-chartjs-2';
import React,{useEffect,useState} from 'react'

function LineChart({data,days}) {

    const [time, setTime] = useState(Date.now());

    useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 100);
    return () => {
        clearInterval(interval);
    };
}, [data]);
    return (
        <div>
            <Line data={data}
            options={{
                legend: {display: true},
                title:{text:'Compare',display:false},
                elements: {
                    line: {
                        tension: 0// disables bezier curves
                    }
                },
                scales:{
                    yAxes:[
                        {
                            gridLines:{
                                display:false
                            },
                            ticks:{
                                autoSkip:true,
                                beginAtZero:false
                            }
                        }
                    ],
                    xAxes:[
                        {
                            gridLines:{
                                display:false
                            },
                            ticks:{
                                autoSkip:true,
                                maxTicksLimit:10,
                                beginAtZero:false,
                                maxRotation:0
                            }
                        }
                    ]
                },
            }}/>
        </div>
    )
}

export default LineChart
