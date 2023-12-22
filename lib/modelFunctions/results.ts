import {Schema} from "mongoose";
import {v4 as uuidV4} from "uuid";
import {dbConnect} from "@lib/database";
import type {
  BulkWriteArray,
  CUResults,
  ResultDataId,
  ResultJson,
  ResultsInterface,
  StudentResultResponse,
  UsersInterface
} from "@components/interface";
import {Results, Users} from "@models";
import {getAllCourses} from "./courses";


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
  const bulkWrite: BulkWriteArray = {courses: [], results: [], users: [], error: []};

  if (courseDetails.length !== 3) {
    bulkWrite.error.push({
      description: 'Failed to parse course details',
      extra: courseDetails
    })
    return bulkWrite
  }

  const [courseCode, courseTitle, creditUnitStr] = courseDetails
  const creditUnit = parseInt(creditUnitStr, 10);
  if (Number.isNaN(creditUnit)) {
    bulkWrite.error.push({extra: courseDetails, description: 'Failed to parse creditUnit details'})
    return bulkWrite
  }

  bulkWrite.courses.push({
    updateOne: {
      filter: {courseCode, title: courseTitle},
      update: {
        courseCode,
        title: courseTitle,
        department,
        creditUnit,
        createdBy: uploadedBy
      },
      upsert: true
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
      bulkWrite.error.push({extra: resultArray, description: "Failed to parse score"})
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

    await Users.findOne<UsersInterface>({name, matriculationNumber})
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
        bulkWrite.results.push({
          updateOne: {
            filter: {matriculationNumber},
            update: {
              $set: {matriculationNumber}, $push: {
                results: {
                  uploadedBy, courseCode, session, score, grade,
                  uploadedAt, approved: false, qualityPoint: gradePoint * creditUnit
                }
              }
            },
            upsert: true
          }
        })

      })
  }))
    .then(() => bulkWrite)
    .catch((e) => {
      bulkWrite.error.push({extra: e as unknown, description: "Unhandled error"})
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

export async function getStudentResult(matriculationNumber: string | undefined): Promise<StudentResultResponse[]> {
  if (!matriculationNumber) {
    return []
  }
  await dbConnect();
  return Promise.all([Results.find<ResultsInterface>({matriculationNumber}), getAllCourses()])
    .then(([res, courses]) => {
      if (res.length === 0) {
        return []
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- JSON is any
      const resultsLists = res.map(i => JSON.parse(JSON.stringify(i.results)))[0] as ResultDataId[]
      const sessionList: string[] = []
      const resultsIdList: string[] = []
      const sortedList: StudentResultResponse[] = []

      resultsLists.forEach((item) => {
        if (item._id && !(resultsIdList.includes(item._id))) {
          resultsIdList.push(item._id)
        }
        const session = item.session;
        const coursesData = courses.filter(i => i.courseCode === item.courseCode)[0]
        const resultData = {
          ...item,
          courseTitle: coursesData.title,
          creditUnit: coursesData.creditUnit,
        }
        if (!(sessionList.includes(session))) {
          sessionList.push(session);
          sortedList.push({
            id: uuidV4(), session, results: [resultData]
          })
        } else {
          sortedList.forEach((value, index) => {
            if (value.session === session) {
              sortedList[index].results.push(resultData)
            }
          })
        }

      })
      return sortedList
    })
}

export async function deleteResult(id: string, userId: string): Promise<ResultsInterface | null> {
  await dbConnect();
  return Results.findByIdAndUpdate<ResultsInterface | null>(id, {
    deletedAt: Date.now(), deletedBy: new Schema.Types.ObjectId(userId)
  });
}
