import Nav from "./nav";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function Header() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="text-5xl font-bold text-center">My Directory</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Nav />
      </CardContent>
    </Card>
  );
}
