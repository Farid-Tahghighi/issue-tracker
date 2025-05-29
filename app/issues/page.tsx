import { IssueActions, IssueStatusBadge, Link } from "@/app/components";
import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { PiArrowUp } from "react-icons/pi";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
}

const columns: { label: string; value: keyof Issue; style?: string }[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status", style: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", style: "hidden md:table-cell" },
];

const Issues = async ({ searchParams }: Props) => {
  const currentParams = await Promise.resolve(searchParams);
  const statuses = Object.values(Status);
  const status = statuses.includes(currentParams.status)
    ? currentParams.status
    : undefined;
  const issues = await prisma.issue.findMany({
    where: { status },
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
                    query: { ...currentParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === currentParams.orderBy && (
                  <PiArrowUp className="inline" />
                )}
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
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Issues;
