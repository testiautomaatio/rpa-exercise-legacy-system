import Challenge, { Instructions } from '@/components/Challenge';
import { InfoMessage, SuccessMessage } from '@/components/messages';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';


export default function DatetimePage() {

    const [year, setYear] = useState(0);
    const expectedYear = 2033;
    const done = year === expectedYear;

    useEffect(() => {
        const update = () => setYear(new Date().getFullYear());
        const interval = setInterval(update, 100);
        update();

        return () => clearInterval(interval);
    }, []);


    return <>
        <Instructions>
            Many sites depend on the current date and time to display relevant information. This can include
            things like news articles, event calendars and booking systems. This page has a dynamically changing
            element that displays the current year. Right now, your browser's time is set to year {year}.
        </Instructions>


        <Stack gap={2}>
            <Challenge title="Test page using different dates">
                <Instructions>
                    Use your automation tool to verify that the copyright notice below updates dynamically based on the browser's
                    time. <strong>Set the time to year {expectedYear}</strong> and assert that the copyright notice is
                    displayed correctly.
                </Instructions>

                <Typography alignSelf="center">
                    Copyright &copy; {year} example.com
                </Typography>
            </Challenge>

            <SuccessMessage condition={done} text="Time travel can be easy with the right tools!" />
            <InfoMessage condition={!done}>Mock the time in your test to year {expectedYear} and verify that the copyright is updated.</InfoMessage>
        </Stack>
    </>;
}
