import { Alert } from "@mui/material";

export default function SuccessMessage({ condition, text }: { condition: boolean, text: string }) {
    return condition ? <Alert severity="success">{text}</Alert> : null;
}