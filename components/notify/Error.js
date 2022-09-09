import React from 'react'

const Error = () => {
  return (
    <div style={{background:"rgba(0,0,0,.8)"}} className='w-full h-full fixed top-0 left-0 z-50 flex items-center justify-center'>
        <div className='py-12 px-24 bg-white flex flex-col items-center rounded-md'>
            <span className="text-3xl mb-8 font-semibold">ERROR...</span>
            <div className='flex items-center justify-center rounded-full w-12 h-12 text-white font-semibold text-xl bg-red-600'>X</div>
            <span className='text-xl mt-4'>Oopss.... Try reloading</span>
        </div>
    </div>
  )
}

export default Error