import { model, models, Schema } from "mongoose";
import type {CoursesInterface} from "@components/interface";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- it's not always truthy
export const Courses = models?.Courses || model<CoursesInterface>('Courses', new Schema({
    courseCode: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    creditUnit: { type: Number, required: true },
    createdBy: { type: String, required: true },
    department: { type: String, required: true },
    modifiedBy: { type: String },
    // from base document
    deletedAt: {type: Date},
    deletedBy: {type: Schema.Types.ObjectId}
}, { timestamps: true }))
