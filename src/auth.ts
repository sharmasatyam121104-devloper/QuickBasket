import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./lib/db"
import UserModel from "./models/user.model"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        credentials: {
            email: { label: "email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            
            await connectDb()
            const email = credentials?.email as string
            const password = credentials?.password as string
            const user = await UserModel.findOne({email}).select("+password");
            if (!user) {
                throw new Error("User does not exist");
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                throw new Error("Incorrect password");
            }
            

            return {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
                role: user.role,
            }
        }

    }),
    Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  ],
  callbacks: {
    async signIn({user, account}) {
        if(account?.provider == "google") {
            await connectDb()
            let dbUser = await UserModel.findOne({email: user.email})
            if(!dbUser) {
                dbUser= await UserModel.create({
                    name:user.name,
                    email: user.email,
                    image: user.image
                })
            }
            user.id = dbUser._id.toString()
        }

        return true
    },
    //Put user data in token
    jwt({token, user, trigger, session}) {
        if(user) {
            token.id = user.id;
            token.email = user.email;
            token.name = user.name;
            token.role = user.role;
        }

        if(trigger === 'update') {
            token.role = session.role
        }
        return token
    },
    session({session, token}) {
        if(session) {
            session.user.id = token.id as string;
            session.user.email = token.email as string;
            session.user.name = token.name as string;
            session.user.role = token.role as string;
        }
        return session
    }
  },
  pages: {
    signIn: "/login",
    error: '/login'
  },
  session: {
    strategy: "jwt",
    maxAge: 7*24*60*60*1000
  },
  secret: process.env.AUTH_SECRET
})