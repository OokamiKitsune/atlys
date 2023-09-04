import React, { useEffect, useRef, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { Chart } from "chart.js/auto"; // Import from 'chart.js/auto'
import Layout from "../Layout";

const DashboardCharts: React.FC<{}> = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const built = [1, 52, 35, 85, 41, 50];
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    if (chart) {
      chart.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        const newChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6'],
            datasets: [
              {
                label: 'Products Built',
                data: [1, 52, 35, 85, 41, 50],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
              },
            ],
          },
        });
        setChart(newChart);
      }
    }

    // Clean up the chart instance when the component unmounts
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div>
      {/* Your page content goes here */}
      <FormControl>
        <div className="text-gray-500 font-medium mb-1">Select product</div>
        <Select value={""}>

        </Select>
      </FormControl>
      <div className="container mx-auto px-4 py-4 border text-4xl">
        <canvas ref={chartRef} width={400} height={400} />
      </div>
    </div>
  );
};

export default DashboardCharts;
