import { prisma } from "@/prisma/client";
import IssuesSummary from "./IssuesSummary";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssue from "./LatestIssue";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssuesSummary closed={closed} open={open} inProgress={inProgress} />
        <IssueChart closed={closed} open={open} inProgress={inProgress} />
      </Flex>
      <LatestIssue />
    </Grid>
  );
}
