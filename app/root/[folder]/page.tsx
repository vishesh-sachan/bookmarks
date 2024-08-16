'use client'
import { Modal } from "@/app/components/Modal";
import { filesAtom, updatedFilesAtom } from "@/store/atoms";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Folder({params}:any){

    const session = useSession()
    const router = useRouter()
    const [files , setFiles] = useRecoilState(filesAtom)
    const [showFileModal , setShowFileModal] = useState(false)
    const [updatedFiles , setUpdatedFiles] = useRecoilState(updatedFilesAtom)

    useEffect(()=>{
        async function getFiles(){
            // console.log("files get called")
            try{
                const res = await axios.get('/api/bookmarks')
                // console.log(res.data.bookmarks)
                setFiles(res.data.bookmarks)
            }catch(error){
                console.log('error while getting files',error)
            }
        }
        getFiles()
    },[updatedFiles,setFiles])

    async function addFile(e:any) {
    
        e.preventDefault();
        const name = e.target[0].value;
        const url = e.target[1].value;
        const folder = params.folder
        // const userId = JSON.stringify(session.data?.user.id) // ignore type error
    
        try{
            await axios.post('/api/bookmarks',{
                name,url,folder
            })
            setShowFileModal(false)
            const val= Math.random()
            setUpdatedFiles(val)
    
        }catch(error){
            console.log('error while getting files',error)
        }
    }

    async function deleteFile(id:string){
        await axios.delete(`/api/bookmarks?id=${id}`)
        const val= Math.random()
        setUpdatedFiles(val)
    }
    
    if(session.status !== "authenticated" && session.status !== "loading"){
        router.push('/api/auth/signin') // change it to your own signin page 
    }
    return (
        <main>
            <div className="flex justify-between font-SFmono bg-[#000000] text-[#FFFFFF] h-10 text-2xl">
                <div className="flex ml-20">
                    <Link href={'/root'}>
                        <div>
                            {'<'}
                        </div>
                    </Link>
                    <div className="ml-20">
                        {params.folder}
                    </div>
                </div>
                <Link href={'/settings'}>
                    <div className="mr-20 flex cursor-pointer gap-2">
                        <div>
                            BookMarks
                        </div>
                        <div className="cursor-pointer">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0 16C0 7.16345 7.16344 0 16 0C24.8364 0 32 7.16345 32 16C32 24.8364 24.8364 32 16 32C7.16344 32 0 24.8364 0 16ZM16 2.29508C8.43098 2.29508 2.29508 8.431 2.29508 16C2.29508 19.5564 3.64973 22.7964 5.87121 25.2321C8.00557 21.8979 11.744 19.6845 16.0009 19.6845C20.2573 19.6845 23.9952 21.8974 26.1299 25.2309C28.3506 22.7955 29.7049 19.5558 29.7049 16C29.7049 8.431 23.5688 2.29508 16 2.29508ZM24.412 26.8203C22.7259 23.9232 19.5896 21.9796 16.0009 21.9796C12.4117 21.9796 9.27511 23.9237 7.58933 26.8213C9.91117 28.6286 12.8299 29.7049 16 29.7049C19.1706 29.7049 22.0898 28.6281 24.412 26.8203ZM10.323 13.5962C10.323 10.4607 12.8648 7.91885 16.0003 7.91885C19.1358 7.91885 21.6776 10.4607 21.6776 13.5962C21.6776 16.7317 19.1358 19.2735 16.0003 19.2735C12.8648 19.2735 10.323 16.7317 10.323 13.5962ZM16.0003 10.2139C14.1324 10.2139 12.6181 11.7282 12.6181 13.5962C12.6181 15.4642 14.1324 16.9784 16.0003 16.9784C17.8683 16.9784 19.3826 15.4642 19.3826 13.5962C19.3826 11.7282 17.8683 10.2139 16.0003 10.2139Z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                </Link>
            </div>
            
            <div className="font-SFmono text-[#FFFFFF] mt-30">
                <div className="cursor-pointer ml-20" onClick={()=>{setShowFileModal(true)}}>
                    Files +
                </div>
                <div className="grid grid-cols-5 gap-4 p-4">
                    {files.map((file) => {
                        if(file.folder == params.folder)
                        return(
                            <div key={file._id} className="bg-[#1A1A1A] rounded ">
                                <div className="flex justify-between">
                                    <Link  href={file.url} target="_blank">
                                        <div className="m-6 p-4 cursor-pointer">
                                            {file.name}
                                        </div>
                                    </Link>
                                    <div className="m-6 p-4 cursor-pointer" onClick={()=>(deleteFile(file._id))}>
                                        X
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Modal isOpen={showFileModal} >
                <form onSubmit={addFile}>
                    <div className="h-screen flex items-center justify-center ">
                        <div className="border rounded font-SFmono text-[#FFFFFF] bg-[#1E1E1E] bg-opacity-80">
                            <div className="m-50 text-[#000000]">
                                <input type="text" placeholder="name" className="py-3 px-10 rounded" required></input>
                            </div>
                            <div className="mb-10 ml-50 text-[#000000]">
                                <input type="text" placeholder="url" className="py-3 px-10 rounded" required></input>
                            </div>
                            <div className="flex justify-between">
                            <div className="bg-[#FFFFFF] py-3 px-5 m-50 rounded text-[#000000] bg-[#F0C9C9] cursor-pointer" onClick={()=>{setShowFileModal(false)}}>Cancel</div>
                            <div className="bg-[#FFFFFF] py-3 px-5 m-50 rounded text-[#000000] bg-[#0084FF] cursor-pointer"><button type="submit">Done</button></div>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </main>
    );
}