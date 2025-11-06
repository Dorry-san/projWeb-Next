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
import { createCitationAction } from "./citations.action";
import { useFormStatus } from "react-dom";

export default function Page() {
  const createCitation = async (FormData: FormData) => {
    const json = await createCitationAction({
      author: String(FormData.get("author")),
      text: String(FormData.get("text")),
    });

    if (json.error) {
      alert(json.error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create citation</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData) => {
            await createCitation(formData);
          }}
          className="flex flex-col gap-2"
        >
          <Label>
            Citation
            <Input name="text" />
          </Label>
          <Label>
            Author
            <Input name="author" />
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
      {pending ? "Loading..." : "Subbit"}
    </Button>
  );
};
