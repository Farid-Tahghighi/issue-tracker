import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import EditIssueForm from "./EditIssueForm";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) notFound();
  return <EditIssueForm issue={issue} />;
};

export const metadata: Metadata = {
  title: "Edit Issue",
  description: "Edit the selected issue.",
};

export default EditIssuePage;
