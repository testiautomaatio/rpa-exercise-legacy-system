import Typography from '@mui/material/Typography';

export default function HomePage() {

    return <>
        <Typography my={1}>
            Welcome to the browser interaction playground!
        </Typography>

        <Typography my={1}>
            On this site, you can practice interacting with different types of elements on web pages using your test automation tool.
            Each page has a set of challenges that you can complete. The challenges are designed to help you practice interacting
            with different types of elements and to help you learn how to write automated tests.
        </Typography>
        <Typography my={1}>
            The challenges include tasks as locating elements and interacting with them, as well as waiting for elements to appear
            or change on the page. Some challenges also require you to verify that elements are displayed correctly or that they
            change in an expected way. The challenges aim to resemble real-world scenarios that you might encounter when writing
            automated tests for web applications, which includes both well and poorly designed web elements as well as dynamic content
            and components from third-party libraries.
        </Typography>
        <Typography my={1}>
            The challenges are designed to be compatible with any test automation tool that can interact with web pages.
            We are using Playwright to run the challenges, but you can use any tool. Remember to use the tool's documentation
            to learn how to interact with different types of elements, and to learn how to wait for elements to appear or change
            on the page.
        </Typography>
        <Typography my={1}>
            Good luck and have fun!
        </Typography >
    </>;
}
