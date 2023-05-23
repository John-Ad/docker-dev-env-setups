import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { signIn } from "@/utils/auth/main";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const token = await signIn(credentials?.username as string, credentials?.password as string);

                if (token) {
                    return {
                        id: "user_id", // Add a dummy value for the 'id' field
                        username: credentials?.username as string,
                        token: token,
                    };
                }
                return null
            }
        })
    ],
    pages: {
        signIn: "/signin",
    }
});

export { handler as GET, handler as POST }