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
                        if (isMatch) {
                            const token = process.env.JWT_SECRET;
                            const resp = {
                                success: true,
                                message: "User logged in successfully",
                                user: user,
                                data: { token: token },
                            };
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
            if (user) {
                token._id = user.user._id;
                token.name = user.user.fullName;
                token.email = user.user.email;
                token.token = user.data.token;
            }
            return token;
        },
        async session({ session, token }) {
            session.user._id = token._id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.token = token.token;
            return session;
        },
    },
})