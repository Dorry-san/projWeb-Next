"use server";

import { redis } from "@/src/lib/redis";
import { redirect } from "next/navigation";

const DEFAULT_TTL = 2 * 60 * 60;

export async function createCitationAction(citation: {
  text: string;
  author: string;
}) {
  try {
    const id = await redis.incr("citation:next_id");
    const key = `citation:${id}`;

    const citationData = {
      id: id,
      author: citation.author,
      text: citation.text,
    };

    await redis.set(key, JSON.stringify(citationData), "EX", DEFAULT_TTL);

  } catch (error) {
    console.error(error);
    return { error: "Error while creating the citation." };
  }
  
  redirect("/citation");
}

export async function updateCitationAction(
  id: number,
  citation: {
    text: string;
    author: string;
  },
) {
  try {
    const key = `citation:${id}`;

    const rawData = await redis.get(key);
    if (!rawData) {
      return {
        error: "Citation not found or has expired.",
      };
    }

    const existingCitation = JSON.parse(rawData);

    const updatedCitation = {
      ...existingCitation,
      author: citation.author,
      text: citation.text,
    };

    await redis.set(key, JSON.stringify(updatedCitation));

  } catch (error) {
    console.error(error);
    return {
      error: "Error while updating the citation.",
    };
  }
  
  redirect("/citation");
}

export async function deleteCitationAction(id: number) {
  try {
    await redis.del(`citation:${id}`);
    return { message: "Deleted !" };
  } catch (error) {
    console.error(error);
    return { error: "Error while deleting the citation." };
  }
}

export async function getAllCitations() {
  try {
    const keys = await redis.keys("citation:*");
    
    const citationKeys = keys.filter(key => key !== "citation:next_id");

    if (citationKeys.length === 0) {
      return [];
    }

    const citations = await Promise.all(
      citationKeys.map(async (key) => {
        const rawData = await redis.get(key);
        const ttlTime = await redis.ttl(key);
        if (!rawData) return null;
        let citation = JSON.parse(rawData);
        return {
          ...citation,
          ttl: ttlTime, 
        };
      })
    );

    const validCitations = citations.filter(Boolean);

    return validCitations;

  } catch (error) {
    console.error("Erreur lors de la récupération des citations :", error);
    return [];
  }
}

export async function getOneCitation(id: number | string) {
  try {
    const key = `citation:${id}`;
    
    const rawData = await redis.get(key);

    if (!rawData) {
      return null;
    }

    return JSON.parse(rawData);

  } catch (error) {
    console.error(`Erreur lors de la récupération de la citation ${id} :`, error);
    return null;
  }
}