import { Skeleton, Spinner } from "@/app/components";
import { Box, Button } from "@radix-ui/themes";

const NewIssueLoadingPage = () => {
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

export default NewIssueLoadingPage;
