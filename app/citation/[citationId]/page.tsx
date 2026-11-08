import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";
import prisma from "@/src/lib/prisma";
import { CitationForm } from "../citation-form";
import { getOneCitation } from "../citations.action";


export default async function Page(props: {
  params: Promise<{
    citationId: string;
  }>;
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const params = await props.params;
  const citationId = params.citationId;

  const citaion = await getOneCitation(params.citationId);

  if (!citaion) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>La citation {citationId} n'éxiste pas ou a expiré.</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return <CitationForm citation={citaion} />;
}
