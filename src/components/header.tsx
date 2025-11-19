import Nav from "./nav";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Theme from "./btnTheme";

export default function Header() {
  return (
    <Card className="bg-background/50">
      <CardHeader>
        <CardTitle>
          <h1 className="text-5xl font-bold text-center">Archivea</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Nav />
        <Theme />
      </CardContent>
    </Card>
  );
}
