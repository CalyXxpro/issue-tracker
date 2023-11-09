"use client";
import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, XAxis, YAxis, BarChart, Bar } from "recharts";
import React from "react";

interface Props {
  open: number;
  in_progress: number;
  closed: number;
}

const IssueChart = ({ open, in_progress, closed }: Props) => {
  const data: { label: string; value: number }[] = [
    { label: "Open Issues", value: open },
    { label: "In Progress Issues", value: in_progress },
    { label: "Closed Issues", value: closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
