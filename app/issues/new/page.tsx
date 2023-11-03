"use client";
import {
  Button,
  Callout,
  Text,
  TextField,
  TextFieldInput,
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { createIssueSchema } from "@/app/Validationschemas";
import { useRouter } from "next/navigation";

type IssueSchema = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueSchema>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState<string>("");
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-4"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
          } catch (error) {
            console.log(error);
            setError("An Unexpected Error Occured");
          }
        })}
      >
        <TextField.Root>
          <TextFieldInput placeholder="Title" {...register("title")} />
        </TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button>Submit new Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
