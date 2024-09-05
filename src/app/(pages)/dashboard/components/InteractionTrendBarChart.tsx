import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const InteractionTrendBarChart: React.FC<{ data: InteractionTrend[] }> = ({
  data,
}) => {
  console.log(data, "InteractionTrend");
  const options = {
    chart: {
      type: "bar" as const,
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: "14px",
              fontWeight: 900,
              color: "#333",
            },
          },
        },
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    title: {
      text: "Fiction Books Sales",
      align: "center",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333",
      },
    },
    xaxis: {
      categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
      labels: {
        formatter: function (val: string) {
          return val + "K";
        },
        style: {
          fontSize: "12px",
          colors: ["#333"],
        },
      },
      axisBorder: {
        show: true,
        color: "#333",
      },
      axisTicks: {
        show: true,
        color: "#333",
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#333"],
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + "K";
        },
      },
      theme: "dark",
      style: {
        fontSize: "12px",
        background: "#333",
        color: "#fff",
      },
    },
    fill: {
      opacity: 1,
      colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
      labels: {
        colors: "#333",
        useSeriesColors: true,
      },
    },
  };

  const series = [
    {
      name: "Marine Sprite",
      data: [44, 55, 41, 37, 22, 43, 21],
    },
    {
      name: "Striking Calf",
      data: [53, 32, 33, 52, 13, 43, 32],
    },
    {
      name: "Tank Picture",
      data: [12, 17, 11, 9, 15, 11, 20],
    },
    {
      name: "Bucket Slope",
      data: [9, 7, 5, 8, 6, 9, 4],
    },
    {
      name: "Reborn Kid",
      data: [25, 12, 19, 32, 25, 24, 10],
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#f4f4f4",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "800px",
        margin: "20px auto",
      }}
    >
      <Chart options={options} series={series} type="bar" height={400} />
    </Box>
  );
};

export default InteractionTrendBarChart;
