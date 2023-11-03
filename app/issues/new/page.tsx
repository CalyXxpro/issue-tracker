"use client";
import { Button, TextField, TextFieldInput } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

interface Issue {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<Issue>();
  return (
    <div className="max-w-xl">
      <form
        className="space-y-4"
        onSubmit={handleSubmit(async (data) => {
          await axios.post("/api/issues", data);
        })}
      >
        <TextField.Root>
          <TextFieldInput placeholder="Title" {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit new Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
