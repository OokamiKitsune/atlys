import NextAuth from "next-auth"
import providers from "next-auth/providers"
import dotenv from "dotenv"

export default NextAuth({
    providers: [
        providers.Google({
            clientId: dotenv.GOOGLE_ID,
            clientSecret: dotenv.GOOGLE_SECRET,
        })
    ],
    database: dotenv.DATABASE_URL,
    secret: dotenv.SECRET,
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },
    jwt: {
        secret: dotenv.JWT_SECRET,
        encryption: true,
        signingKey: dotenv.JWT_SIGNING_PRIVATE_KEY,
        encryptionKey: dotenv.JWT_ENCRYPTION_PRIVATE_KEY,
        encryptionAlgorithm: "RS256"
    },
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error", // Error code passed in query string as ?error=
        verifyRequest: "/auth/verify-request", // (used for check email message)
        newUser: null // If set, new users will be directed here on first sign in
    },
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            // Add access_token to the token right after signin
            if (account?.accessToken) {
                token.accessToken = account.accessToken
            }
            return token
        }
    }
})
