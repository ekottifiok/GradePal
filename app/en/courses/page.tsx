import type {ReactElement} from "react";
import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {Box} from "@mui/material";
import type {Metadata} from "next";
import {getAllCourses} from '@lib/modelFunctions/courses';
import {getUserAuth0} from "@components/utils/get-user-auth0";
import Error from '@app/error';
import {StaffPage} from './staff-page'
import {StudentPage} from "./student-page";

export const metadata: Metadata = {
  title: 'GradePal - Courses',
}

// eslint-disable-next-line import/no-default-export -- required by Next.js
export default withPageAuthRequired(
  async (): Promise<ReactElement> => Promise.all([getAllCourses(), getUserAuth0(getSession())])
    .then(([courses, user]) => (
      <Box>
        {user.isStaff ? (
          <StaffPage courses={courses} user={user}/>
        ) : (
          <StudentPage/>
        )}
      </Box>
    ))
    .catch((e: {stack: string, message: string}) => {
      return <Error error={e.message}/>
    })
);