import { MediaType } from "@/generated/prisma";
import { MediaForm } from "../media-form";
import Err from "@/src/components/badMedia";

export default async function Page({ params }: { params: { media: string } }) {
  if (!Object.values(MediaType).includes((await params).media as MediaType)) {
    return <Err media={(await params).media} />;
  }

  return <MediaForm mediaStr={(await params).media} />;
}
