/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment -- bulkWrite requires any */
import {existsSync, mkdirSync, writeFileSync} from "node:fs";
import {join} from "node:path";
import {read, utils} from 'xlsx';
import {Queue} from "quirrel/next-app"
import {kebabCase} from "lodash";
import type {AnyBulkWriteOperation} from "mongodb";
import {createArrayOfResults} from "@lib/modelFunctions";
import type {
  BulkWriteArray,
  CoursesInterface,
  ResultQueueParameter,
  ResultsInterface,
  UsersInterface
} from "@components/interface";
import {AllModelsEnum, ReportOptions} from "@components/interface";
import {Courses, Results, Users} from "@models";
import {fDateTime} from "@components/utils";
import {dbConnect} from "@lib/database";

export const ResultQueue = Queue<ResultQueueParameter>(
  "api/queues/results", // 👈 the route it's reachable on
  async (job, {id}) => {
    const {department, session, url, uploadedAt, uploadedBy} = job;
    const report: {
      models: AllModelsEnum,
      status: ReportOptions,
      extra: any
    }[] = [];
    const bulkWrite: BulkWriteArray = {courses: [], results: [], users: [], error: []};

    await fetch(url).then(async (result) => result.arrayBuffer())
      .then(async (res) => {
        const data = new Uint8Array(res);
        const workBook = read(data);
        const sheets = workBook.SheetNames
        await Promise.all(sheets.map(async (sheetName) => {
          const workSheet = workBook.Sheets[sheetName]
          const sheetToJson = utils.sheet_to_json(workSheet);
          const courseDetails = sheetName.split('-').map(item => item.trim());

          await createArrayOfResults(
            sheetToJson, uploadedBy, department, courseDetails, session, uploadedAt
          ).then(({results, users, error, courses}) => {
            bulkWrite.courses.push(...courses)
            bulkWrite.results.push(...results);
            bulkWrite.users.push(...users);
            bulkWrite.error.push(...error)
          })
        }))
      })
      .then(async () => {
        await dbConnect()
        await Courses.bulkWrite<CoursesInterface>(bulkWrite.courses as unknown as AnyBulkWriteOperation<any>[])
          .then((extra) => report.push({
            models: AllModelsEnum.Courses, status: ReportOptions.Created, extra
          }))
          .catch((extra) => report.push({
            models: AllModelsEnum.Courses, status: ReportOptions.Error, extra
          }))
        await Results.bulkWrite<ResultsInterface>(bulkWrite.results as unknown as AnyBulkWriteOperation<any>[])
          .then((extra) => report.push({
            models: AllModelsEnum.Results, status: ReportOptions.Created, extra
          }))
          .catch((extra) => report.push({
            models: AllModelsEnum.Results, status: ReportOptions.Error, extra
          }))
        await Users.bulkWrite<UsersInterface>(bulkWrite.users as unknown as AnyBulkWriteOperation<any>[])
          .then((extra) => report.push({
            models: AllModelsEnum.Users, status: ReportOptions.Created, extra
          }))
          .catch((extra) => report.push({
            models: AllModelsEnum.Users, status: ReportOptions.Error, extra
          }))
      })
      .then(() => {
        let path = join(process.cwd(), 'public', 'results-report', kebabCase(uploadedBy))
        if (!existsSync(path)) {
          mkdirSync(path, {recursive: true})
        }
        path = join(path, `${id}@${fDateTime()}.json`)
        writeFileSync(path, JSON.stringify({report, error: bulkWrite.error}))
      })
  })
