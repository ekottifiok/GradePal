import {withApiAuthRequired} from "@auth0/nextjs-auth0";
import {NextResponse} from "next/server";
import {Users} from "@models";
import type {ResponseReply} from "@components/interface";

export const POST = withApiAuthRequired(
  async (req): Promise<NextResponse<ResponseReply>> => {
  const {fullName, matriculationNumber, department} = await req.json() as {
    fullName?: string, matriculationNumber?: string, department?: string
  };

  if (!fullName || !matriculationNumber || !department) {
    return NextResponse.json<ResponseReply>(
      {error: {FormDataFailure: "Form not filled completely"}},
      {status: 500}
    )
  }

  return Users.create({fullName, matriculationNumber, department})
    .then(() => NextResponse.json(
      {message: "success"}, {status: 201}
    ))
    .catch((error) => NextResponse.json<ResponseReply>(
      {
        error: {DatabaseError: "Failed to create course"},
        extra: error as never
      }, {status: 500}
    ));
})