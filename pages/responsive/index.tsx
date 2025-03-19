/* eslint-disable react/no-unescaped-entities */
import Challenge from '@/components/Challenge';
import { InfoMessage, SuccessMessage } from '@/components/messages';
import { Check, Laptop, Monitor, Smartphone, StarOutline, Tablet } from '@mui/icons-material';
import { TableContainer, TableHead, TableRow, TableCell, TableBody, Table, Box, Paper, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

const SIZES = {
    xs: false,
    sm: false,
    md: false,
    lg: false,
} as const;

export default function ResponsivePage() {
    // This "trick"  is used to prevent the responsive components from rendering before the applications context, including theme, is loaded.
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return <>
        <Typography my={1}>
            Many sites adapt to the browser's size and shape, as well as the user's color scheme preferences.
        </Typography>
        <Typography my={1}>
            The challenges on this page are designed to help you test how well your automation tool can interact with responsive web pages.
        </Typography>

        {!loading && <DarkModeChallenge />}

        {!loading && <ViewportSizeChallenge />}
    </>;
}

function DarkModeChallenge() {

    const theme = useTheme();
    const [palettes, setPalettes] = useState({ light: false, dark: false });

    const done = palettes.light && palettes.dark;
    console.log(theme.palette.mode);

    useEffect(() => {
        setPalettes(p => ({ ...p, [theme.palette.mode]: true }));
    }, [theme.palette.mode]);

    return <>
        <Challenge title="Dark mode">
            <Typography>
                Many sites offer a dark mode to reduce eye strain and save battery life on mobile devices.
                Your current color scheme is <strong>{theme.palette.mode}</strong>.
            </Typography>
            <Typography>
                Use your automation tool to toggle the dark mode switch on the corner of the screen and
                assert that the page's color scheme changes.
            </Typography>
            <SuccessMessage condition={done} text="You have successfully switched between the modes! ☀️ / 🌑" />
            <InfoMessage condition={!done} text="Toggle the dark mode switch and verify that the page's color scheme changes." />
        </Challenge >
    </>
}

function ViewportSizeChallenge() {
    const [width, setWidth] = useState(-1);
    const [sizes, setSizes] = useState(SIZES);

    const handleResize = () => setWidth(window.innerWidth);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const currentSize = sizeCheck(width);
        if (currentSize) {
            setSizes(s => ({
                ...s,
                [currentSize]: true,
            }));
        }
    }, [width]);


    const done = Object.values(sizes).every(Boolean);

    return <>
        <Challenge title="Responsive design">
            <Typography>
                Test this page using different screen sizes to verify that different content is displayed correctly at different resolutions.
            </Typography>
            <Typography>
                Make your automation tool resize the browser window to match each of the following breakpoints and
                assert that the correct content is being displayed for each resolution. The current width of your viewport
                is <strong>{width} px ({sizeCheck(width)})</strong>.
            </Typography>

            <Paper sx={{ p: 2, my: 2, alignSelf: "stretch" }}>
                <ChooseSize xs>
                    XS 🐁: Welcome to the world of cramped UI! Everything's cute at this size... except overflowing text.
                </ChooseSize>
                <ChooseSize sm>
                    SM 🐕: Small but mighty... until the navbar breaks!
                </ChooseSize>
                <ChooseSize md>
                    MD 🐎: This is the viewport devs test first... and sometimes last.
                </ChooseSize>
                <ChooseSize lg>
                    LG 🐘: Welcome to the land of white space and giant modals!
                </ChooseSize>
            </Paper>

            <ResolutionTable width={width} sizes={sizes} />
            <SuccessMessage condition={done} text="You have successfully tested all supported screen sizes!" />
            <InfoMessage condition={!done} text="Keep resizing the viewport to match the specified breakpoints and verify that the correct content is displayed." />
        </Challenge >
    </>
}

function ResolutionTable({ width, sizes }: { width: number, sizes: typeof SIZES }) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Breakpoint (width)</TableCell>
                        <TableCell>Current</TableCell>
                        <TableCell>Tested</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell><Smartphone /></TableCell>
                        <TableCell>Extra small (xs)</TableCell>
                        <TableCell>&lt; 600 px</TableCell>
                        <TableCell>{sizeCheck(width) === 'xs' && <StarOutline color="primary" />}</TableCell>
                        <TableCell>{sizes.xs && <Check color="success" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><Tablet /></TableCell>
                        <TableCell>Small (sm)</TableCell>
                        <TableCell>&gt;= 600 px</TableCell>
                        <TableCell>{sizeCheck(width) === 'sm' && <StarOutline color="primary" />}</TableCell>
                        <TableCell>{sizes.sm && <Check color="success" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><Laptop /></TableCell>
                        <TableCell>Medium (md)</TableCell>
                        <TableCell>&gt;= 900 px</TableCell>
                        <TableCell>{sizeCheck(width) === 'md' && <StarOutline color="primary" />}</TableCell>
                        <TableCell>{sizes.md && <Check color="success" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><Monitor /></TableCell>
                        <TableCell>Large (lg)</TableCell>
                        <TableCell>&gt;= 1200 px</TableCell>
                        <TableCell>{sizeCheck(width) === 'lg' && <StarOutline color="primary" />}</TableCell>
                        <TableCell>{sizes.lg && <Check color="success" />}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

type ChooseSizeProps = { [key in keyof typeof SIZES]?: boolean } & { children: React.ReactNode };

function ChooseSize({ xs = false, sm = false, md = false, lg = false, children }: ChooseSizeProps) {
    const rules = { display: { xs: xs ? 'block' : 'none', sm: sm ? 'block' : 'none', md: md ? 'block' : 'none', lg: lg ? 'block' : 'none' } };
    return <Box sx={rules}>{children}</Box>;
}

function sizeCheck(w: number): keyof typeof SIZES | undefined {
    if (w < 0) return undefined;
    if (w < 600) return "xs";
    if (w < 900) return "sm";
    if (w < 1200) return "md";
    return "lg";
}
