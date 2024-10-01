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
      ["Levies Income"]: 40000,
      ["Complex Expenses"]: 2400,
    },
    {
      name: "Feb",
      ["Levies Income"]: 3000,
      ["Complex Expenses"]: 1398,
    },
    {
      name: "Mar",
      ["Levies Income"]: 2000,
      ["Complex Expenses"]: 9800,
    },
    {
      name: "Apr",
      ["Levies Income"]: 2780,
      ["Complex Expenses"]: 3908,
    },
    {
      name: "May",
      ["Levies Income"]: 1890,
      ["Complex Expenses"]: 4800,
    },
    {
      name: "Jun",
      ["Levies Income"]: 2390,
      ["Complex Expenses"]: 3800,
    },
    {
      name: "Jul",
      ["Levies Income"]: 3490,
      ["Complex Expenses"]: 4300,
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
          bottom: 105,
        }}
      >
        <XAxis dataKey="name" />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="Complex Expenses"
          stroke="red"
          activeDot={{ r: 8 }}
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="Levies Income"
          stroke="lightgreen"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default IncomeExpenseChart;
