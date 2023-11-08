import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  return (
    <Flex align="center" gap="4">
      <Button color="gray" variant="soft">
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="soft">
        <ChevronLeftIcon />
      </Button>
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button color="gray" variant="soft">
        <ChevronRightIcon />
      </Button>
      <Button color="gray" variant="soft">
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
