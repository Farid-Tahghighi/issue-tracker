import { IssueStatusBadge } from "@/app/components";
import { prisma } from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PiNotePencilThin } from "react-icons/pi";
import ReactMarkdown from "react-markdown";
interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  // if (typeof params.id !== "number") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.description}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{issue.createdAt.toDateString()}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <PiNotePencilThin />
          <Link href={`/issue/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
