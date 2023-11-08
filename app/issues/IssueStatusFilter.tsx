"use client";
import React from "react";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";

const IssueStatusFilter = () => {
  const statuses: { label: string; status?: Status }[] = [
    { label: "All" },
    { label: "Open", status: "OPEN" },
    { label: "In Progress", status: "IN_PROGRESS" },
    { label: "Closed", status: "CLOSED" },
  ];
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status === "none" ? "" : `?status=${status}`;
        router.push("/issues" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by Status..." />
      <Select.Content>
        <Select.Group>
          {statuses.map((status) => (
            <Select.Item
              key={status.label}
              value={status.status ? status.status : "none"}
            >
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
