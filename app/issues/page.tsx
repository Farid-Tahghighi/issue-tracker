import { IssueActions, Pagination } from "@/app/components";
import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import IssueTable, { columnNames } from "./_components/IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  type: string;
  page: string;
}

interface Props {
  searchParams: Promise<IssueQuery>;
}

const Issues = async ({ searchParams }: Props) => {
  const currentParams = await Promise.resolve(searchParams);

  const status = Object.values(Status).includes(currentParams.status)
    ? currentParams.status
    : undefined;
  const where = { status };

  const type = ["asc", "desc"].includes(currentParams.type)
    ? currentParams.type
    : undefined;

  const orderBy = columnNames.some((c) => c === currentParams.orderBy)
    ? { [currentParams.orderBy]: type }
    : undefined;

  let page = parseInt(currentParams.page || "1");
  const pageSize = 10;

  const issuesCount = await prisma.issue.count({ where });

  const pageCount = Math.ceil(issuesCount / pageSize);
  if (page > pageCount || page < 1) page = 1;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination currentPage={page} pageCount={pageCount} />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue List",
  description: "View all of project issues."
} 

export default Issues;
