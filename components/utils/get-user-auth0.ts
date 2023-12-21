import type {Session as Auth0Session} from "@auth0/nextjs-auth0";
import {getUser} from "@lib/modelFunctions/users";
import type {UserClaims, UsersInterface} from "@components/interface";

export const getUserAuth0 = async (
  sessionPromise: Promise<Auth0Session | undefined | null>
): Promise<UsersInterface> => {
  const session = await sessionPromise
  if (session === undefined || session === null) {
    throw new Error('Session is undefined or null')
  }
  const {user} = session
  if (!Object.hasOwn(user, 'email')) {
    throw new Error('Failed to parse user from session')
  }

  return getUser((user as unknown as UserClaims).email)
    .then((res) => {
      if (!res) {
        throw new Error('Failed to get user')
      }
      return res
    })
}