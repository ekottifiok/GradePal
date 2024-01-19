import type {AnyBulkWriteOperation} from "mongodb";
import type {CoursesInterface, ResultsInterface, UsersInterface} from "@components/interface/models";

export interface ResultQueueParameter {
  department: string;
  session: string;
  uploadedAt: Date;
  uploadedBy: string;
  url: string;
}

type CoursesBulk = AnyBulkWriteOperation<CoursesInterface>;
type ResultsBulk = AnyBulkWriteOperation<ResultsInterface>;
type UsersBulk = AnyBulkWriteOperation<UsersInterface>;

export interface BulkWrite {
  courses: CoursesBulk,
  results: ResultsBulk,
  users: UsersBulk,
}

export interface QueueError {
  description: string,
  extra: unknown
}

export interface BulkWriteArray {
  courses: CoursesBulk[],
  error: QueueError[],
  results: ResultsBulk[],
  users: UsersBulk[]
}
