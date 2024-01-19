import { Schema } from "mongoose";
import { dbConnect } from "@lib/database";
import type {
  BaseDocument,
  BulkWriteArray,
  CUResults,
  ResultData,
  ResultJson,
  ResultsInterface,
  StudentResultResponse,
  StudentResultsTable,
} from "@components/interface";
import { Courses, Results, Users } from "@models";
import { getAllCourses } from "./courses";


const ResultsFields = ['Matriculation Number', 'Name', 'Score']

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- create returns any
export async function createResult(data: CUResults): Promise<any> {
  await dbConnect();
  return Results.create(data);
}

export async function createArrayOfResults(
  resultArray: unknown[], uploadedBy: string, department: string,
  courseDetails: string[], session: string, uploadedAt: Date
): Promise<BulkWriteArray> {
  await dbConnect();
  const bulkWrite: BulkWriteArray = { courses: [], results: [], users: [], error: [] };

  if (courseDetails.length !== 3) {
    bulkWrite.error.push({
      description: 'Failed to parse course details',
      extra: courseDetails
    })
    return bulkWrite
  }

  const [courseCodeSemester, courseTitle, creditUnitStr] = courseDetails
  const [courseCode, semesterString] = courseCodeSemester.split('.')
  const creditUnit = parseInt(creditUnitStr, 10);
  const semester = parseInt(semesterString, 10);
  if (Number.isNaN(creditUnit)) {
    bulkWrite.error.push({
      extra: courseDetails,
      description: 'Failed to parse creditUnit'
    })
    return bulkWrite
  }
  if (!courseCode) {
    bulkWrite.error.push({
      extra: courseCodeSemester,
      description: 'Failed to find course code'
    })
    return bulkWrite
  }
  if (!courseTitle) {
    bulkWrite.error.push({
      extra: courseCodeSemester,
      description: 'Failed to find course title'
    })
    return bulkWrite
  }
  if (Number.isNaN(semester)) {
    bulkWrite.error.push({
      extra: courseCodeSemester,
      description: 'Failed to parse semester'
    })
    return bulkWrite
  }

  await Courses.exists({ courseCode, creditUnit, department, semester })
    .then((res) => {
      if (!res) {
        bulkWrite.courses.push({
          updateOne: {
            filter: { courseCode, title: courseTitle },
            update: {
              courseCode,
              department,
              creditUnit,
              createdBy: uploadedBy,
              semester,
              title: courseTitle,
            },
            upsert: true
          }
        })
      }
    })


  return Promise.all(resultArray.map(async (dataUnknown: unknown) => {
    if (!dataUnknown || typeof dataUnknown !== "object") {
      bulkWrite.error.push({
        description: "Failed to ensure that the json data is not null or an object",
        extra: resultArray
      })
      return
    }
    if (!ResultsFields.every(key => Object.hasOwn(dataUnknown, key))) {
      bulkWrite.error.push({
        description: "Failed to ensure that the json data contains all result field",
        extra: resultArray
      })
      return
    }
    const data = dataUnknown as ResultJson
    const matriculationNumber = data['Matriculation Number']
    const name = data.Name
    const score = parseInt(data.Score, 10)
    if (isNaN(score)) {
      bulkWrite.error.push({ extra: resultArray, description: "Failed to parse score" })
      return
    }

    let grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F', gradePoint: 5 | 4 | 3 | 2 | 1 | 0
    if (score >= 70) {
      grade = 'A'
      gradePoint = 5
    } else if (score >= 60) {
      grade = 'B'
      gradePoint = 4
    } else if (score >= 50) {
      grade = 'C'
      gradePoint = 3
    } else if (score >= 40) {
      grade = 'D'
      gradePoint = 2
    } else if (score >= 30) {
      grade = 'E'
      gradePoint = 1
    } else {
      grade = 'F'
      gradePoint = 0
    }

    await Users.exists({ name, matriculationNumber })
      .then((user) => {
        if (!user) {
          bulkWrite.users.push({
            insertOne: {
              // @ts-expect-error -- according to mongoose documentation this is fine
              document: {
                name, department, matriculationNumber,
                picture: `images/avatars/avatar_${Math.floor(Math.random() * 25)}.jpg`
              }
            }
          })
        }
      });
    bulkWrite.results.push({
      updateOne: {
        filter: { matriculationNumber },
        update: {
          $set: { matriculationNumber },
          $push: {
            results: {
              uploadedBy, courseCode, session, score, grade,
              uploadedAt, approved: false, qualityPoint: gradePoint * creditUnit
            }
          }
        },
        upsert: true
      }
    })


  }))
    .then(() => bulkWrite)
    .catch((e) => {
      bulkWrite.error.push({ extra: e as unknown, description: "Unhandled error" })
      return bulkWrite
    })
}


export async function getAllResults(): Promise<ResultsInterface[]> {
  await dbConnect();
  return Results.find({}).where('deletedAt').equals(undefined)
    .then((res) => JSON.parse(
      JSON.stringify(res)) as ResultsInterface[]
    )
}

export async function getOneResult(id: string): Promise<ResultsInterface | null> {
  await dbConnect();
  return Results.findById<ResultsInterface>(id).where('deletedAt').equals(undefined)
    .then((res) => JSON.parse(
      JSON.stringify(res)) as ResultsInterface | null
    )
}

export async function getStudentResult(matriculationNumber?: string): Promise<StudentResultResponse> {
  let totalCreditUnit = 0, totalQualityPoint = 0;
  const results: StudentResultsTable[] = [], sessionArray: string[] = [];
  const initialResponse = { cgpa: '0', results, sessionArray }

  if (!matriculationNumber) {
    return initialResponse
  }

  await dbConnect();
  return Promise.all([Results.findOne<ResultsInterface>({ matriculationNumber }), getAllCourses()])
    .then(([resultsInterface, courses]) => {
      if (!resultsInterface) {
        return initialResponse
      }
      const resultsData = resultsInterface.results
      if (resultsData.length === 0) {
        return initialResponse
      }

      resultsData.forEach((itemResults) => {
        const item = JSON.parse(JSON.stringify((itemResults))) as ResultData & Pick<BaseDocument, '_id'>
        const { creditUnit, semester, title } = courses.filter(i => i.courseCode === item.courseCode)[0]
        totalCreditUnit += creditUnit
        totalQualityPoint += item.qualityPoint
        if (!sessionArray.includes(item.session)) {
          sessionArray.push(item.session)
        }
        results.push({ ...item, title, creditUnit, semester })

      })
      return {
        cgpa: (totalQualityPoint / totalCreditUnit).toFixed(2),
        results, sessionArray: sessionArray.sort()
      }
    })
}

export async function deleteResult(id: string, userId: string): Promise<ResultsInterface | null> {
  await dbConnect();
  return Results.findByIdAndUpdate<ResultsInterface | null>(id, {
    deletedAt: Date.now(), deletedBy: new Schema.Types.ObjectId(userId)
  });
}
