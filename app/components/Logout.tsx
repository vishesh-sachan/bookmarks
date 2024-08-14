'use client'
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Logout(){
    return <div className="mb-50 ml-50 mr-50 text-[#000000] cursor-pointer">
    <Link href={'/signup'}>
        <div className="py-3 px-10 rounded bg-[#D9D9D9] " onClick={()=>{signOut()}}>Log Out</div>
    </Link>
</div>
}