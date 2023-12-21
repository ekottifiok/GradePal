import {getSession, withApiAuthRequired} from '@auth0/nextjs-auth0';
import {NextResponse} from 'next/server';
import {deleteResult} from '@lib/modelFunctions/results'
import {getUserAuth0} from "@components/utils/get-user-auth0";
import type {EdgeStoreReply, ResponseReply} from "@components/interface";
import {NotificationType} from "@components/interface";
import {ResultQueue} from "@lib/queues";
import {addNotification} from "@lib/modelFunctions";

export const DELETE = withApiAuthRequired(
  async (req): Promise<NextResponse<ResponseReply>> => Promise.all(
    [req.json(), getUserAuth0(getSession(req, new NextResponse()))]
  )
    .then(([inputData, user]) => {
      const {id} = inputData as { id?: string }

      if (!id) {
        return NextResponse.json<ResponseReply>(
          {

            error: {
              FormDataFailure: "Form not filled completely"
            }
          }, {status: 500}
        )
      }

      const {_id} = user
      return deleteResult(id, _id)
        .then(() => NextResponse.json<ResponseReply>({message: "Deleted Successfully"}))
        .catch((error) => NextResponse.json<ResponseReply>(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- I want to use any
          {error: {DatabaseError: "Failed to delete result"}, extra: error}, {status: 500}
        ))
    })
    .catch(() => NextResponse.json<ResponseReply>(
      {error: {LoginFailure: "User failed login authentication"}}, {status: 500}
    ))
)

interface POSTReply extends EdgeStoreReply {
  session?: string;
}

export const POST = withApiAuthRequired(
  async (req): Promise<NextResponse<ResponseReply>> => Promise.all(
    [req.json(), getUserAuth0(getSession(req, new NextResponse()))]
  ).then(async ([inputData, user]) => {
    const {name, _id, department} = user
    const formReply = inputData as POSTReply | undefined;

    if (!formReply) {
      return NextResponse.json<ResponseReply>(
        {error: {FormDataFailure: "Failed to handle sent data"}}
      )
    }

    if (!department) {
      return NextResponse.json<ResponseReply>(
        {error: {FormDataFailure: "Department lacking on your information"}}
      )
    }

    const {url, uploadedAt, session} = formReply
    if (!url || !uploadedAt || !session) {
      return NextResponse.json<ResponseReply>(
        {error: {FormDataFailure: "A required data is missing"}},
        {status: 500}
      )
    }

    const data = await ResultQueue.enqueue({session, url, uploadedAt, uploadedBy: name, department})
    await addNotification(_id, "Result Upload", NotificationType.Upload)
    return NextResponse.json<ResponseReply>(
      {message: "Success", extra: JSON.stringify({guid: data.id})}
    );
  })
)
