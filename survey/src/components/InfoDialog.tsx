import React from "react";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import {InfoIcon} from "lucide-react";

function InfoDialog({children, title}: {children: React.ReactNode, title: string}) {
    return (
        <Alert className="border-neutral-500">
            <InfoIcon className="h-4 w-4 mt-2" />
            <AlertTitle><h1 className="text-lg font-bold">{title}</h1></AlertTitle>
            <AlertDescription>
                {children}
            </AlertDescription>
        </Alert>
    );
}

export default InfoDialog;