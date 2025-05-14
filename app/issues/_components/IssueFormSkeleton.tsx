import { Skeleton } from "@/app/components";
import { Box, Button, Spinner } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl space-y-2">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
      <Button>
        <Spinner />
      </Button>
    </Box>
  );
};

export default IssueFormSkeleton;
