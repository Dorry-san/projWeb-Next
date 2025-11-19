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
      <CardHeader className="text-4xl font-bold text-center">
        <CardTitle>{mediaUpperAt0}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {medias.map((theMedia) => (
          <Card className="p-4 flex gap-4" key={theMedia.id}>
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-center">
                {theMedia.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(theMedia.type == "photo" || theMedia.type == "gif") && (
                <img
                  className="mx-auto max-w-150 h-auto rounded-lg"
                  src={`/api/media?file=${theMedia.url}`}
                  alt="img media"
                />
              )}
              {theMedia.type == "video" && (
                <video controls className="mx-auto max-w-150 h-auto rounded-lg">
                  <source
                    src={`/api/media?file=${theMedia.url}`}
                    type="video/mp4"
                  />
                </video>
              )}
            </CardContent>
            <CardContent className="text-2xl">
              <p className="text-center italic">{theMedia.description}</p>
            </CardContent>
            <div className="flex flex-row gap-2 mt-auto">
              <Link
                href={`/${media}/${theMedia.id}`}
                className={`${buttonVariants({
                  size: "sm",
                  variant: "outline",
                })} basis-1/2`}
              >
                Modifier {media}
              </Link>
              <DeleteMediaButton id={theMedia.id} />
            </div>
          </Card>
        ))}
      </CardContent>
      <CardContent className="flex flex-col gap-4">
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
