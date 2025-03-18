import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Head from 'next/head';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { Navigation } from '@toolpad/core/AppProvider';


import theme from '../theme';
import { AspectRatio, AvTimer, DynamicForm, Home, ManageHistory } from '@mui/icons-material';

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
  title: 'Interaction playground 🎭',
};



function getDefaultLayout(page: React.ReactElement) {
  return (
    <DashboardLayout>
      <PageContainer>{page}</PageContainer>
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
