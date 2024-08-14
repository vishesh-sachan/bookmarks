import { User } from '@/utils/db';
import CredentialsProvider from 'next-auth/providers/credentials';


export const authOptions = {
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username:{lable: 'username' , type:'text',palceholder:'username'},
                password:{lable: 'password' , type:'password',palceholder:'password'}
            },
            async authorize(credentials :any){
                console.log(credentials)

                const user = await User.findOne({
                    username:credentials.username
                })

                if(!user){
                    return null;
                }else{
                    return{
                        id:user._id.toString(),
                        name:user.username
                    };

                }
                
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        session: ({session , token , user}:any) => {
            if(session && session.user){
                session.user.id = token.sub
            }
            return session;
        }
    }
}