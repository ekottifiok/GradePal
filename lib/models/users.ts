import {model, models, Schema} from "mongoose";
import type {UsersInterface} from "@components/interface";


// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- it's not always truthy
export const Users = models?.Users || model<UsersInterface>('Users', new Schema({
  department: { type: String },
  email: {type: String, unique: true, sparse: true},
  gender: { type: String, },
  isSignedUp: { type: Boolean, default: false },
  isStaff: { type: Boolean, default: false },
  matriculationNumber: { type: String, unique: true, sparse: true},
  name: { type: String, required: true },
  picture: { type: String, }, staffRole: { type: String },
  // from base document
  deletedAt: {type: Date},
  deletedBy: {type: Schema.Types.ObjectId}
}, {timestamps: true}))
