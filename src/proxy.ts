import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export const proxy = async (req: NextRequest) => {
  const { pathname } = req.nextUrl

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  })

  console.log("TOKEN:", token)
console.log("ROLE:", token?.role)
console.log("PATH:", pathname)
  //  Auth pages
  const authPages = ["/login", "/register"]

  // Public (NextAuth)
  const publicRoutes = ["/api/auth"]

  // ---- CASE 1: token hai & login/register open kiya ----
  if (token && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // ---- CASE 2: public routes ----
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // ---- CASE 3: token nahi & protected page ----
  if (!token && !authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Middleware Role-based Redirection
  const role = token?.role;

  // 1. Check for User routes
  if (pathname.startsWith("/user") && role !== "user") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // 2. Check for Delivery routes
  if (pathname.startsWith("/delivery") && role !== "deliveryBoy") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // 3. Check for Admin routes 
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next()
}
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|icons|api/auth).*)",
  ],
}