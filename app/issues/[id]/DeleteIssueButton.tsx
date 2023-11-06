"use client";
import { AlertDialog, Flex } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Spinner } from "@/app/components";

const DeleteIssueButton = ({ id }: { id: number }) => {
  const [error, setError] = useState<boolean>(false);
  const [isDeleting, setDeleting] = useState<boolean>(false);
  const router = useRouter();

  const deleteIssue = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/issues/" + id.toString());
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this event? This action cannot be
            reversed.
          </AlertDialog.Description>
          <Flex gap="3" mt="4">
            <AlertDialog.Action>
              <Button onClick={deleteIssue} color="red">
                Delete Issue
              </Button>
            </AlertDialog.Action>
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft">
                Cancel
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            There was an error deleting this issue.
          </AlertDialog.Description>
          <AlertDialog.Cancel>
            <Button
              mt="4"
              color="gray"
              variant="soft"
              onClick={() => setError(false)}
            >
              Ok
            </Button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
