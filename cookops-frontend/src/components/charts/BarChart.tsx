"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const data: ChartData<"bar"> = {
  labels: [
    "X-Bacon",
    "Batata Frita",
    "X-Salada",
    "Refrigerante",
    "X-Tudo",
    "Milkshake",
    "Onion Rings",
  ],
  datasets: [
    {
      label: "Quantidade Vendida",
      data: [65, 59, 55, 48, 42, 38, 35],
      backgroundColor: "rgba(99, 102, 241, 0.5)",
    },
  ],
};

export function BarChart() {
  return <Bar options={options} data={data} />;
}
