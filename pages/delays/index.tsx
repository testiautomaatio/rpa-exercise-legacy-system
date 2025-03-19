import Challenge from '@/components/Challenge';
import { InfoMessage, SuccessMessage } from '@/components/messages';
import theme from '@/theme';
import { Check } from '@mui/icons-material';
import { Stack, Button, CircularProgress, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';


export default function DelaysPage() {

    const start = useMemo(() => Date.now(), []);
    const [milliseconds, setMilliseconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMilliseconds(Date.now() - start);
        }, 100);

        return () => clearInterval(interval);
    }, []);


    return <>
        <Typography my={1}>
            Pages can be slow to load for a variety of reasons. This page simulates a slow loading page,
            where elements appear on the page or become editable after a delay.
        </Typography>
        <Typography my={1}>
            Use your test automation tool to interact with the elements but take into account that the elements
            might not be immediately available.
        </Typography >

        <DelayedAppearanceChallenge milliseconds={milliseconds} />
        <DelayedEnablementChallenge milliseconds={milliseconds} />
    </>;
}

function DelayedAppearanceChallenge({ milliseconds }: { milliseconds: number }) {
    const [text, setText] = useState('');

    const DELAY_MS = 3_000;
    const progressPercentage = Math.min((milliseconds / DELAY_MS), 1) * 100;
    const showInput = milliseconds > DELAY_MS;
    const expectedGreeting = "hello world";

    const done = showInput && text.toLowerCase().includes(expectedGreeting);

    return <Challenge title="Delayed appearance">
        <Typography>
            A text input element will appear below after a delay. Use your automation tool to insert the text <em>Hello world</em> into
            it once it has appeared. After inserting the text, assert that a correct success message appears.
        </Typography>
        <Stack justifyContent="center" alignItems="center" gap={2} direction="row" sx={{ minHeight: theme.spacing(10) }} >
            <Progress percentage={progressPercentage} />

            {showInput && <TextField variant="outlined" label="Enter the text" value={text} onChange={e => setText(e.target.value)} />}
        </Stack>

        <SuccessMessage condition={done} text="Nice job! Hello to you too! 👋" />
        <InfoMessage condition={!done}>Wait until the input appears, and then type "{expectedGreeting}" into it.</InfoMessage>
    </Challenge>
}


function DelayedEnablementChallenge({ milliseconds }: { milliseconds: number }) {
    const [done, setDone] = useState(false);

    const DELAY_MS = 5_000;
    const buttonPercentage = Math.min(milliseconds / DELAY_MS, 1) * 100;
    const enabled = milliseconds >= DELAY_MS;

    return <Challenge title="Delayed enablement">
        <Typography>
            The following button is on the page from the start, but will become enabled after
            a delay. Use your automation tool to click it to pass this challenge.
            After clicking, assert that a success message appears.
        </Typography>
        <Stack justifyContent="center" alignItems="center" gap={2} direction="row" >
            <Progress percentage={buttonPercentage} />
            <Button variant="contained" disabled={!enabled} onClick={() => setDone(true)}>Click me!</Button>
        </Stack>
        <SuccessMessage condition={enabled && done} text="Thoughtful clicking? You must be a real tester!" />
        <InfoMessage condition={!done} text="Wait until the button becomes enabled, and then click it like you mean it." />
    </Challenge>
}

function Progress({ percentage }: { percentage: number }) {
    if (percentage >= 100) {
        return <Check color="success" />
    }
    return <CircularProgress size="20px" />
}
