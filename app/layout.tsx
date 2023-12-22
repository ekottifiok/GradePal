// noinspection HtmlUnknownTarget

import './globals.css';
import type {ReactNode} from 'react';
import React from "react";
import {UserProvider} from "@auth0/nextjs-auth0/client";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material/styles';
import {ThemeProvider} from '@components/theme';
import {EdgeStoreProvider} from '@components/edgeStore';
import {IMAGE_PATH} from "@components/constants";


// eslint-disable-next-line import/no-default-export -- required by next js
export default function RootLayout({children}: { children: ReactNode }): ReactNode {
  return (
    <html lang='en'>
    <head>
      <link href={IMAGE_PATH.concat('favicon/favicon.ico')} rel='icon' sizes='any'/>
      <link href={IMAGE_PATH.concat('/favicon-16x16.png')} rel='icon'
            sizes='16x16'
            type='image/png'/>
      <link href={IMAGE_PATH.concat('favicon/favicon-32x32.png')} rel='icon'
            sizes='32x32'
            type='image/png'/>
      <link href={IMAGE_PATH.concat('/app/apple-icon.png')}
            rel='apple-touch-icon'
            sizes='180x180'
            type='image/png'/>
      <link href="https://fonts.googleapis.com" rel="preconnect"/>
      <link href="https://fonts.gstatic.com" rel="preconnect"/>
      {/* eslint-disable-next-line @next/next/no-page-custom-font -- I have no pages folder */}
      <link
        href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <title>GradePal</title>

    </head>
    <body>
    <CssVarsProvider>
      <EdgeStoreProvider>
        <ThemeProvider>
          <UserProvider>
            <div className='root' style={{height: "100%", width: "100%"}}>
              {children}
            </div>
          </UserProvider>
        </ThemeProvider>
      </EdgeStoreProvider>
    </CssVarsProvider>
    <script>
      const global = globalThis;
    </script>
    </body>
    </html>
  );
}
