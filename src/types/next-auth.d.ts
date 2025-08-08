import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      phone?: string;
      avatar?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    phone?: string;
    avatar?:string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    avatar?:string;
    phone?: string;
  }
}
