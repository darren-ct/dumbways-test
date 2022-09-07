import { useEffect } from "react"
import Image from 'next/image'


const Success = ({setSuccessMsg,successMsg}) => {

  useEffect(()=>{
    setTimeout(()=>{
        setSuccessMsg(null)
    },[2000])
  },[]);

  return (
    <div style={{background:"rgba(0,0,0,.8)"}} className='w-full h-full fixed top-0 left-0 z-50 flex items-center justify-center'>
        <div className='py-12 px-24 bg-white flex flex-col items-center rounded-md'>
            <span className="text-3xl mb-8 font-semibold">SUCCESS!!</span>
            <Image src="/success.svg" width={64} height={64}/>
            <span className='text-xl mt-4'>{successMsg}</span>
        </div>
    </div>
  )
}

export default Success