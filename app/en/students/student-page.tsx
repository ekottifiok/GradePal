"use client"
import Box from "@mui/material/Box";
import type {ReactNode} from "react";
import type {CoursesInterface, UsersInterface} from "@components/interface";

interface Parameters {
    courses: CoursesInterface[];
    user: UsersInterface;
}

export function StudentPage({}: Parameters): ReactNode {
  return (
    <Box>
        Student Students
    </Box>
  )
}