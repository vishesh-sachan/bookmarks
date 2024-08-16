import Link from "next/link";
import SignupForm from "../components/SignupForm";

export default function SignUp(){

    return (
    <main>
        <div className="flex justify-center font-SFmono bg-[#000000] text-[#FFFFFF] h-10 text-2xl">
        BookMarks
        </div>
        <div className="h-screen flex items-center justify-center">
            <div className="border rounded font-SFmono text-[#FFFFFF]">
                <div className="flex justify-between">
                    <div className="m-50 text-2xl">
                        SignUp
                    </div>
                    <div>
                    <Link href={'/'}><div className="text-[#FFFFFF] m-50 text-2xl rounded">X</div></Link>
                    </div>
                </div>
                <SignupForm />
                <div className="flex text-[#FFFFFF] text-sm">
                    <div className="ml-50 mb-20 mr-10" >
                        Already have Account?
                    </div>
                    {/* change the route back to signin page */}
                    <Link href={'/api/auth/signin'}>
                    <div className="text-[#0084FF]">
                        SignIn
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    </main>
    )
}