import { User } from "@/utils/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(){

    const session = await getServerSession(authOptions);
    
    if(!session){
        return NextResponse.json({msg:"access denied"},{status:403})
    }else{
        const userId = session.user.id
    
        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }
    
        try{
    
            const payload = await User.find({_id:userId})
            const folders = payload[0].folders
            return NextResponse.json({ folders }, {status: 200});
    
        }catch{
            return NextResponse.json({ error: "Internal DataBase Error & unable to create Entry" }, { status: 500 });
        }
    }

}

export async function POST(req : Request){

    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({msg:"access denied"},{status:403})
    }else{
        const userId = session.user.id
        const {foldername} = await req.json()
    
        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }
    
        try{
            const payload = await User.find({_id:userId})
            const folders = payload[0].folders
            await User.updateOne({
                _id:userId
            },{folders:[...folders,foldername]})
    
            return NextResponse.json({msg:"entry created"} , {status: 200})
    
        }catch{
            return NextResponse.json({ error: "Internal DataBase Error & unable to create Entry" }, { status: 500 });
        }
    }
}
