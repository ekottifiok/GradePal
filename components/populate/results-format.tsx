import type {CSSProperties, ReactElement} from "react";
import {IMAGE_PATH} from "@components/constants";

const handleImage = (name: string, sx?: CSSProperties): ReactElement => (
  <img alt="" loading="lazy" src={IMAGE_PATH.concat('steps/', name)} style={sx}/>
)

export const resultFormatPopulate: { content: string, key: number, image: ReactElement }[] = [
  {
    content: "Save the file with any name you choose",
    key: 1, image: handleImage("step1.png", {width: "123px"})
  },
  {
    content: "Ensure the sheets are saved with a name, the name should have the format {course_name}.{semester} - {course_title} - {credit_unit}",
    key: 2, image: handleImage("step2.png", {width: "191px"})
  },
  {
    content: "The table head should be Name, Matriculation Number and Score in any order",
    key: 3, image: handleImage("step3.png", {width: "336px"})
  },
  {
    content: "The data type for Name should be a string, Matriculation Number should be a string and Score should be a number",
    key: 4, image: handleImage("step4.png", {width: "395px"})
  },
  {
    content: "You can have as many sheets as you wish but you must follow the steps above to ensure results are parsed",
    key: 5, image: handleImage("step5.png", {width: "603px"})
  }
]