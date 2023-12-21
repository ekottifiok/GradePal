import type {StudentResultResponse} from "@components/interface/models";

export interface ResponseReply {
  error?: Error;
  message?: string | StudentResultResponse[];
  extra?: string;
}

export interface Error {
  FormDataFailure?: string;
  LoginFailure?: string;
  DatabaseError?: string;
  DocumentAlreadyExists?: string;
}

export interface EdgeStoreReply {
  url?: string,
  size?: number,
  uploadedAt?: Date,
  metadata?: Record<string, never>,
  path?: Record<string, never>,
  pathOrder?: string[]
}