import { Stack, Paper, Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';


export default function DatetimePage() {

  const [date, setDate] = useState(new Date());
  const year = date.getFullYear();

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return <>
    <Typography mb={2}>
      Not many things look as outdated as websites (or course material) with past dates in them.
    </Typography>
    <Typography mb={2}>
      This page has a dynamically changing element that displays the current year.
      Use your automation tool to verify that the copyright notice updates dynamically based
      on the browser&apos;s time. Set the time to year 2033 and verify that the year is displayed correctly.
    </Typography>

    <Stack gap={2} mt={2}>
      <Challenge>
        <Typography alignSelf="center">
          Copyright &copy; {year} Acme Corp.
        </Typography>
      </Challenge>
      <Alert severity="success" variant="filled">
        You successfully set the date to 2033!
      </Alert>
    </Stack>
  </>;
}

function Challenge({ children }: { children: React.ReactNode }) {
  return <Paper elevation={2}>
    <Stack gap={2} p={2} alignItems="flex-start">
      {children}
    </Stack>
  </Paper>;
}