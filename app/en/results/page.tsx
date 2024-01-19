import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import type {ReactElement} from "react";
import type {Metadata} from 'next'
import {getStudentResult} from '@lib/modelFunctions';
import {getAllResults} from '@lib/modelFunctions/results';
import {getUserAuth0} from "@components/utils";
import {StaffPage} from "./staff-page";
import {StudentPage} from './student-page';

export const metadata: Metadata = {
  title: 'GradePal - Results',
}

// eslint-disable-next-line import/no-default-export -- required by Next.js
export default withPageAuthRequired(
  async (): Promise<ReactElement> => Promise.all([getAllResults(), getUserAuth0(getSession())])
    .then(async ([allResults, user]) => {
      return user.isStaff ? <StaffPage results={allResults}/> : (
        <StudentPage data={await getStudentResult(user.matriculationNumber)}/>
      )
    })
)
