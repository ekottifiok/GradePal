import {Schema} from 'mongoose';
import {dbConnect} from '@lib/database';
import type {CoursesInterface, CUCourses} from '@components/interface';
import {Courses} from '@models'

interface CheckIfCourseExist {
  courseCode?: string;
  creditUnit?: number;
  department?: string;
  title?: string;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any -- create returns any
export async function createCourse(data: CUCourses): Promise<any> {
  await dbConnect();
  return Courses.create<CoursesInterface>(data)
}

export async function checkIfCourseExist(filter: CheckIfCourseExist): Promise<CoursesInterface | null> {
  await dbConnect();
  return Courses.findOne<CoursesInterface>(filter)
    .then((res) => (
      JSON.parse(JSON.stringify(res)) as CoursesInterface | null
    ))

}

export async function getAllCourses(): Promise<CoursesInterface[]> {
  await dbConnect();
  return Courses.find<CoursesInterface>({}).where('deletedAt').equals(undefined)
    .then((res) => (
      JSON.parse(JSON.stringify(res)) as CoursesInterface[]
    ))
}

export async function getOneCourse(id: string): Promise<CoursesInterface | null> {
  await dbConnect();
  return Courses.findById<CoursesInterface>(id)
    .then((res) => (
      JSON.parse(JSON.stringify(res)) as CoursesInterface | null
    ))
}

export async function deleteCourse(id: string, userId: string): Promise<CoursesInterface | null> {
  await dbConnect();
  return Courses.findByIdAndUpdate<CoursesInterface>(id, {
    deletedAt: Date.now(), deletedBy: new Schema.Types.ObjectId(userId)
  });
}

export async function modifyCourse(id: string, updateData: Omit<CUCourses, 'createdBy'>): Promise<CoursesInterface | null> {
  await dbConnect();
  return Courses.findByIdAndUpdate<CoursesInterface>(id, updateData)
}
