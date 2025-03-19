import { Paper, Stack, Typography } from "@mui/material";

export default function Challenge({ children, title }: { children: React.ReactNode, title: string }) {
    return (
        <Stack gap={2} mt={2}>
            <Paper elevation={2}>
                <Stack gap={2} p={{ xs: 2, md: 3 }} alignItems="flex-start">
                    <Typography variant="h6">{title}</Typography>
                    {children}
                </Stack>
            </Paper>
        </Stack>
    );
}

export function Instructions({ children }: { children: React.ReactNode }) {
    return <Typography mb={1}>
        {children}
    </Typography>;
}