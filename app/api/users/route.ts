import {getSession, withApiAuthRequired} from "@auth0/nextjs-auth0"
import {NextResponse} from 'next/server';
import {createUser} from '@lib/modelFunctions/users';
import type {ResponseReply, UserClaims} from "@components/interface";
import {getUserAuth0} from "@components/utils/get-user-auth0";

export const GET = withApiAuthRequired(
  async (req): Promise<NextResponse<ResponseReply>> => getUserAuth0(
    getSession(req, new NextResponse()))
    .then((user) => NextResponse.json<ResponseReply>(
      {message: JSON.stringify(user)}, {status: 200}
    ))
    .catch(() => NextResponse.json<ResponseReply>(
      {error: {LoginFailure: "User failed login authentication"}}, {status: 500}
    ))
)

export const POST = withApiAuthRequired(
  async (req): Promise<NextResponse<ResponseReply>> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- body data is any
    const inputData = await req.json()
    const sessionPromise = getSession(req, new NextResponse())

    return Promise.all(
      [inputData, sessionPromise, getUserAuth0(sessionPromise)]
    )
      .then(() => NextResponse.json<ResponseReply>(
        {error: {DocumentAlreadyExists: "This user already exists"}}, {status: 500}
      ))
      .catch(async () => {
        // eslint-disable-next-line prefer-const -- some values are reassigned
        let {department, matriculationNumber, gender, staffRole} = inputData as {
          department?: string, matriculationNumber?: string,
          gender?: string, staffRole?: string
        }

        if (!department || !gender || !(matriculationNumber || staffRole)) {
          return NextResponse.json<ResponseReply>(
            {
              error: {
                FormDataFailure: "Form not filled completely"
              }
            }, {status: 500}
          )
        }
        const session = await sessionPromise;
        if (!session) {
          return NextResponse.json<ResponseReply>(
            {error: {LoginFailure: "User failed login authentication"}}, {status: 500}
          )
        }
        const user = session.user as UserClaims;

        matriculationNumber = matriculationNumber === '' ? undefined : matriculationNumber
        staffRole = staffRole === '' ? undefined : staffRole

        const {email, name, picture} = user
        return createUser({
          department, email, matriculationNumber,
          gender, picture, name, staffRole
        }, Boolean(staffRole), true)
          .then((_res) => NextResponse.json<ResponseReply>(
            {message: "Registered successfully, please wait"}, {status: 201}
          ))
          .catch((error) => NextResponse.json<ResponseReply>(
            {
              error: {
                DatabaseError: "Failed to create user",
              },
              extra: error as never
            }, {status: 500}
          ))


      })
  }
)
