import { User } from "@/utils/db"
import { NextResponse } from "next/server"

export async function POST(req:Request){
    const {username , password} = await req.json()

    if(!username || !password){
        return NextResponse.json({msg:"Please send your credentials"} , {status:400})
    }else{
        try {

            const usernameExist = await User.findOne({username:username})

            if(usernameExist){
                return NextResponse.json({msg:"username already exist"},{status:403})
            }else{
                await User.create({
                    username,password
                })
                return NextResponse.json({msg:"user created Successfully"},{status:200})
            }
            
        } catch (error) {
            console.log("Error while siging up a user" , error)
            return NextResponse.json({msg:"Error while siging up a user "},{status:500})
        }
    }
}