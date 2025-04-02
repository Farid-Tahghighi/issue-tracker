"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="New Issue" />
      <TextArea placeholder="Add Description" />
      <Button>Submit</Button>
    </div>
  );
};

export default NewIssuePage;
