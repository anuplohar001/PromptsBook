import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { connectDb } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({                               //NextAuth -> providers -> callbacks
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    
        Credentials({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ],

    callbacks: {

        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            });
            session.user.id = sessionUser._id.toString();
            return session
        },

        async signIn({ profile }) {

            try {
                await connectDb();
                const userext = await User.findOne({ email: profile.email })
                if (!userext) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", ""),
                        image: profile.picture
                    });
                    console.log("User Created Successfully")

                }

                return true;
            } catch (error) {
                console.log(error)
            }

        }
    }

})

export { handler as GET, handler as POST }