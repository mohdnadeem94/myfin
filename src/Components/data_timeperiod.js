export const timeValue =[
        {'name':'5 days',value:5},
        {'name':'10 days','value':10},
        {'name':'1 month','value':22},
        {'name':'6 months','value':138},
        {'name':'1 year','value':270},
        {'name':'Max','value':100000}
    ]

export const options = {
                legend: {display: false},
                title:{text:'Demo App',display:false},
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
                                maxTicksLimit:11,
                                beginAtZero:false,
                                maxRotation:0
                            }
                        }
                    ]
                },
            }