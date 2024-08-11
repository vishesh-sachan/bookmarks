import Link from "next/link";

export default function SignIn(){
    return (
    <main>
        <div className="flex justify-center font-SFmono bg-[#000000] text-[#FFFFFF] h-10 text-2xl">
        BookMarks
        </div>

        <div className="h-screen flex items-center justify-center">
            <div className="border rounded font-SFmono text-[#FFFFFF]">
                <div className="flex justify-between">
                <div className="m-50 text-2xl">
                    SignIn
                </div>
                <div>
                <Link href={'/'}><div className="text-[#FFFFFF] m-50 text-2xl rounded">X</div></Link>
                </div>

                </div>
                <div className="mb-50 ml-50 mr-50 text-[#000000]">
                    <input type="text" placeholder="username" className="py-3 px-10 rounded"></input>
                </div>
                <div className="mb-10 ml-50 text-[#000000]">
                    <input type="text" placeholder="password" className="py-3 px-10 rounded"></input>
                </div>
                <div className="flex justify-end">
                <div className="bg-[#FFFFFF] py-3 px-5 m-50 rounded text-[#000000]">SignIn</div>
                </div>
                <div className="flex text-[#FFFFFF] text-sm">
                    <div className="ml-50 mb-20 mr-10" >
                        Don't have Account?
                    </div>
                    <Link href={'/signup'}>
                    <div className="text-[#0084FF]">
                        SignUp
                    </div>
                    </Link>

                </div>
            </div>
        </div>
    </main>
    )
}