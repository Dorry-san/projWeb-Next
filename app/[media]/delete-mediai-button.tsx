"use client";

import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import { deleteMediaAction } from "./media.action";
import { useRouter } from "next/navigation";

export function DeleteMediaButton(props: { id: number }) {
  const [isConfirm, setIsConfirm] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    const result = await deleteMediaAction(props.id);
    if (result.message) {
      router.refresh();
    }
  };

  return (
    <Button
      className="basis-1/2"
      size="sm"
      onClick={() => {
        if (isConfirm) {
          onDelete();
        } else {
          setIsConfirm(true);
        }
      }}
      variant={isConfirm ? "destructive" : "outline"}
    >
      {isConfirm ? "Vraiment ?" : "Supprimer"}
    </Button>
  );
}
