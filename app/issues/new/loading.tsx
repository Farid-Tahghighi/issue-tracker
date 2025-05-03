import Spinner from "@/app/components/Spinner";
import { Box, Button } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
