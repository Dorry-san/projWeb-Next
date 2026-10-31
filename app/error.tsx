"use client";

import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";

export default function Loading(){
    return(
        <Card>
            <CardHeader>
                <CardTitle>Oups, une erreur est survenue</CardTitle>
            </CardHeader>
        </Card>
    )
}