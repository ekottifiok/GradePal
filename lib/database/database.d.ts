import type {Mongoose} from "mongoose"

declare global {
  // eslint-disable-next-line no-var -- important for setting global variables
  var dbUrl: string | undefined
  var mongooseConnection: {
    promise?: Promise<Mongoose>;
    conn?: Mongoose;
  } | undefined
}