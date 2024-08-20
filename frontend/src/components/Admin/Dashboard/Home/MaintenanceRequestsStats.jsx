import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell, // Add this import
} from "recharts";

const data = [
  {
    name: "Opened",
    amt: 56,
    fill: "#82ca9d", // Green
  },
  {
    name: "In Progress",
    amt: 119,
    fill: "#FFA500", // Orange
  },
  {
    name: "Closed",
    amt: 230,
    fill: "#FF4500", // Red
  },
];

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={700}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barCategoryGap="10%" // Adjust the gap between bars
        >
          <XAxis dataKey="name" />

          <Tooltip />

          <Bar dataKey="amt">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
