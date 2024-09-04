'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import React from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const FunnelChart: React.FC = () => {
  const options = {
    chart: {
      type: 'bar' as const,
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: '80%',
        isFunnel: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opt: any) {
        return `${opt.w.globals.labels[opt.dataPointIndex]}: ${val}`;
      },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 2,
        blur: 4,
        opacity: 0.5,
      },
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        colors: ['#333'],
      },
    },
    title: {
      text: 'Recruitment Funnel',
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
      },
    },
    xaxis: {
      categories: [
        'Sourced',
        'Screened',
        'Assessed',
        'HR Interview',
        'Technical',
        'Verify',
        'Offered',
        'Hired',
      ],
      labels: {
        style: {
          fontSize: '12px',
          colors: ['#333'],
        },
      },
    },
    legend: {
      show: false,
    },
    colors: ['#008FFB'],
  };

  const series = [
    {
      name: 'Funnel Series',
      data: [1380, 1100, 990, 880, 740, 548, 330, 200],
    },
  ];

  return (
    <Box sx={{
      bgcolor: '#f4f4f4',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      maxWidth: '700px',
      margin: '20px auto',
      textAlign: 'center'
    }}>
      <Chart options={options} series={series} type="bar" height={350} />
    </Box>
  );
}

export default FunnelChart;
