/* eslint-disable react/no-unescaped-entities */
import Challenge from '@/components/Challenge';
import { Check, Laptop, Monitor, Smartphone, StarOutline, Tablet } from '@mui/icons-material';
import { TableContainer, TableHead, TableRow, TableCell, TableBody, Table } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

const SIZES = {
    unknown: false,
    xs: false,
    sm: false,
    md: false,
    lg: false,
};

export default function ResponsivePage() {
    const [width, setWidth] = useState(-1);
    const [sizes, setSizes] = useState(SIZES);

    useEffect(() => {
        setSizes(s => ({
            ...s,
            [sizeCheck(width)]: true,
        }));
    }, [width]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWidth(width);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <>
        <Typography my={1}>
            Many sites adapt to the browser's size and shape, as well as the user's color scheme preferences.
        </Typography>
        <Typography my={1}>
            The challenges on this page are designed to help you test how well your automation tool can interact with responsive web pages.
        </Typography>

        <Challenge title="Responsive design">
            <Typography>
                Test this page using different screen sizes to verify that different content is displayed correctly at different resolutions.
            </Typography>
            <Typography>
                Make your automation tool resize the browser window to match each of the following breakpoints and
                assert that the correct content is being displayed for each resolution.
            </Typography>
            <Typography>
                The current width of the browser window is <strong>{width} px ({sizeCheck(width)})</strong>.
            </Typography>
            <ResolutionTable width={width} sizes={sizes} />
        </Challenge>
    </>;
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
                        <TableCell>Extra small</TableCell>
                        <TableCell>&lt; 600 px</TableCell>
                        <TableCell>{sizeCheck(width) === 'xs' && <StarOutline color="primary" />}</TableCell>
                        <TableCell>{sizes["xs"] && <Check color="success" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><Tablet /></TableCell>
                        <TableCell>Small</TableCell>
                        <TableCell>&gt;= 600 px</TableCell>
                        <TableCell>{sizeCheck(width) === 'sm' && <StarOutline color="primary" />}</TableCell>
                        <TableCell>{sizes["sm"] && <Check color="success" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><Laptop /></TableCell>
                        <TableCell>Medium</TableCell>
                        <TableCell>&gt;= 900 px</TableCell>
                        <TableCell>{sizeCheck(width) === 'md' && <StarOutline color="primary" />}</TableCell>
                        <TableCell>{sizes["md"] && <Check color="success" />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><Monitor /></TableCell>
                        <TableCell>Large</TableCell>
                        <TableCell>&gt;= 1200 px</TableCell>
                        <TableCell>{sizeCheck(width) === 'lg' && <StarOutline color="primary" />}</TableCell>
                        <TableCell>{sizes["lg"] && <Check color="success" />}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function sizeCheck(w: number): keyof typeof SIZES {
    if (w < 0) return "unknown";
    if (w < 600) return "xs";
    if (w < 900) return "sm";
    if (w < 1200) return "md";
    return "lg";
}
