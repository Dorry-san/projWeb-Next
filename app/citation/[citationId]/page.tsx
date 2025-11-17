import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";
import prisma from "@/src/lib/prisma";
import { CitationForm } from "../citation-form";

export default async function Page(props: {
  params: Promise<{
    citationId: string;
  }>;
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const params = await props.params;
  const citationId = params.citationId;

  const citaion = await prisma.citation.findFirst({
    where: {
      id: Number(params.citationId),
    },
  });

  if (!citaion) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>La citaion {citationId} n'éxiste pas.</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return <CitationForm citation={citaion} />;
}
