import { Stack, Paper, Button, CircularProgress, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';


export default function DelaysPage() {

  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicks((ticks) => ticks + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const buttonPercentage = Math.min(ticks * 20, 100);
  const buttonDisabled = ticks < 5;

  return <>
    <Typography>
      Pages can be slow to load for a variety of reasons. This page simulates a slow loading page,
      where elements appear on the page or become editable after a delay.
    </Typography>
    <Typography>
      Use your test automation tool to interact with the elements but take into account that the elements
      might not be immediately available.
    </Typography >


    <Challenge>
      <Typography>
        A text input element will appear below after a delay.
        Use your automation tool to insert any text into it to pass this challenge.
      </Typography>
      <Stack justifyContent="center" alignItems="center" gap={2} direction="row" >
        <div style={{ visibility: ticks < 3 ? 'hidden' : undefined }}>
          <TextField variant="outlined" />
        </div>
      </Stack>
    </Challenge>


    <Challenge>
      <Typography>
        The following button is on the page from the start, but will become enabled after
        a delay. Use your automation tool to click it to pass this challenge.
        After clicking, assert that a success message appears.
      </Typography>
      <Stack justifyContent="center" alignItems="center" gap={2} direction="row" >
        <Button variant="contained" disabled={buttonDisabled}>Click me!</Button>
        <Progress percentage={buttonPercentage} />
      </Stack>
    </Challenge>

    <Challenge>
      <Typography>
        The following button is on the page from the start, but will become enabled after
        a delay. Use your automation tool to click it to pass this challenge.
        After clicking, assert that a success message appears.
      </Typography>
      <Stack justifyContent="center" alignItems="center" gap={2} direction="row" >
        <Button variant="contained" disabled={buttonDisabled}>Click me!</Button>
        <Progress percentage={buttonPercentage} />
      </Stack>
    </Challenge>
  </>;
}

function Progress({ percentage }: { percentage: number }) {
  return <CircularProgress value={percentage} variant="determinate" size="20px" />
}

function Challenge({ children }: { children: React.ReactNode }) {
  return <Stack gap={2} mt={2}>
    <Paper elevation={2}>
      <Stack gap={2} p={2} alignItems="flex-start">
        {children}
      </Stack>
    </Paper>
  </Stack>;
}