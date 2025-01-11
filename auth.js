import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/connectDB";

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    console.error("No credentials provided");
                    throw new Error("No credentials provided");
                }
                try {
                    const db = await connectDB();
                    const userCollection = db.collection("users");
                    const query = { email: credentials?.email };
                    const user = await userCollection.findOne(query);

                    if (user && bcrypt.compare(credentials.password, user.password)) {
                        return {
                            name: user.fullName,
                            email: user.email,
                            image: user.profileImage || null
                        };
                    } else {
                        throw new Error("Invalid email or password");
                    }
                } catch (err) {
                    console.error("Error during authorization:", err);
                    throw new Error("Authorization failed");
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    // callbacks: {
    //     async session({ session, token, user }) {
    //         session.user = {
    //             id: token.sub,
    //             name: token.name,
    //             email: token.email,
    //             image: token.picture || null
    //         };
    //         return session;
    //     },
    //     async jwt({ token, user }) {
    //         if (user) {
    //             token.sub = user.id;
    //             token.name = user.name;
    //             token.email = user.email;
    //             token.picture = user.image;
    //         }
    //         return token;
    //     }
    // }
})