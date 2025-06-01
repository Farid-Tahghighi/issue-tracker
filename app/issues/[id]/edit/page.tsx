import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import EditIssueForm from "./EditIssueForm";
import { Metadata } from "next";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return <EditIssueForm issue={issue} />;
};

export const metadata: Metadata = {
  title: "Edit Issue",
  description: "Edit the selected issue.",
};

export default EditIssuePage;
