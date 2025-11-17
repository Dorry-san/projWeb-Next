"use client";

import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
//import Form from "next/form";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { createMediaAction, updateMediaAction } from "./media.action";
import { useFormStatus } from "react-dom";
import { media, MediaType } from "@/generated/prisma";

export function MediaForm({
  media,
  mediaStr,
}: {
  media?: media;
  mediaStr: string;
}) {
  const onSubmit = async (FormData: FormData) => {
    let error: null | string = null;
    if (media) {
      const json = await updateMediaAction(
        media.id,
        {
          title: String(FormData.get("title")),
          description: String(FormData.get("description")),
        },
        media.type,
      );
      error = json.error;
    } else {
      const json = await createMediaAction(
        {
          type: mediaStr as MediaType,
          title: String(FormData.get("title")),
          description: String(FormData.get("description")),
          url: String(FormData.get("url")),
        },
        mediaStr,
      );
      error = json.error;
    }

    if (error) {
      alert(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{media ? "Update" : "Create"} media</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData) => {
            await onSubmit(formData);
          }}
          className="flex flex-col gap-2"
        >
          <Label>
            Titre
            <Input defaultValue={media?.title} name="title" />
          </Label>
          <Label>
            Description
            <Input defaultValue={media?.description ?? ""} name="description" />
          </Label>
          {!media && (
            <Label>
              Url
              <Input name="url" />
            </Label>
          )}
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? "Loading..." : "Subbit"}
    </Button>
  );
};
