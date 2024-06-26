import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  secret:'test',
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
        const isOnManageDashboard = nextUrl.pathname.startsWith('/manageDashboard');
        if (isOnManageDashboard) {
          if (isLoggedIn) return true;
          return false; // Redirect unauthenticated users to login page
        } else if (isLoggedIn) {
          return Response.redirect(new URL('/manageDashboard', nextUrl));
        }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;