"use client";

import { Flex, Button, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  PiCaretDoubleLeftLight,
  PiCaretDoubleRightLight,
  PiCaretLeftLight,
  PiCaretRightLight,
} from "react-icons/pi";

interface Props {
  itemsCount: number; // All the items to be paginated
  currentPage: number;
  pageSize: number; // Amount of items in a page
}

const Pagination = ({ pageSize, currentPage, itemsCount }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params);
  };

  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount <= 1) return null;

  // Calculate visible page range (showing up to 10 pages at a time)
  const visiblePageCount = 10;
  let startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
  const endPage = Math.min(pageCount, startPage + visiblePageCount - 1);

  // Adjust startPage if we're at the end
  startPage = Math.max(1, endPage - visiblePageCount + 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <Flex align="center" gap="2" direction="column">
      <Flex align="center" gap="2">
        <Button
          variant="soft"
          disabled={currentPage === 1}
          onClick={() => changePage(1)}
        >
          <PiCaretDoubleLeftLight />
        </Button>
        <Button
          variant="soft"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <PiCaretLeftLight />
        </Button>
        <Flex align="center" gap="1">
          {pages.map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "solid" : "soft"}
              onClick={() => changePage(page)}
            >
              {page}
            </Button>
          ))}
        </Flex>
        <Button
          variant="soft"
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          <PiCaretRightLight />
        </Button>
        <Button
          variant="soft"
          disabled={currentPage === pageCount}
          onClick={() => changePage(pageCount)}
        >
          <PiCaretDoubleRightLight />
        </Button>
      </Flex>
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
    </Flex>
  );
};

export default Pagination;
