import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const options = {
    providers: [
        GitHubProvider({
            profile(profile) {
                console.log('Github Profile:', profile);
                return {
                    ...profile,
                    role: 'admin'
                }
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            profile(profile) {
                console.log('Google Profile:', profile);
                return {
                    ...profile,
                    id: profile.sub,
                    role: 'GoogleUser'
                }
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email:", type: 'text', placeholder: 'your-username' },
                password: { label: "Password:", type: 'password', placeholder: 'your-password' }
            },
            async authorize(credentials, req) {
                try {
                    const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(credentials)
                    });
                    // .then(res => {
                    //     return res;
                    // });
                    const user = await res.json();

                    console.log('Resp user:', user);

                    return user;

                } catch (error) {
                    console.log(error, 'credentialsDATA:', credentials);
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role
            return session;
        }
    }
}