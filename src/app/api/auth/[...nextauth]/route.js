import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import bcrypt from "bcrypt";

// Workaround for NextAuth v4 CJS/ESM interop in Next.js 15
const Credentials = CredentialsProvider.default || CredentialsProvider;
const NextAuthHandler = NextAuth.default || NextAuth;

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Admin login logic
        if (credentials.role === "admin") {
           const adminEmail = process.env.ADMIN_EMAIL;
           const adminPassword = process.env.ADMIN_PASSWORD;
           
           if (!adminEmail || !adminPassword) {
             console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment variables");
             return null;
           }
           
           if (credentials.email === adminEmail && credentials.password === adminPassword) {
             return { id: "ADMIN", name: "Admin", email: adminEmail, role: "admin" };
           }
           return null;
        }

        // Patient login logic
        if (credentials.role === "patient") {
          const [patients] = await db.query("SELECT * FROM patients WHERE email = ?", [credentials.email.toLowerCase()]);
          const patient = patients[0];
          
          if (!patient) return null;
          
          const match = await bcrypt.compare(credentials.password, patient.password);
          if (match) {
            return { id: patient.id, name: patient.name, email: patient.email, role: "patient" };
          }
        }
        
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuthHandler(authOptions);
export { handler as GET, handler as POST };
