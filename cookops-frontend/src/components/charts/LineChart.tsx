"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

const data: ChartData<"line"> = {
  labels: [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ],
  datasets: [
    {
      label: "Vendas (R$)",
      data: [1200, 1900, 1500, 2100, 2800, 3200, 2500],
      borderColor: "rgb(75, 85, 99)",
      backgroundColor: "rgba(75, 85, 99, 0.5)",
    },
  ],
};

export function LineChart() {
  return <Line options={options} data={data} />;
}
