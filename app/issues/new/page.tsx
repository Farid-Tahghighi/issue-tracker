"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";

interface Issue {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<Issue>();
  const router = useRouter();
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <TextField.Root placeholder="New Issue" {...register("title")} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Add Description" {...field} />
        )}
      />

      <Button>Submit</Button>
    </form>
  );
};

export default NewIssuePage;
