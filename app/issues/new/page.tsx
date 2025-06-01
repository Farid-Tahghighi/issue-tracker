"use client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { Issue } from "@prisma/client";
import { Metadata } from "next";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = ({ issue }: { issue?: Issue }) => {
  return <IssueForm issue={issue} />;
};

export const metadata: Metadata = {
  title: "Submit a new issue",
  description: "Submit a new issue in the project",
};

export default NewIssuePage;
