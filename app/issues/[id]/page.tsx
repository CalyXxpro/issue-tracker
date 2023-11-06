import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box
        width={{ initial: "100%", sm: "max-content" }}
        mx={{ initial: "0", sm: "5" }}
      >
        <Flex direction="column" gap="5">
          <EditIssueButton id={issue.id} />
          <DeleteIssueButton />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
