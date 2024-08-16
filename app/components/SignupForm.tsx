"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import bcrypt from "bcryptjs"
import { useState } from "react"

export default function SignupForm(){

    const router = useRouter()
    const [error,setError] = useState('')

    async function handleSubmit(e:any){
      e.preventDefault();
      const username = e.target[0].value
      const password = e.target[1].value
      // console.log(username,password)

      const hashedPassword = await bcrypt.hash(password,10)

      try {
          const res = await axios.post('/api/signup', {
            username,
            password:hashedPassword
          });
      
          if (res.status === 200) {
            setError("");
            router.push("/api/auth/signin"); // change it to your own signin page
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {

            if (error.response && error.response.status === 400) {
              setError("Please provide all credentials");
            } else {

              if(error.response && error.response.status === 403){
                  setError("username already exist");
              }else{
                  setError("Error, try again");
                  console.log(error);
              }
            }
          } else {
            setError("Error, try again");
            console.log(error);
          }
      }
    }

    return <form onSubmit={handleSubmit}>
    <div className="mb-50 ml-50 mr-50 text-[#000000]">
        <input type="text" placeholder="username" className="py-3 px-10 rounded" required></input>
    </div>
    <div className="mb-10 ml-50 text-[#000000]">
        <input type="text" placeholder="password" className="py-3 px-10 rounded" required></input>
    </div>
    <p className="text-[#FF0000] mb-10 ml-50">{error && error}</p>
    <div className="flex justify-end">
    <div className="bg-[#FFFFFF] py-3 px-5 m-50 rounded text-[#000000]"><button type="submit">SignUp</button></div>
    </div>
</form>
}