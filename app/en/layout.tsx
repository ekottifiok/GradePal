import type {ReactNode} from 'react';
import React from 'react'
import {getSession} from '@auth0/nextjs-auth0';
import {DashboardLayout} from '@layouts/dashboard';
import {getUserAuth0, Redirect} from "@components/utils";

// eslint-disable-next-line import/no-default-export -- required by Next.js
export default async function Layout({children}: {
  children: ReactNode
}): Promise<React.JSX.Element> {
  return getUserAuth0(getSession())
    .then((user) => (
      <DashboardLayout user={user}>
        {children}
      </DashboardLayout>
    ))
    .catch(() => <Redirect to='/register'/>)
}

