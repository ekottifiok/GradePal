import { model, models, Schema } from "mongoose";
import type { ResultsInterface } from "@components/interface";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- it's not always truthy
export const Results = models?.Results || model<ResultsInterface>('Results', new Schema({
  matriculationNumber: {
    type: String,
    required: true,
    unique: true
  },
  results: [{
    uploadedAt: Date,
    uploadedBy: String,
    courseCode: String,
    session: String,
    score: Number,
    grade: String,
    qualityPoint: Number,
    approved: { type: Boolean, default: false },
    // from base document
    deletedAt: { type: Date },
    deletedBy: { type: Schema.Types.ObjectId }
  }],
}, { timestamps: true }))
