import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { DashboardLayout, SidebarFooterProps } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Head from 'next/head';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { Navigation } from '@toolpad/core/AppProvider';


import theme from '../theme';
import { AspectRatio, AvTimer, DynamicForm, Home, Loop, ManageHistory, Palette } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Link from 'next/link';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;

};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Sections',
    },
    {
        segment: '',
        title: 'Home',
        icon: <Home />,
    },
    {
        segment: 'forms',
        title: 'Form elements',
        icon: <DynamicForm />,
    },
    {
        segment: 'customisations',
        title: 'Custom components',
        icon: <Palette />,
    },
    {
        segment: 'repetition',
        title: 'Repetition',
        icon: <Loop />,
    },
    {
        segment: 'delays',
        title: 'Delays',
        icon: <AvTimer />,
    },
    {
        segment: 'datetime',
        title: 'Datetime',
        icon: <ManageHistory />,
    },
    {
        segment: 'responsive',
        title: 'Responsive pages',
        icon: <AspectRatio />,
    },
];

const BRANDING = {
    title: 'Browser Interaction Playground',
    logo: <></>,
};

function SidebarFooter({ mini }: SidebarFooterProps) {
    return (
        <Typography variant="caption" sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <Link href="https://github.com/testiautomaatio/interaction-playground">
                {mini ? 'GitHub' : `Project GitHub`}
            </Link>
        </Typography>
    );
}

function getDefaultLayout(page: React.ReactElement) {
    return (
        <DashboardLayout slots={{ sidebarFooter: SidebarFooter }}>
            <PageContainer sx={{ pb: 4 }}>
                {page}
            </PageContainer>
        </DashboardLayout>
    );
}

function AppLayout({ children }: { children: React.ReactNode }) {

    return (
        <React.Fragment>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <title>Interaction playground 🎭</title>
            </Head>
            <NextAppProvider
                navigation={NAVIGATION}
                branding={BRANDING}
                theme={theme}
            >
                {children}
            </NextAppProvider>
        </React.Fragment>
    );
}

export default function App(props: AppPropsWithLayout) {
    const {
        Component,
        pageProps,
    } = props;

    const getLayout = Component.getLayout ?? getDefaultLayout;
    let pageContent = getLayout(<Component {...pageProps} />);
    pageContent = <AppLayout>{pageContent}</AppLayout>;

    return (

        <AppCacheProvider {...props}>

            {pageContent}

        </AppCacheProvider>

    );
}
