import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: 'GradePal - Profile',
}
// eslint-disable-next-line import/no-default-export -- required by Next.js
export default withPageAuthRequired(
  async () => {
    return (
      <div>Profile</div>
    )
  }
)