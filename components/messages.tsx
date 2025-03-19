import { Alert } from "@mui/material";
import { ReactNode } from "react";

export function SuccessMessage({ condition, text }: { condition: boolean, text: string }) {
    return condition ? <Alert severity="success">{text}</Alert> : null;
}

export function InfoMessage({ condition, text, children }: { condition: boolean, text?: string, children?: ReactNode }) {
    return condition ? <Alert severity="info">{text ?? children}</Alert> : null;
}