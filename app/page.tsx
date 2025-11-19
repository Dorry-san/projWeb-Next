"use client";

import { buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
//import Image from "next/image";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      className={`
      min-h-screen
      transition-all duration-700
      ${theme === "light" ? "" : "dark"}
    `}
    >
      <Card>
        <CardHeader>
          <CardTitle>URL :/</CardTitle>
        </CardHeader>
        <CardContent>
          <Link
            href="#"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            /admin
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
