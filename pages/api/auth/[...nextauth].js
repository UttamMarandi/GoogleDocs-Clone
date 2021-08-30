import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { db } from "../../../firebase";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGlE_CLIENT_ID,
      clientSecret: process.env.GOOGlE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: FirebaseAdapter(db),

  // A database is optional, but required to persist accounts in a database
  //   database: process.env.DATABASE_URL,
});
