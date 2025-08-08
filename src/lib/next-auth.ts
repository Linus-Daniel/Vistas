import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials?.password) {
          console.error("Missing email or password");
          throw new Error("Email and password are required");
        }

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          console.error("User not found for email:", credentials.email);
          throw new Error("Invalid credentials");
        }

        // For development: log the stored hash
        console.log("Stored hash:", user.password);
        console.log("Entered password:", credentials.password);

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isMatch) {
          console.error("Password mismatch for:", credentials.email);
          throw new Error("Invalid credentials");
        }

        // All good — return a safe user object
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          role: user.role || "user",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
        token.avatar = user.avatar

      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.phone = token.phone as string;
        session.user.avatar = token.avatar as string;234
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth", // your custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};
