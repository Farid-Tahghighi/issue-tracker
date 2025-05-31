import { IssueStatusBadge, Link } from "@/app/components";
import { Issue } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { PiArrowDown, PiArrowUp } from "react-icons/pi";
import { IssueQuery } from "../page";

interface Props {
  searchParams: Promise<IssueQuery>;
  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  const currentParams = await Promise.resolve(searchParams);
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell key={column.value} className={column.style}>
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
  );
};

const columns: { label: string; value: keyof Issue; style?: string }[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status", style: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", style: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
