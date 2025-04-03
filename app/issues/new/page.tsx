"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="New Issue" />
      <SimpleMDE placeholder="Add Description" />
      <Button>Submit</Button>
    </div>
  );
};

export default NewIssuePage;
