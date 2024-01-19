"use client"
import type {SelectChangeEvent} from "@mui/material";
import {FormControl, MenuItem, Select, Stack, Typography} from "@mui/material";
import type {ReactNode} from "react";
import React, {useEffect, useRef, useState} from "react";
import type {StudentResultResponse, StudentResultsTable, SemesterEnum} from "@components/interface";
import {AllModelsEnum, ExtendedModelEnum, ReplaceDeleteEnum} from "@components/interface";
import {HandleTable} from '@layouts/table';

interface SelectData {
  // gpa: string;
  // resultsData: StudentResultsTable[];
  semester: SemesterEnum;
  session?: string;
}

export function StudentPage({data}: { data: StudentResultResponse }): ReactNode {
  const {cgpa, results, sessionArray} = data;
  const resultsData = useRef<StudentResultsTable[]>([])
  const [gpa, setGpa] = useState("0")
  const [selectData, setSelectData] = useState<SelectData>({
    semester: 1, session: sessionArray.sort()[0],
  })

  useEffect(() => {
    // const tempResultData: StudentResultsTable[] = []
    resultsData.current = []
    let sessionCreditUnit = 0, sessionQualityPoint = 0;
    for (const result of results) {
      if (result.semester === selectData.semester && result.session === selectData.session) {
        resultsData.current.push(result)
        sessionCreditUnit += result.creditUnit
        sessionQualityPoint += result.qualityPoint
      }
    }

    setGpa((sessionQualityPoint / sessionCreditUnit).toFixed(2))

  }, [selectData, results, resultsData]);

  const handleSelectChange = (event: SelectChangeEvent): void => {
    const {name, value} = event.target
    let update;
    if (name === 'session') {
      setSelectData({...selectData, session: value})
    } else if (name === 'semester') {
      update = parseInt(value, 10);
      if (!isNaN(update)) {
        setSelectData({...selectData, semester: update})
      }
    }
  }

  return (
    <Stack gap={2}>
      <Stack direction='row' sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography variant='h3'>Results</Typography>
        <Stack direction='row' gap={3}>
          <Stack direction='row' gap={1} sx={{
            alignItems: 'center'
          }}>
            <Typography>Session</Typography>

            <FormControl>
              <Select
                displayEmpty
                labelId="sessionSelectLabelId"
                name="session"
                onChange={handleSelectChange}
                value={selectData.session || ""}
              >
                {sessionArray.length !== 0 ? (
                  sessionArray.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))) : (
                  <MenuItem key="_session_none" value="">
                    <em>None</em>
                  </MenuItem>
                )}

              </Select>
            </FormControl>
          </Stack>
          <Stack direction='row' gap={1} sx={{
            alignItems: 'center'
          }}>
            <Typography>Semester</Typography>
            <FormControl>
              <Select
                displayEmpty
                labelId="semesterSelectLabelId"
                name="semester"
                onChange={handleSelectChange}
                value={selectData.semester.toString()}
              >
                {[1, 2, 3].map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>

      </Stack>

      <Stack gap={2}>
        <HandleTable
          data={resultsData.current}
          headLabel={[
            {id: 'courseCode', label: 'Course Code'},
            {id: 'creditUnit', label: 'Credit Unit'},
            {id: 'grade', label: 'Grade'},
            {id: 'approved', label: 'Approved'},
          ]}
          initialOrder="courseCode"
          modelType={ExtendedModelEnum.StudentResults}
          options={{replaceDelete: ReplaceDeleteEnum.Report}}
          parentModel={AllModelsEnum.Results}
       />
          <Stack direction='row' sx={{
            justifyContent: 'space-between',
          }}>
            <Typography>
              Grade Point Average: {gpa}
            </Typography>
            <Typography>
              Cumulative Grade Point Average: {cgpa}
            </Typography>
          </Stack>
      </Stack>
    </Stack>
)
}
