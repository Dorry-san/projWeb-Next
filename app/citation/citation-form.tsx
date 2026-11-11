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
import { createCitationAction, updateCitationAction } from "./citations.action";
import { useFormStatus } from "react-dom";
import { Citation } from "@/src/types/citation";

export function CitationForm(props: { citation?: Citation }) {
  const onSubmit = async (FormData: FormData) => {
    let error: null | string = null;
    if (props.citation) {
      const json = await updateCitationAction(props.citation.id, {
        author: String(FormData.get("author")),
        text: String(FormData.get("text")),
      });
      error = json.error;
    } else {
      const json = await createCitationAction({
        author: String(FormData.get("author")),
        text: String(FormData.get("text")),
      });
      error = json.error;
    }

    if (error) {
      alert(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.citation ? "Modifier" : "Créer"} citation</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData) => {
            await onSubmit(formData);
          }}
          className="flex flex-col gap-2"
        >
          <Label>
            Citation
            <Input defaultValue={props.citation?.text} name="text" />
          </Label>
          <Label>
            Auteur
            <Input defaultValue={props.citation?.author} name="author" />
          </Label>
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
      {pending ? "Chargement..." : "Envoyer"}
    </Button>
  );
};
