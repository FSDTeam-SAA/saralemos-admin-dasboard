// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const res = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();
          // console.log("API Login Response:", data);

          if (!res.ok) {
            throw new Error(data.message || "Login failed");
          }

          const user = data.data?.user;
          const token = data.data?.accessToken;

          // console.log("API Login Response:", );

          return {
            id: user?.id || user?._id || "unknown",
            email: user?.email || credentials.email,
            role: user?.role || "",
            accessToken: token, // Mapped to accessToken
            refreshToken: "", // Default or actual refresh token if available
            name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(), // Construct name
          };
        } catch (error) {
          console.error("Authorize error:", error);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user?.role as string;
        token.accessToken = user?.accessToken as string; 
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        // Construct session.user to match Session interface if needed, or leave as is if it's correct
        // Currently inline types were removed, so it uses global types.
        // Global Session type has user: User. 
        // We need to ensure we populate it correctly or that next-auth does it.
        // Usually we need to manually map.
        session.user = {
            id: token.id,
            email: token.email,
            role: token.role,
            name: token.name,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken
        } as any; // Type assertion to avoid strict checks usually needed here if types are tricky
        
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
