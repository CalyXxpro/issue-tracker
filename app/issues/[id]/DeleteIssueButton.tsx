"use client";
import { AlertDialog, AlertDialogTitle, Flex } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import React from "react";

const DeleteIssueButton = () => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this event? This action cannot be
          reversed.
        </AlertDialog.Description>
        <Flex gap="3" mt="4">
          <AlertDialog.Action>
            <Button color="red">Delete Issue</Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
