import { ApexOptions } from "apexcharts";
import { v4 as uuidv4 } from "uuid";

// session helpers
export const getSessionId = (): string => {
  if (typeof window !== "undefined") {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  }
  return uuidv4();
};

export const setSessionId = (sessionId: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("sessionId", sessionId);
  }
};

export const clearSessionId = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("sessionId");
  }
};

// funnel chart helpers
export const getFunnelOptions = (
  categories: string[],
  values: number[]
): ApexOptions => {
  return {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: "80%",
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
        fontSize: "12px",
        fontWeight: "bold",
        colors: ["#333"],
      },
    },
    title: {
      text: "Funnel visualization",
      align: "center",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333",
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#333"],
        },
      },
    },
    legend: {
      show: false,
    },
    colors: ["#008FFB"],
  };
};

export const processFunnelData = (
  data: ConversionFunnelResponse
): {
  sortedCategories: string[];
  sortedValues: number[];
} => {
  const categories = ["Searches", "Views", "Clicks", "Time Spent (mins)"];
  const values = [data.searches, data.views, data.clicks, data.totalTimeSpent];

  // Combine and sort data
  const dataPairs = categories
    .map((category, index) => ({
      category,
      value: values[index],
    }))
    .sort((a, b) => b.value - a.value);

  return {
    sortedCategories: dataPairs.map((pair) => pair.category),
    sortedValues: dataPairs.map((pair) => pair.value),
  };
};

// interaction trend chart helpers

const convertSecondsToMinutes = (seconds: number) =>
  parseFloat((seconds / 60).toFixed(2));

export const getInteractionTrendChartOptions = (
  hours: number[]
): ApexOptions => ({
  chart: {
    type: "bar",
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
      columnWidth: "80%",
    },
  },
  stroke: {
    width: 1,
    colors: ["#fff"],
  },
  title: {
    text: "Interaction Trend (last 24 hours)",
    align: "center",
    style: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#333",
    },
  },
  xaxis: {
    categories: hours,
    labels: {
      formatter: function (val: string) {
        return val;
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
    title: {
      text: "Counts", // Label for x-axis
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#333",
      },
    },
  },
  yaxis: {
    title: {
      text: "Hours", // Label for y-axis
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#333",
      },
    },
    labels: {
      formatter: function (value: number) {
        return `${value}`;
      },
      style: {
        fontSize: "12px",
        colors: ["#333"],
      },
    },
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return val + " ";
      },
    },
    theme: "dark", // Use theme for background color and text color
    style: {
      fontSize: "12px",
    },
  },
  fill: {
    opacity: 1,
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560"],
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
});

export const processInteractionTrendChartData = (data: InteractionTrend[]) => {
  const hours = data.map((item) => (item.hour + 7) % 24);

  return {
    series: [
      {
        name: "Searches",
        data: data.map((item) => item.searches) as number[],
      },
      {
        name: "Views",
        data: data.map((item) => item.views) as number[],
      },
      {
        name: "Clicks",
        data: data.map((item) => item.clicks) as number[],
      },
      {
        name: "Time Spent (mins)",
        data: data.map((item) =>
          convertSecondsToMinutes(item.time_spend)
        ) as number[],
      },
    ],
    hours,
  };
};

// most interacted products chart helpers

export const generateHeatmapOptions = (title: string): ApexOptions => {
  return {
    chart: {
      type: "heatmap",
      height: 450,
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 1,
              color: "#00A100",
              name: "Low",
            },
            {
              from: 2,
              to: 4,
              color: "#128FD9",
              name: "Moderate",
            },
            {
              from: 5,
              to: 10,
              color: "#FFB200",
              name: "High",
            },
            {
              from: 11,
              to: 100,
              color: "#FF0000",
              name: "Extreme",
            },
          ],
        },
      },
    },
    title: {
      text: `Most Interacted ${title} visualization`,
      align: "center",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333",
      },
    },
    xaxis: {
      type: "category",
      title: {
        text: "Interaction Types",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333",
        },
      },
    },
    yaxis: {
      title: {
        text: title, 
        style: {
          fontSize: "14px", 
          fontWeight: "bold",
          color: "#333",
        },
        offsetX: 10, 
      },
      labels: {
        show: true,
        style: {
          fontSize: "9px",
          colors: ["#333"],
        },
        offsetX: 5,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        colors: ["#333"],
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}`,
      },
    },
  };
};
