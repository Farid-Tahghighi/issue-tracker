import {
  IssueActions,
  IssueStatusBadge,
  Link,
  Pagination,
} from "@/app/components";
import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { PiArrowDown, PiArrowUp } from "react-icons/pi";

interface Props {
  searchParams: Promise<{
    status: Status;
    orderBy: keyof Issue;
    type: string;
    page: string;
  }>;
}

const columns: { label: string; value: keyof Issue; style?: string }[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status", style: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", style: "hidden md:table-cell" },
];

const Issues = async ({ searchParams }: Props) => {
  const currentParams = await Promise.resolve(searchParams);

  const status = Object.values(Status).includes(currentParams.status)
    ? currentParams.status
    : undefined;
  const where = { status };

  const type = ["asc", "desc"].includes(currentParams.type)
    ? currentParams.type
    : undefined;

  const orderBy = columns.some((c) => c.value === currentParams.orderBy)
    ? { [currentParams.orderBy]: type }
    : undefined;

  let page = parseInt(currentParams.page || "1");
  const pageSize = 10;

  const issuesCount = await prisma.issue.count({ where });

  const pageCount = Math.ceil(issuesCount / pageSize);
  if(page > pageCount || page < 1) page = 1;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <div>
      <div className="mb-3">
        <IssueActions />
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.style}
              >
                <NextLink
                  href={{
                    query: {
                      ...currentParams,
                      orderBy: column.value,
                      type: currentParams.type === "asc" ? "desc" : "asc",
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === currentParams.orderBy &&
                  (currentParams.type === "asc" ? (
                    <PiArrowUp className="inline" />
                  ) : (
                    currentParams.type === "desc" && (
                      <PiArrowDown className="inline" />
                    )
                  ))}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="md:hidden block">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={page}
        pageCount={pageCount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Issues;
