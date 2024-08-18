'use client';
import React from "react";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { Analytics } from "@vercel/analytics/react"

export function Providers ({children} : { children : React.ReactNode }){
    return(
        <SessionProvider>
            <RecoilRoot>
                <Analytics />
                {children}
            </RecoilRoot>
        </SessionProvider>
    )
}