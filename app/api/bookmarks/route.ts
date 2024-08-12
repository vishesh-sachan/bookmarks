import { BookMark} from "@/utils/db"
import { NextResponse } from "next/server"

export async function GET(req : Request) {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

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

export async function POST(req : Request){
    const {userId , name , url , folder} = await req.json()

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