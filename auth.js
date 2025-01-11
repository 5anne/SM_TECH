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
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                console.log(credentials.email);
                if (!credentials) {
                    console.error("No credentials provided");
                    throw new Error("No credentials provided");
                }
                try {
                    const db = await connectDB();
                    const userCollection = db.collection("users");
                    const query = { email: credentials?.email };
                    const user = await userCollection.findOne(query);
                    if (user) {
                        const isMatch = await bcrypt.compare(credentials?.password, user?.password);
                        // console.log(isMatch)
                        if (isMatch) {

                            const token = process.env.JWT_SECRET;
                            console.log(token);
                            const resp = {
                                success: true,
                                message: "User logged in successfully",
                                user: user,
                                token: token,
                            };
                            // console.log(resp);
                            return resp;
                        } else {
                            throw new Error("Check Your Password");
                        }
                    } else {
                        throw new Error("User Not Found");
                    }
                } catch (err) {
                    console.error("Error during authorization:", err);
                    throw new Error(err);
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
    callbacks: {
        async jwt({ token, user }) {
            // console.log("jwt user",user);
            if (user) {
                token.id = user.user.id;
                token.email = user.user.email;
                token.name = user.user.fullName;
                token.token = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            // console.log("from session--------",session);
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.token = token.token;
            return session;
        },
    },
})