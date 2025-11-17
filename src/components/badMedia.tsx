import { Card, CardHeader, CardTitle } from "./ui/card";

export default function Err({ media }: { media: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Le media {media} n'est pas pris en charge.</CardTitle>
      </CardHeader>
    </Card>
  );
}
