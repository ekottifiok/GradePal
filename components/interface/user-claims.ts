import type {Claims} from "@auth0/nextjs-auth0";

export interface UserClaims extends Claims {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  email: string;
  email_verified: string;
  sub: string
  sid: string;
}