import { buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Link from "next/link";
import { prisma } from "@/src/lib/prisma";
import { DeleteCitationButton } from "./delete-citation-button";

export default async function Page() {
  const citations = await prisma.citation.findMany({
    orderBy: {
      CreatedAt: "desc",
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>URL : /admin</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {citations.map((citations) => (
          <Card className="p-4 flex items-start gap-4" key={citations.id}>
            <div className="flex flex-col gap-2 flex-1">
              <p>{citations.text}</p>
              <p>-- {citations.author}</p>
            </div>
            <DeleteCitationButton id={citations.id} />
          </Card>
        ))}
        <Link
          href="/admin/citation/new"
          className={buttonVariants({ size: "lg", variant: "outline" })}
        >
          Create citation
        </Link>
      </CardContent>
    </Card>
  );
}
