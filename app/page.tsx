import { prisma } from "@/prisma/client";
import IssuesSummary from "./IssuesSummary";
// import LatestIssue from "./LatestIssue";

export default async function Home() {
  const open = await prisma.issue.count({where: {status: "OPEN"}});
  const closed = await prisma.issue.count({where: {status: "CLOSED"}});
  const inProgress = await prisma.issue.count({where: {status: "IN_PROGRESS"}});
  return <IssuesSummary open={open} inProgress={inProgress} closed={closed} />;
}
