'use client'
import Link from "next/link";
import Logout from "../components/Logout";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Settings(){
    const session = useSession()
    const router = useRouter()
    
    if(session.status !== "authenticated" && session.status !== "loading"){
        router.push('/api/auth/signin') // change it to your own signin page 
    }
    return (
    <main>
        <div className="flex justify-center font-SFmono bg-[#000000] text-[#FFFFFF] h-10 text-2xl">
        BookMarks
        </div>
    
        <div className="h-screen flex items-center justify-center">
            <div className="border rounded font-SFmono text-[#FFFFFF]">
                <div className="flex justify-between">
                <div className="m-50 text-2xl">
                    Settings
                </div>
                <div>
                <Link href={'/root'}><div className="text-[#FFFFFF] m-50 text-2xl rounded">X</div></Link>
                </div>
    
                </div>
                <Logout />
                <div className="mb-50 ml-50 mr-50 text-[#000000] cursor-pointer">
                    <div className="py-3 px-10 rounded bg-[#F0C9C9]">Delete Account</div>
                </div>
            </div>
        </div>
    </main>
    )
}