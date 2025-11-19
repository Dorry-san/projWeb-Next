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
      <CardHeader className="text-4xl font-bold text-center">
        <CardTitle>Citation</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {citations.map((citations) => (
          <Card className="p-4 flex gap-4" key={citations.id}>
            <CardContent className="flex flex-col gap-2 flex-1">
              <p className="italic text-2xl">❝ {citations.text} ❞</p>
              <p>-- {citations.author}</p>
            </CardContent>
            <div className="flex flex-row gap-2 mt-auto">
              <Link
                href={`/citation/${citations.id}`}
                className={`${buttonVariants({
                  size: "sm",
                  variant: "outline",
                })} basis-1/2`}
              >
                Edite citation
              </Link>
              <DeleteCitationButton id={citations.id} />
            </div>
          </Card>
        ))}
      </CardContent>
      <CardContent className="flex flex-col gap-4">
        <Link
          href="/citation/new"
          className={buttonVariants({ size: "lg", variant: "outline" })}
        >
          Create citation
        </Link>
      </CardContent>
    </Card>
  );
}
