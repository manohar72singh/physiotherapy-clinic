import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Protect Admin Routes
    if (path.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/login?role=admin", req.url));
    }

    // Protect Patient Routes
    if (path.startsWith("/patient-portal") && token?.role !== "patient") {
      return NextResponse.redirect(new URL("/login?role=patient", req.url));
    }
  },
  {
    callbacks: {
      // Return true to allow the middleware function to run
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    }
  }
);

export const config = {
  matcher: ["/admin/:path*", "/patient-portal/:path*"],
};
