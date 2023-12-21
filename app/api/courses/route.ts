import {getSession, withApiAuthRequired} from '@auth0/nextjs-auth0';
import type {NextRequest} from 'next/server';
import { NextResponse} from 'next/server';
import {createCourse, deleteCourse, getAllCourses, modifyCourse} from '@lib/modelFunctions';
import type {ResponseReply} from "@components/interface";
import {getUserAuth0} from "@components/utils/get-user-auth0";

export const GET = async (_req: NextRequest, _res: NextResponse): Promise<NextResponse<ResponseReply>> => {
  const hello = await getAllCourses()
  return NextResponse.json({message: "hello", extra: JSON.stringify(hello)})
}

export const DELETE = withApiAuthRequired(async (req): Promise<NextResponse<ResponseReply>> => (
  Promise.all([req.json(), getUserAuth0(getSession(req, new NextResponse()))])
    .then(([inputData, user]) => {
      const {id} = inputData as {
        id?: string
      };
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
      return deleteCourse(id, _id)
        .then((res) => {
          if (!res) {
            return NextResponse.json<ResponseReply>(
              {error: {DatabaseError: "Failed to delete"}}, {status: 500}
            )
          }
          return NextResponse.json<ResponseReply>({message: "Deleted successfully"})
        })

    })
    .catch(() => {
      return NextResponse.json<ResponseReply>(
        {error: {LoginFailure: "User failed login authentication"}}, {status: 500}
      )
    })
))

export const PATCH = withApiAuthRequired(async (req): Promise<NextResponse<ResponseReply>> => {
  return Promise.all([req.json(), getUserAuth0(getSession(req, new NextResponse()))])
    .then(([inputData, user]) => {
      const {id, courseCode, creditUnit, title} = inputData as {
        id?: string, courseCode?: string, creditUnit?: string, title?: string
      }
      const {department, name} = user
      const creditUnitInt = creditUnit ? parseInt(creditUnit, 10) : undefined;
      if (!id || !courseCode || !creditUnit || !title || !creditUnitInt || !department) {
        return NextResponse.json({error: {FormDataFailure: "id is missing in the form"}}, {status: 500});
      }
      return modifyCourse(id, {creditUnit: creditUnitInt, courseCode, title, modifiedBy: name, department})
        .then(() => NextResponse.json<ResponseReply>({message: "Updated Successfully"}, {status: 200}))
        .catch((_error) => NextResponse.json<ResponseReply>({error: {DatabaseError: "Failed to modify data"}}, {status: 500})
        )
    })

})

export const POST = withApiAuthRequired(async (req) => (
  Promise.all([req.json(), getUserAuth0(getSession(req, new NextResponse()))])
    .then(async ([inputData, user]) => {


      const {name, department} = user;
      const {courseCode, creditUnit, title} = inputData as {
        courseCode?: string,
        creditUnit?: string,
        title?: string
      }
      const creditUnitInt = creditUnit ? parseInt(creditUnit, 10) : undefined;
      if (!courseCode || !creditUnit || !title || !creditUnitInt) {
        return NextResponse.json(
          {
            message: {
              error: {
                FormDataFailure: "Form not filled completely"
              }
            }
          }, {status: 500}
        )
      }

      if (!department) {
        return NextResponse.json(
          {

            error: {FormDataFailure: "Department lacking on your information"}

          }, {status: 500}
        )
      }


      return createCourse({courseCode, creditUnit: creditUnitInt, title, createdBy: name, department})
        .then(() => NextResponse.json({
          message: {
            success: "Course created successfully"
          }
        }, {status: 201}))
        .catch((error) => NextResponse.json<ResponseReply>(
          {
            error: {
              DatabaseError: "Failed to create course",
            },
            extra: error as never
          }, {status: 500}
        ));


    })
    .catch(() => {
      return NextResponse.json<ResponseReply>(
        {error: {LoginFailure: "User failed login authentication"}}, {status: 500}
      )
    })
));
