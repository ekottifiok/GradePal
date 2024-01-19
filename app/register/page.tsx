import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import Error from '@app/error'
import {getUserAuth0, Redirect} from "@components/utils";
import type {UserClaims} from "@components/interface";
import {CSRPage} from './csr-page';



// eslint-disable-next-line import/no-default-export -- required by Next.js
export default withPageAuthRequired(
  async () => {
    const sessionPromise = getSession()
    const session = await sessionPromise

    if (!session) {
      return <Error error="Session is null"/>
    }

    return getUserAuth0(sessionPromise)
      .then(() => <Redirect to='/en'/>)
      .catch(() => <CSRPage user={session.user as UserClaims}/>)
  }
)