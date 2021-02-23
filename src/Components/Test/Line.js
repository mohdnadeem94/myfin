import React from 'react'
import Chart from "react-google-charts";
function Line() {
    return (
        <div>
            <Chart
                width={'1000px'}
                height={'600px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['x', 'dogs'],
                    [0, 0],
                    [1, 10],
                    [2, 23],
                    [3, 17],
                    [4, 18],
                    [5, 9],
                    [6, 11],
                    [7, 27],
                    [8, 33],
                    [9, 40],
                    [10, 32],
                    [11, 35],
                ]}

                rootProps={{ 'data-testid': '3' }}
                />
        </div>
    )
}

export default Line
