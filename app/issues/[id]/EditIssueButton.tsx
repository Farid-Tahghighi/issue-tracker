import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { PiNotePencilThin } from "react-icons/pi";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <PiNotePencilThin />
      <Link href={`/issue/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
