import { BookMark} from "@/utils/db"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function GET() {
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({msg:"access denied"},{status:403})
    }else{
        const userId = session.user.id
    
        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }
    
        try{
            
            const bookmarks = await BookMark.find({
                userId: userId
            });
        
            return NextResponse.json({ bookmarks }, {status: 200});
    
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
        const {name , url , folder} = await req.json()
    
        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }
    
        try{
            await BookMark.create({
                userId,
                name,
                url,
                folder
            })
    
            return NextResponse.json({msg:"entry created"} , {status: 200})
    
        }catch{
            return NextResponse.json({ error: "Internal DataBase Error & unable to create Entry" }, { status: 500 });
        }
    }
}

export async function DELETE(req:Request){
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({msg:"access denied"},{status:403})
    }else{
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        // console.log("delete fun called")
    
        if (!id) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }
    
        try{
            // console.log("database called")
            await BookMark.deleteOne({
                _id:id
            })
            // console.log("database call succsss")
    
            return NextResponse.json({msg:"entry deleted"} , {status: 200})
    
        }catch{
            return NextResponse.json({ error: "Internal DataBase Error & unable to delte Entry" }, { status: 500 });
        }
    }
    
}