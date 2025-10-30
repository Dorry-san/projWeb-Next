import { buttonVariants } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import Link from "next/link";

export default async function Page(){
    return (
        <Card>
            <CardHeader>
                <CardTitle>URL : /admin</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Link 
                    href="/admin/citation/new"
                    className={buttonVariants({ size: "lg", variant:"outline" })}
                >
                    Create citation
                </Link>
            </CardContent>
        </Card>
    )    
}