//code next auth
import NextAuth from "next-auth";
import { nextAuthConfig } from "@/lib/nextauth.confg";          

const handler = NextAuth(nextAuthConfig);
//api handler 

export { handler as GET, handler as POST };