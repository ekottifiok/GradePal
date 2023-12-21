import { handleAuth} from "@auth0/nextjs-auth0";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- it's how auth0/nextjs-auth0 works
export const GET = handleAuth();
