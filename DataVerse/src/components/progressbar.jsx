import React from 'react';
import ReactECharts from 'echarts-for-react';

const ProgressBar = ({ progress, label, width, containerHeight, containerWidth }) => {
  const option = {
    xAxis: {
      max: 100,
      show: false
    },
    yAxis: {
      type: 'category',
      show: false
    },
    series: [
      {
        type: 'bar',
        data: [progress],
        showBackground: true,
        backgroundStyle: {
          color: '#E0E0E0',
          borderRadius: [10, 10, 10, 10]
        },
        itemStyle: {
          color: '#2D9CDB',
          borderRadius: [10, 10, 10, 10]
        },
        barWidth: width,
        label: {
          show: label,
          position: 'inside',
          formatter: '{c}%',
          color: '#fff',
          fontWeight: 'bold'
        }
      }
    ],
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  };

  return <ReactECharts option={option} style={{ height: containerHeight, width: containerWidth }} />;
};



export default ProgressBar;
