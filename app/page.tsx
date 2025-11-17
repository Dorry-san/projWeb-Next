import { buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Link from "next/link";
//import Image from "next/image";

export default function Home() {
  return (
    <div className="">
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
