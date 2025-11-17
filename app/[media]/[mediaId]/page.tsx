import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";
import prisma from "@/src/lib/prisma";
import { MediaForm } from "../media-form";
import { MediaType } from "@/generated/prisma";
import Err from "@/src/components/badMedia";

export default async function Page({
  params,
}: {
  params: { media: string; mediaId: string };
}) {
  const mediaStr = (await params).media;
  const mediaId = (await params).mediaId;

  if (!Object.values(MediaType).includes(mediaStr as MediaType)) {
    return <Err media={mediaStr} />;
  }

  const media = await prisma.media.findFirst({
    where: {
      id: Number(mediaId),
    },
  });

  if (!media) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>La citaion {mediaId} n'éxiste pas.</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return <MediaForm media={media} mediaStr={mediaStr} />;
}
