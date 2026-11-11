"use server";

import { MediaType } from "@/generated/prisma";
import prisma from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const DATA_DIRECTORY = "/data";


export async function createMediaAction(
  media: {
    type: MediaType;
    title: string;
    description: string | null;
    file: File;
  },
  theMedia: string,
) {
  const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".mp4", ".webm"];
  const extension = path.extname(media.file.name).toLowerCase();

  if (!(media.file instanceof File) || media.file.size === 0) {
    return {
      error: "No file provided.",
    };
  }
  if (!allowedExtensions.includes(extension)) {
    return {
      error: "Invalid file type.",
    };
  }

  try {
    const url = await saveMediaFile(media.type, media.file);

    await prisma.media.create({
      data: {
        type: media.type,
        title: media.title,
        description: media.description,
        url,
      },
    });
  } catch {
    return {
      error: "Error while creating the media.",
    };
  }
  redirect(`/${theMedia}`);
}

async function saveMediaFile(mediaType: MediaType, file: File) {
  const extension = path.extname(file.name).toLowerCase();
  const directory = path.join(DATA_DIRECTORY, mediaType);
  const filename = `${randomUUID()}${extension}`;
  const filePath = path.join(directory, filename);

  await mkdir(directory, { recursive: true });
  await writeFile(filePath, Buffer.from(await file.arrayBuffer()));

  return `${mediaType}/${filename}`;
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
  const media = await prisma.media.findUnique({
    where: {
      id,
    },
  });
  if (!media) {
    return {
      error: "Media not found.",
    };
  }

  await prisma.media.delete({
    where: {
      id,
    },
  });

  try {
    await deleteMediaFile(media.url);
  } catch (error) {
    console.error("Failed to delete media file:", media.url, error);
  }

  return {
    message: "Deleted !",
  };
}

async function deleteMediaFile(relativePath: string) {
  const dataRoot = path.resolve(DATA_DIRECTORY);
  const filePath = path.resolve(dataRoot, relativePath);

  if (!filePath.startsWith(dataRoot + path.sep)) {
    return;
  }

  try {
    await unlink(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }
}
