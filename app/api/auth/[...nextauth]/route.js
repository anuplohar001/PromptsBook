import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from "@utils/database";
import User from "@models/user";

export const authOptions = {

    providers: [

        CredentialsProvider({

            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {

                if (credentials === null) return null;

                try {
                    await connectDb()
                    const user = await User.findOne({ email: credentials?.email })
                    if (user) {
                        const isMatch = credentials.password === user.password

                        if (isMatch) {
                            return user;
                        } else {
                            throw ("Email or Password is not correct");
                        }
                    } else {
                        throw ("User not found");
                    }
                } catch (error) {
                    throw new Error(error);
                }
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,

            // authorization: {
            //     params: {
            //         prompt: "consent",
            //         access_type: "offline",
            //         response_type: "code",
            //     },
            // },

            
        })
    ],

    callbacks: {

        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            return session
        },

        async signIn({account, profile, credentials }) {

            if (account.provider === 'google') {
                try {
                    await connectDb();
                    const userext = await User.findOne({ email: profile.email })
                    if (!userext) {
                        await User.create({
                            email: profile.email,
                            username: profile.name.replace(" ", ""),
                            image: profile.picture
                        });

                    }
                    return true;

                } catch (error) {
                    console.log(error)
                }
            }
            else{

                if(credentials){
                    return true
                }
            }
        }
        
    }

}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }