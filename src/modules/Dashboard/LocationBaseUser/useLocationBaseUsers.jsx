import React from 'react'

export default function useLocationBaseUsers() {
  const series = [
    {
      name: 'Users',
      data: [1200, 2500, 2100, 3250, 2500, 12500, 2000, 500, 1800, 2800]
    }
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 280,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '6px',
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false,
    },
    xaxis: {
      categories: ['Sydney', 'Adelaide', 'Brisbane', 'Canberra', 'Melbourne', 'Hobart', 'Carnarvon', 'Darwin', 'Perth'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} users`;
        }
      }
    },
    grid: {
      strokeDashArray: 4,
      borderColor: 'rgba(247, 93, 52, 0.46)',
      strokeWidth: 6,
      yaxis: {
        lines: {
          show: true
        }
      }
    }
  };


  return {
    options,
    series
  }
}
