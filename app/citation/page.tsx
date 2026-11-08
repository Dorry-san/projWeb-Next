import { buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Link from "next/link";
import { DeleteCitationButton } from "./delete-citation-button";
import { getAllCitations } from "./citations.action";

function formatTTL(sec: number) {
  if (sec < 60) {
    return `Expire dans ${sec}s`;
  }
  if (sec < 3600){
    return `Expire dans ${Math.floor(sec / 60)}m`;
  }
  else{
    return `Expire dans ${Math.floor(sec / 3600)}h`;
  }
}

export default async function Page() {
  const citations = await getAllCitations();

  return (
    <Card>
      <CardHeader className="text-4xl font-bold text-center">
        <CardTitle>Citation</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {citations.map((citation) => (
          <Card className="p-4 flex gap-4" key={citation.id}>
            <CardContent className="flex flex-col gap-2 flex-1 p-0">
              <p className="italic text-2xl">❝ {citation.text} ❞</p>
              <p className="text-muted-foreground">-- {citation.author}</p>
              
              {/* Affichage du TTL */}
              <span className="text-xs text-red-500 font-medium mt-2">
                {formatTTL(citation.ttl)}
              </span>
            </CardContent>
            <div className="flex flex-row gap-2 mt-auto">
              <Link
                href={`/citation/${citation.id}`}
                className={`${buttonVariants({
                  size: "sm",
                  variant: "outline",
                })} basis-1/2`}
              >
                Modifier citation
              </Link>
              <DeleteCitationButton id={citation.id} />
            </div>
          </Card>
        ))}
      </CardContent>
      <CardContent className="flex flex-col gap-4">
        <Link
          href="/citation/new"
          className={buttonVariants({ size: "lg", variant: "outline" })}
        >
          Créer une nouvelle citation
        </Link>
      </CardContent>
    </Card>
  );
}