"use client"
import type {SelectChangeEvent} from "@mui/material";
import {FormControl, MenuItem, Select, Stack, Typography} from "@mui/material";
import type {ReactNode} from "react";
import React, {useEffect, useState} from "react";
import type {StudentResultResponse} from "@components/interface";
import {AllModelsEnum, ExtendedModelEnum} from "@components/interface";
import {HandleTable} from '@layouts/table';

export function StudentPage({results}: {results: StudentResultResponse[]}): ReactNode {
  const [cgpa, setCgpa] = useState<number>(NaN)
  const [session, setSession] = useState<StudentResultResponse | undefined>(undefined)
  const sessionCreditUnit = session?.results.reduce(
    (sum, value) => sum + value.creditUnit, 0
  ) || 0
  const sessionQualityPoint = session?.results.reduce(
    (sum, value) => sum + value.qualityPoint, 0
  ) || 0
  const gpa = sessionQualityPoint / sessionCreditUnit

  useEffect((): void => {

    if (results.length !== 0) {
      setSession(results[0])
    }
    const totalCreditUnit = results.reduce((sum, value) => (
      sum + value.results.reduce((_sum, _value) => _sum + _value.creditUnit, 0)
    ), 0)
    const totalGradePoint = results.reduce((sum, value) => (
      sum + value.results.reduce((_sum, _value) => _sum + _value.qualityPoint, 0)
    ), 0)
    setCgpa(totalGradePoint / totalCreditUnit);
  }, [results]);

  const handleSelectChange = (event: SelectChangeEvent): void => {
    setSession(results.filter(i => i.session === event.target.value)[0])
  }

  return (
    <Stack gap={2}>
      <Stack direction='row' sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography variant='h4'>Results</Typography>
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
              value={session ? session.session : ""}
            >
              {session ? (
                results.reverse().map((item) => (
                  <MenuItem key={item.id} value={item.session}>
                    {item.session}
                  </MenuItem>
                ))) : (
                <MenuItem key="_session_none" value="">
                  <em>None</em>
                </MenuItem>
              )}

            </Select>
          </FormControl>
        </Stack>

      </Stack>

      <Stack gap={2}>
        <HandleTable
          data={session?.results || []}
          headLabel={[
            {id: 'courseCode', label: 'Course Code'},
            {id: 'creditUnit', label: 'Credit Unit'},
            {id: 'grade', label: 'Grade'},
            {id: 'approved', label: 'Approved'},
          ]}
          initialOrder="courseCode"
          modelType={ExtendedModelEnum.StudentResults}
          parentModel={AllModelsEnum.Results}
        />
        <Stack direction='row' sx={{
          justifyContent: 'space-between',
        }}>
          <Typography>
            Grade Point Average: {Number.isNaN(gpa) ? 0 : (
            gpa.toFixed(2)
          )}
          </Typography>
          <Typography>
            Cumulative Grade Point Average: {Number.isNaN(cgpa) ? 0 : (
            cgpa.toFixed(2)
          )}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
