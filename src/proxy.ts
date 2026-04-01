// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export default async function proxy(req: NextRequest) {
  try {
    //get token from the request (cookies or headers)
    const jwt = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET, 
    });

    console.log("MIDDLEWARE JWT ", jwt);
//to check if the token is decoded or not, if not decoded redirect to login page
    if (!jwt) {
      console.log(" JWT NOT DECODED - redirecting to login");
    
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }else {
    console.log(" JWT DECODED in Middleware:", jwt);
  }

  // If token is valid, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error);
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
}
// Define the paths that require authentication
export const config = {
  matcher: [
    "/shop",
    "/cart",
    "/favorites",
    "/profile",
    "/checkout",
    "/orders",
    "/orderdetails/:path*",
  ],
};