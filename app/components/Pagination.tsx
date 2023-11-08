"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);

  const setPage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push("?" + params.toString());
  };

  if (pageCount === 1) return null;

  return (
    <Flex align="center" gap="4">
      <Button
        color="gray"
        variant="soft"
        onClick={() => setPage(1)}
        disabled={currentPage == 1}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage == 1}
      >
        <ChevronLeftIcon />
      </Button>
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage == pageCount}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => setPage(pageCount)}
        disabled={currentPage == pageCount}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
