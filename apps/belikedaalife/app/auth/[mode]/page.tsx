import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID||"",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET||" ",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,  // You can generate a secret using `openssl rand -base64 32`
  pages: {
     // Optional: Customize sign-in page
  },
});
