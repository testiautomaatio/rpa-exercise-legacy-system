/* eslint-disable react/no-unescaped-entities */
import Challenge, { Instructions } from '@/components/Challenge';
import { InfoMessage, SuccessMessage } from '@/components/messages';
import { TextField, Stack, Checkbox, RadioGroup, Radio, FormControlLabel, FormControl, Button, FormLabel } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function FormsPage() {

    return <>
        <Typography my={1}>
            On this page, you can exercise interacting with different types of form elements.
        </Typography>
        <Typography my={1}>
            Each element has a different set of attributes, such as id, name or label, and different accessibility features such as { }
            <Link href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/WAI-ARIA_basics">aria attributes</Link>.
            Use your automation tool to interact with the elements and assert that you receive success messages after completing each challenge.
        </Typography>

        <Stack gap={2} mt={2}>
            <BasicInputChallenge />

            <InputWithoutAttributesChallenge />

            <ReadingValuesChallenge />

            <RadioButtonsChallenge />

            <CheckboxChallenge />

            <DialogChallenge />
        </Stack >
    </>;
}


function BasicInputChallenge() {
    const [input, setInput] = useState('');

    const correct = "hello";
    const done = input.toLowerCase() === correct;

    return <Challenge title="Basic text input">
        <Instructions>
            In this challenge, you will need to locate an input element and insert a specific value into it.
        </Instructions>
        <Instructions>
            The following input has several attributes that can be used to reference it in automated tests.
            Try writing "Hello" in the input and see the message that appears. Then, repeat the same
            in your automation tool and verify that you get the same message.
        </Instructions>

        <TextField id="greeting" name="greeting" label="Greeting" variant="outlined" value={input} onChange={e => setInput(e.target.value)} />

        <SuccessMessage condition={done} text="Nice job! You have greeted the page 👋! Continue with the next challenges below." />
        <InfoMessage condition={!done} text={`Type "${correct}" in the input to pass this challenge.`} />
    </Challenge>;
}

function InputWithoutAttributesChallenge() {
    const [input, setInput] = useState('');
    const msg = "undefined is not a function";

    const done = input.toLowerCase().includes(msg);

    return <Challenge title="Input without proper attributes">
        <Instructions>
            The following input has no id or name, so selecting it in an automated test can be more difficult.
            Fill in the text <em>"{msg}"</em> in the input field to see a success message. Then,
            repeat the same in your automation tool and verify that you get the same message.
        </Instructions>
        <Stack direction="column" alignItems="flex-start">
            <Typography component="label" variant="body2">Type "{msg}" below:</Typography>
            <TextField variant="outlined" value={input} onChange={e => setInput(e.target.value)} />
        </Stack>
        <SuccessMessage condition={done} text="Done! But be careful, that phrase alone has crashed entire applications." />
        <InfoMessage condition={!done} text={`Type "${msg}" in the input to pass this challenge.`} />
    </Challenge>
}

function ReadingValuesChallenge() {
    const [dynamicValue, setDynamicValue] = useState("");
    const [text, setText] = useState("");

    const done = dynamicValue.length > 0 && text === dynamicValue;

    useEffect(() => {
        setDynamicValue(Math.random().toString(36).substring(2));
    }, []);

    return (
        <Challenge title="Reading values from the page">
            <Instructions>
                Often, you need to read the value a dynamic value of an element and use it in your tests.
                Use your automation tool to read the from the following <code>span</code> element and insert it into the
                input field. After inserting the value, assert that a success message appears.
            </Instructions>
            <Instructions>
                The value will change each
                time you reload the page so make sure to read it from the page and not hardcode it.
            </Instructions>
            <Instructions>
                The value to enter is <strong id="dynamic-value">{dynamicValue}</strong>
            </Instructions>
            <Stack gap={2} direction="row" alignItems="center">
                <TextField id="dynamic-input" label="Insert the value here" variant="outlined" value={text} onChange={e => setText(e.target.value)} />
            </Stack>
            <SuccessMessage condition={done} text="Great job! You have successfully read a value from the page! 🎉" />
            <InfoMessage condition={!done} text="Read the value above and write it into the input to pass this challenge." />
        </Challenge>
    );
}

function RadioButtonsChallenge() {
    type Language = keyof typeof items;

    const [items, setItems] = useState({
        "Java": false,
        "JavaScript": false,
        "TypeScript": false,
        "Python": false
    });

    const languages = Object.keys(items) as Language[];
    const checked = Object.entries(items).filter(([key, checked]) => checked).map(([langName]) => langName);
    const allChecked = Object.values(items).every(Boolean);

    function RadioWithLabel(language: Language) {
        return <FormControlLabel control={<Radio />} label={language} value={language} key={language} />;
    }

    return (
        <Challenge title="Radio buttons">
            <Instructions>
                Radio buttons are similar to checkboxes, but only one can be selected at a time.
                Use your test automation tool to toggle each of the following radio buttons at least once to pass
                this challenge:
            </Instructions>

            <FormControl>
                <FormLabel>Programming languages</FormLabel>
                <RadioGroup name="selected-language" onChange={e => setItems({ ...items, [e.target.value as Language]: true })}>
                    {languages.map(lang => RadioWithLabel(lang))}
                </RadioGroup>
            </FormControl>

            <SuccessMessage condition={allChecked} text='The term "radio button" in HTML comes from the old-school radio dials that let you choose only one station at a time. 📻🎸🎵' />
            <InfoMessage condition={!allChecked} text={`Toggle each radio button at least once to pass this challenge. Currently ${checked.length} / ${languages.length} toggled.`} />
        </Challenge>
    );
}

function CheckboxChallenge() {
    const [checked, setChecked] = useState(0);

    const count = 5;
    const allChecked = checked === count;

    function handleClick(target: EventTarget) {
        const element = target as HTMLInputElement;
        setChecked(c => element.checked ? c + 1 : c - 1);
    }

    return (
        <Challenge title="Checkboxes">
            <Instructions>
                Similarly, there can be checkboxes that need to be selected in automated tests.
                Each of the following checkboxes have different attributes that can be used to reference them.
                Unlike previous examples, these buttons may not be very accessible.
            </Instructions>
            <Instructions>
                Use your automation tool to check each of the buttons one by one and assert the success message
                to pass this challenge:
            </Instructions>

            <Stack direction="column" justifyContent="center">
                <Stack direction="row" alignItems="center">
                    <Checkbox name="terms-and-conditions" onClick={e => handleClick(e.target)} /> <span>I did not read the terms and conditions</span>
                </Stack>
                <Stack direction="row" alignItems="center">
                    <Checkbox className="no-robot" onClick={e => handleClick(e.target)} /> <span>I <strong>am not</strong> a robot</span>
                </Stack>
                <Stack direction="row" alignItems="center">
                    <Checkbox id="yes-robot" onClick={e => handleClick(e.target)} /> <span>I <strong>am</strong> a robot</span>
                </Stack>
                <Stack direction="row" alignItems="center">
                    <Checkbox title="Subscribe to newsletter" onClick={e => handleClick(e.target)} /> <span>I sure want to subscribe to a newsletter</span>
                </Stack >
                <Stack direction="row" alignItems="center">
                    <Checkbox onClick={e => handleClick(e.target)} /> <span>I have checked all of the boxes</span>
                </Stack >
            </Stack >
            <SuccessMessage condition={allChecked} text="Button-mashing detected. Are you testing or gaming?! 📦" />
            <InfoMessage condition={!allChecked} text={`Check each checkbox to pass this challenge. Currently checked ${checked} / ${count}.`} />
        </Challenge >
    );
}

function DialogChallenge() {
    const [answer, setAnswer] = useState("0");

    const question = "What is 1 + 1?"
    const done = answer === "2";

    return <Challenge title="Alerts and prompts">
        <Instructions>
            The following button will trigger the browser's <em>prompt</em> dialog, that will expect user input.
            Try it first manually, and then use your automation tool to handle the dialog and pass this challenge.
            After handling the prompt, assert that the correct success message appears.
        </Instructions>
        <Instructions>
            The question and the correct answer will stay the same, so you can hardcode the answer in your tests.
        </Instructions>

        <Button variant="contained" color="success" onClick={() => setAnswer(prompt(question) ?? "0")}>{question}</Button>

        <SuccessMessage condition={done} text="You have handled the prompt successfully! 🎉 The math part sure is easier than automating the test. 😅" />
        <InfoMessage condition={!done}>
            Your current answer is {answer}. Make sure to set up your test to insert the correct value.
        </InfoMessage>
    </Challenge>
}