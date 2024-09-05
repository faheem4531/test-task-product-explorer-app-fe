import { v4 as uuidv4 } from "uuid";
import { ApexOptions } from "apexcharts";

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
  const categories = ["Searches", "Views", "Clicks", "Time Spent"];
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
