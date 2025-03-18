/* eslint-disable react/no-unescaped-entities */
import { Check } from '@mui/icons-material';
import { TextField, Stack, Paper, Checkbox, Box, RadioGroup, Radio, FormControlLabel, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useState } from 'react';


export default function FormsPage() {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

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
      <Challenge>
        <Typography>
          The following input has an id and a name that can be used to reference it in automated tests.
          Fill in the input with any name to mark it as completed:
        </Typography>

        <Stack gap={2} direction="row" alignItems="center">
          <TextField id="firstname" name="firstname" label="First name" variant="outlined" value={firstname} onChange={e => setFirstname(e.target.value)} />

          {firstname && <Check color="success" />}
        </Stack>

      </Challenge>
      <Challenge>
        <Typography>
          The following input has no id or name, so selecting it in an automated test can be more difficult.
          Fill in the input with any name to mark it as completed:
        </Typography>
        <Box>
          <Typography component="label" variant="body2">Last name:</Typography>
          <Stack gap={2} direction="row" alignItems="center">
            <TextField variant="outlined" value={lastname} onChange={e => setLastname(e.target.value)} />
            {lastname && <Check color="success" />}
          </Stack>
        </Box>
      </Challenge>
      <Challenge>
        <Typography>
          Radio buttons are similar to checkboxes, but only one can be selected at a time.
          Use your test automation tool to toggle each of the following radio buttons one by one to pass
          this challenge:
        </Typography>

        <Stack direction="row" justifyContent="center">
          <RadioGroup name="framework">
            {RadioWithLabel("Java", "java")}
            {RadioWithLabel("JavaScript", "javascript")}
            {RadioWithLabel("TypeScript", "typescript")}
            {RadioWithLabel("Python", "python")}
          </RadioGroup>
        </Stack>
      </Challenge >
      <Challenge>
        <Typography>
          Similarly, there can be checkboxes that need to be selected in automated tests.
          Each of the following checkboxes have different attributes that can be used to reference them.
          Use your automation tool to check each of them one by one to pass this challenge:
        </Typography>

        <Stack direction="row" justifyContent="center">
          <Box><Checkbox name="checkbox-with-a-name" /></Box>
          <Box><Checkbox id="checkbox-with-an-id" /></Box>
          <Box><Checkbox className="checkbox-with-class" /></Box>
          <Box><Checkbox title="Checkbox with a title!" /></Box>
          <Box><Checkbox /></Box>
        </Stack>
      </Challenge>

      <Challenge>
        <Typography>
          Selecting a value from a <code>select</code> element can be a bit different.
          Use your automation tool to select the <em>blue</em> option from the following
          dropdown to pass this challenge. Take note that you will likely need to use your
          browses&apos;s developer tools to inspect the element and find the correct value.
        </Typography>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Choose a color:</InputLabel>
          <Select
            id="select-color"
            label="color">
            <MenuItem value="ffffff">White</MenuItem>
            <MenuItem value="000000">Black</MenuItem>
            <MenuItem value="ff0000">Red</MenuItem>
            <MenuItem value="00ff00">Green</MenuItem>
            <MenuItem value="0000ff">Blue</MenuItem>
          </Select>
        </FormControl>
      </Challenge >

      <Challenge>
        <Typography>
          The following buttons trigger the browsers <em>alert</em> and <em>prompt</em> dialogs.
          Use your automation tool to click each of them and handle the dialogs to pass this challenge.
          After closing the dialogs, assert that a success message appears.
        </Typography>
        <Stack justifyContent="center" alignItems="center" gap={2} direction="row" >
          <Button variant="contained" color="success" onClick={() => alert("Now close this alert")}>Open alert</Button>
          <Button variant="contained" color="success" onClick={() => prompt("What is 1 + 1?")}> Open confirm</Button>
        </Stack>
      </Challenge >
    </Stack >
  </>;
}

function RadioWithLabel(label: string, value: string) {
  return <FormControlLabel control={<Radio />} label={label} value={value} />;
}

function Challenge({ children }: { children: React.ReactNode }) {
  return <Paper elevation={2}>
    <Stack gap={2} p={2} alignItems="flex-start">
      {children}
    </Stack>
  </Paper>;
}