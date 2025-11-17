import { buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import prisma from "@/src/lib/prisma";
import Link from "next/link";
import { DeleteMediaButton } from "./delete-mediai-button";
import { MediaType } from "@/generated/prisma";
import Err from "@/src/components/badMedia";
import Image from "next/image";

export default async function Page({ params }: { params: { media: string } }) {
  const media = (await params).media;

  if (!Object.values(MediaType).includes(media as MediaType)) {
    return <Err media={media} />;
  }

  const mediaUpperAt0 = media.charAt(0).toUpperCase() + media.slice(1);
  let mediaCreate = "";

  if (media == "gif") {
    mediaCreate = "Crée un nouveau " + media;
  } else {
    mediaCreate = "Crée une nouvelle " + media;
  }

  const medias = await prisma.media.findMany({
    where: {
      type: media as MediaType,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{mediaUpperAt0}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {medias.map((theMedia) => (
          <Card className="p-4 flex items-start gap-4" key={theMedia.id}>
            <div className="flex flex-col gap-2 flex-1">
              <p>{theMedia.title}</p>
              {theMedia.type == "photo" && (
                <Image
                  src={theMedia.url}
                  width={500}
                  height={500}
                  alt="img media"
                />
              )}
              <p>{theMedia.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              <DeleteMediaButton id={theMedia.id} />
              <Link
                href={`/${media}/${theMedia.id}`}
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
        <Link
          href={`/${media}/new`}
          className={buttonVariants({ size: "lg", variant: "outline" })}
        >
          {mediaCreate}
        </Link>
      </CardContent>
    </Card>
  );
}
