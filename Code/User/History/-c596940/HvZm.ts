import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt"
	},
	secret: "secret",
	providers: [
		CredentialsProvider({
			type: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" }
			}
			async authorize(credentials) {
				const {email, password} = credentials as {
					email: string, 
					password: string
				}
				if (email === "aditya@gmail.com" && password === "aditya") {
					return {
						id: "1",
						name: "Aditya",
						email: "aditya@gmail.com",
						role: "admin"
					}
				}
			}
		})
	],
	callbacks: {
		async jwt({token, account, profile, user}: any) {
			if (account?.provider === "credentials") {
				token.email = user?.email;
				token.fullname = user?.fullname;
				token.role = user?.role;
	}
}
	}
}