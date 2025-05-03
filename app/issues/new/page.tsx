"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiCircleAlert } from "react-icons/ci";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type Issue = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  // Hooks
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Issue>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  // States
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  // Functions
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      setSubmitting(false);
      router.push("/issues");
    } catch (e) {
      setSubmitting(false);
      setError("An unexpected error happened." + e);
    }
  });
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Icon>
            <CiCircleAlert />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-xl space-y-2" onSubmit={onSubmit}>
        <TextField.Root placeholder="New Issue" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Add Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
