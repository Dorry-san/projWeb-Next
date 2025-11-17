"use server";

import { MediaType } from "@/generated/prisma";
import prisma from "@/src/lib/prisma";
import { redirect } from "next/navigation";

export async function createMediaAction(
  media: {
    type: MediaType;
    title: string;
    description: string | null;
    url: string;
  },
  theMedia: string,
) {
  try {
    await prisma.media.create({
      data: {
        type: media.type,
        title: media.title,
        description: media.description,
        url: media.url,
      },
    });
  } catch {
    return {
      error: "Error while creating the media.",
    };
  }
  redirect(`/${theMedia}`);
}

export async function updateMediaAction(
  id: number,
  media: {
    title: string;
    description: string | null;
  },
  theMedia: string,
) {
  try {
    await prisma.media.update({
      where: {
        id,
      },
      data: {
        title: media.title,
        description: media.description,
      },
    });
  } catch {
    return {
      error: "Error while updating the media.",
    };
  }
  redirect(`/${theMedia}`);
}

export async function deleteMediaAction(id: number) {
  await prisma.media.delete({
    where: {
      id,
    },
  });

  return {
    message: "Deleted !",
  };
}
