"use client"
import Box from "@mui/material/Box";
import type {ReactNode} from "react";
import type {CoursesInterface, UsersInterface} from "@components/interface";
import {Typography} from "@mui/material";
import React from "react";

interface Parameters {
    courses: CoursesInterface[];
    user: UsersInterface;
}

export function StudentPage(): ReactNode {
  return (
    <Box>
      <Typography variant='h4'>Courses</Typography>

    </Box>
  )
}