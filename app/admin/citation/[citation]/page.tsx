import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";

export default async function Page(props: {
    params: Promise<{
        citationId: string;
    }>;
    searchParams: Promise<Record<string, string | string[]>>;
}){
    const params = await props.params;
    const searchParams = await props.searchParams;
    return(
      <Card>
        <CardHeader>
            <CardTitle>{JSON.stringify(params, null, 2)}</CardTitle>
            <CardTitle>{JSON.stringify(searchParams, null, 2)}</CardTitle>
        </CardHeader>
      </Card>  
    );
}