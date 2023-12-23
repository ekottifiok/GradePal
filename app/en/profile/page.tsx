import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import type {Metadata} from "next";
import {getUserAuth0} from "@components/utils";

export const metadata: Metadata = {
  title: 'GradePal - Profile',
}
// eslint-disable-next-line import/no-default-export -- required by Next.js
export default withPageAuthRequired(
  async () => getUserAuth0(getSession())
    .then((user) => (
      <div>Profile for {user.name}</div>
    ))
)