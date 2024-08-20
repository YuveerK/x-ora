import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const IncomeExpenseChart = () => {
  const data = [
    {
      name: "Jan",
      uv: 40000,
      pv: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Jul",
      uv: 3490,
      pv: 4300,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 80,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="red"
          activeDot={{ r: 8 }}
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="lightgreen"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default IncomeExpenseChart;
