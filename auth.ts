import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import axios from 'axios';

//async function getUser(email: string): Promise<User | undefined> {
  // try {
  //   const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
  //   return user.rows[0];
  // } catch (error) {
  //   console.error('Failed to fetch user:', error);
  //   throw new Error('Failed to fetch user.');
  // }
    // const PATH = 'http://localhost:3000/users/readUser.php';
    // var user
    // await axios({
    //   method: 'get',
    //   url: `${PATH}`,
    //   headers: { 'content-type': 'application/json' },
    //   params:{email}
    // })
    //   .then(res => {
    //     user = res.data
    //   })
    //   .catch(e=>{
    //     console.log("error in get user")
    //   })
    // return user
//}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6)})
          .safeParse(credentials);
          if (parsedCredentials.success) {
            const { email, password} = parsedCredentials.data;
            var user
            user = (await axios.get(`http://localhost:3000/users/readUser.php?email=${email}`)).data
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);
            console.log(password, user.password)
            user = {id:user.id,name:user.name,email:user.email,image:user.image_url}
            if (passwordsMatch) return user;
          }
          return null
      },
    }),
  ],
});