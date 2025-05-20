import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin", //
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/jobs/:path*",
    "/protected/:path*",
  ],
};