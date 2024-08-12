import { User } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req : Request){
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

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

export async function POST(req : Request){
    const {userId,foldername} = await req.json()

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
