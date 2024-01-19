/* eslint-disable @typescript-eslint/no-explicit-any -- MergeType from mongoose is any */
// noinspection JSUnusedGlobalSymbols

import type {Document, MergeType, Schema} from "mongoose";

export enum ReportOptions {Created = 'Created', Error = 'Error'}

export enum NotificationType { Message = 0, Upload = 1}

export enum SemesterEnum {First = 1, Second = 2, Third = 3}

export interface Report {
  matriculationNumber: string;
  status: ReportOptions;
  description: string | MergeType<any, Omit<AllModels, "_id">>[];
}

export interface ResultJson {
  'Matriculation Number': string;
  'Name': string;
  'Score': string;
}

export interface BaseDocument extends Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  deletedBy: Schema.Types.ObjectId;
}

export interface CUCourses {
  courseCode: string;
  createdBy: string;
  creditUnit: number;
  department: string;
  modifiedBy?: string;
  semester: SemesterEnum;
  title: string;
}

export interface Notification {
  icon?: string;
  title: string;
  createdAt: Date;
  isUnRead: boolean;
  type: NotificationType;
  action: "Pending" | "Done";
}

export interface ResultData {
  uploadedAt: Date;
  uploadedBy: string;
  courseCode: string;
  qualityPoint: number;
  session: string;
  score: number;
  grade: string;
  approved: boolean;
}

export interface StudentResultsTable extends Pick<BaseDocument, '_id'>, Pick<CUCourses, 'title' | 'creditUnit' | 'semester'>, ResultData {
}

export interface StudentResultResponse {
  cgpa: string;
  sessionArray: string[];
  results: StudentResultsTable[];
}

export interface GetStudentResultParameter {
  resultsIdList: string[]
  data: StudentResultResponse[]
}

export interface CUResults {
  matriculationNumber: string;
  results: ResultData[];
}

export interface CUUsers {
  department?: string;
  email?: string;
  gender?: string;
  matriculationNumber?: string;
  name: string;
  picture?: string;
  staffRole?: string;
}

export interface CoursesInterface extends CUCourses, BaseDocument {
}

export interface ResultsInterface extends CUResults, BaseDocument {
}

export interface UsersInterface extends CUUsers, BaseDocument {
  isLoggedInBefore: boolean;
  isStaff: boolean;
  isSignedUp: boolean;
  notification?: Notification
}

export type AllModels = UsersInterface | CoursesInterface | ResultsInterface

export enum AllModelsEnum {
  Courses = 'Courses',
  Results = 'Results',
  Users = 'Users',
}
