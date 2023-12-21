import React from 'react';
import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {Box} from "@mui/material";
import type {Metadata} from "next";
import {getAllCourses, getAllStudents} from "@lib/modelFunctions";
import {getUserAuth0} from "@components/utils";
import {StaffPage} from './staff-page';
import {StudentPage} from "./student-page";

export const metadata: Metadata = {
  title: 'GradePal - Students',
}

// eslint-disable-next-line import/no-default-export -- required by Next.js
export default withPageAuthRequired(
  async () => Promise.all([getAllCourses(), getAllStudents(), getUserAuth0(getSession())])
    .then(([courses, students, user]) => (
      <Box>
        {user.isStaff ? (
          <StaffPage students={students} user={user}/>
        ) : (
          <StudentPage courses={courses} user={user}/>
        )}
      </Box>
    ))
)
