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
        <CardTitle>Citation</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {citations.map((citations) => (
          <Card className="p-4 flex items-start gap-4" key={citations.id}>
            <div className="flex flex-col gap-2 flex-1">
              <p>{citations.text}</p>
              <p>-- {citations.author}</p>
            </div>
            <div className="flex flex-col gap-2">
              <DeleteCitationButton id={citations.id} />
              <Link
                href={`/citation/${citations.id}`}
                className={buttonVariants({
                  size: "sm",
                  variant: "outline",
                })}
              >
                Edite citation
              </Link>
            </div>
          </Card>
        ))}
      </CardContent>
      <Link
        href="/citation/new"
        className={buttonVariants({ size: "lg", variant: "outline" })}
      >
        Create citation
      </Link>
    </Card>
  );
}
