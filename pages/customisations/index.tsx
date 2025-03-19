/* eslint-disable react/no-unescaped-entities */
import Challenge, { Instructions } from '@/components/Challenge';

import Link from 'next/link';

import { Stack, FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { InfoMessage, SuccessMessage } from '@/components/messages';

export default function CustomisationsPage() {

    return <>
        <Instructions>
            Many sites utilize UI libraries, such as <Link href="https://mui.com/material-ui/">Material Design</Link>
            or <Link href="https://getbootstrap.com/">Bootstrap</Link>, which can provide components with custom
            styles and behaviors. At times, these components look similar but can behave differently from standard HTML elements.
        </Instructions>
        <Instructions>
            In the next challenges, you will need to interact with both the browser's native components as well as popular
            custom components to pass.
        </Instructions>

        <Stack gap={2} mt={2}>
            <StandardSelectChallenge />

            <MuiSelectChallenge />

            <StandardDatePickerChallenge />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MuiDatePickerChallenge />
            </LocalizationProvider>
        </Stack >
    </>;
}

function StandardSelectChallenge() {
    const animals = {
        "cat": {
            "emoji": "🐱",
            "message": "Meow! Choose the fox to pass this challenge!"
        },
        "dog": {
            "emoji": "🐶",
            "message": "Woof woof! Keep testing!"
        },
        "rabbit": {
            "emoji": "🐰",
            "message": "Hop, hop! No bugs here! 🐇"
        },
        "fox": {
            "emoji": "🦊",
            "message": "What does the fox say? Ring-ding-ding-ding-dingeringeding! Gering-ding-ding-ding-dingeringeding! Gering-ding-ding-ding-dingeringeding!"
        },
        "fish": {
            "emoji": "🐟",
            "message": "All clear, swimming through tests! 🐟"
        }
    }

    const [animal, setAnimal] = useState<keyof typeof animals>("cat");
    const correct: keyof typeof animals = "fox";
    const done = animal === correct;

    return <Challenge title="Standard select element">
        <Instructions>
            This challenge contains a standard <code>select</code> element with a list of animals.
            Use your automation tool to select the <em>{correct}</em> option and assert that the page
            displays the correct message message.
        </Instructions>


        <Box>
            <label htmlFor="select-animal">Select animal:</label>
            <Stack direction="row" gap={2} alignItems="center">
                <select
                    id="select-animal"
                    value={animal}
                    style={{ padding: "0.5rem" }}
                    onChange={e => setAnimal(e.target.value as keyof typeof animals)}>
                    {Object.entries(animals).map(([species, options]) =>
                        <option key={species} value={species}>{options.emoji} {species}</option>
                    )}
                </select>

                <Typography variant="body2" component="span">
                    {animals[animal]?.message ?? "Choose an animal"}
                </Typography>
            </Stack>
        </Box>

        <SuccessMessage condition={done} text="Success! You selected the correct option from a standard select element!" />
        <InfoMessage condition={!done} text={`Select the ${correct} to pass this challenge.`} />
    </Challenge >;
}


function MuiSelectChallenge() {
    const colors = {
        "white": "#F8F9FA",
        "black": "#1E1E1E",
        "red": "#E63946",
        "green": "#4CAF50",
        "blue": "#457BFD"
    };

    const [color, setColor] = useState<keyof typeof colors | "">("");
    const correct: keyof typeof colors = "blue";
    const done = color === correct;

    return <Challenge title="Custom select element">
        <Instructions>
            The following selection element is a custom component from the <Link href="https://mui.com/material-ui/react-select/">Material-UI library</Link>.
            Although it mimicks the behavior of a standard select element, it need to be interacted with differently.
            Use your automation tool to select the color <em>blue</em> and assert that the page displays the correct message.
        </Instructions>

        <Stack gap={2} direction="row" justifyContent="space-between" alignSelf="stretch">
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choose a color:</InputLabel>
                <Select
                    id="select-color"
                    label="color"
                    value={color}
                    onChange={e => setColor(e.target.value as keyof typeof colors)}>
                    {Object.entries(colors).map(([name, _]) => <MenuItem key={name} value={name}>{name}</MenuItem>)}
                </Select>
            </FormControl>
            <Box
                alignSelf="stretch"
                sx={{ backgroundColor: color ? colors[color] : 'white', aspectRatio: 1, boxShadow: "0 0 1px silver", borderRadius: "50%", flexGrow: 0, flexShrink: 0 }}
            />
        </Stack>
        <SuccessMessage condition={done} text="Success! You've selected the correct color using a custom select element! 💙" />
        <InfoMessage condition={!done} text={`Select the color ${correct} to pass this challenge.`} />
    </Challenge>;
}


function StandardDatePickerChallenge() {
    const [date, setDate] = useState("");
    const correct = "2030-01-01";
    const done = date === correct;

    return <Challenge title="Standard date picker">
        <Instructions>
            The following date picker is a standard HTML element. Use your automation tool to select the
            date <em>{correct}</em> and assert that the page displays the correct message.
        </Instructions>

        <input
            id="date-picker"
            type="date"
            value={date}
            style={{ padding: "1rem" }}
            onChange={e => setDate(e.target.value)}
        />
        <SuccessMessage condition={done} text="Success! You've selected the correct date using a standard date picker!" />
        <InfoMessage condition={!done} text={`Select the date ${correct} to pass this challenge.`} />
    </Challenge>;
}

function MuiDatePickerChallenge() {
    const [date, setDate] = useState<Dayjs | null>(null);
    const correctDate = "2030-01-01";

    const done = date?.isSame(dayjs(correctDate), 'day') ?? false;

    return <Challenge title="Custom date picker">
        <Instructions>
            The following date picker is a custom component from the <Link href="https://mui.com/x/react-date-pickers/">MUI X library</Link>.
            Although it mimicks the behavior of a standard date picker, it need to be interacted with differently.
            Use your automation tool to select the date <em>{correctDate}</em> and assert that the page displays the correct message.
        </Instructions>
        <Instructions>
            Try to write your test in a way that it will work regardless of the current date, which is the initial value of the date picker.
        </Instructions>

        <DatePicker label="Choose a date" onChange={setDate} value={date} />

        <SuccessMessage condition={done} text="Success! You've selected the correct date using a custom date picker!" />
        <InfoMessage condition={!done} text={`Select the date ${correctDate} to pass this challenge.`} />
    </Challenge>;
}
