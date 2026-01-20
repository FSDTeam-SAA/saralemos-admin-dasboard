import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Allow access if user is logged in and has the ADMIN role
      return token?.role === "ADMIN";
    },
  },
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/",
    "/UpdateHero",
    "/Usermanagement",
    "/subscription",
    "/settings/:path*",
  ],
};
