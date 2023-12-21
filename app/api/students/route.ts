import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import {Users} from "@models";

export const POST = withApiAuthRequired(async (req) => {
  const { fullName, matriculationNumber, department } = await req.json();

  return await Users.create({ fullName, matriculationNumber, department })
    .then(() => NextResponse.json(
      { message: "success" }, { status: 201 }
    ))
    .catch((error) => {
      return NextResponse.json(
        { message: error }, { status: error.status || 500 })
    })
})