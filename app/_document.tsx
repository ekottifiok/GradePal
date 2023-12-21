// eslint-disable-next-line @next/next/no-document-import-in-page -- according to Next.js documentation it's fine
import Document, {Html, Head, Main, NextScript} from 'next/document';
import {getInitColorSchemeScript} from '@mui/material/styles';
import type {ReactElement} from 'react'
import React from "react";

// eslint-disable-next-line import/no-default-export -- next js requires this
export default class MyDocument extends Document {
  render = (): ReactElement => (
    <Html data-color-scheme="light" lang='en'>
      <Head>
        <link href="https://fonts.googleapis.com" rel="preconnect"/>
        <link href="https://fonts.gstatic.com" rel="preconnect"/>
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- I have no pages folder */}
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
      {getInitColorSchemeScript()}
      <Main/>
      <NextScript/>

      </body>
    </Html>
  );
}
