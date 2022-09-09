import React from 'react'

const Header = () => {
  return (
    <div style={{background:"#645CAA"}}>
         <div className='xl:container xl:mx-auto flex flex-row items-center justify-between px-8 py-4' style={{background:"#645CAA"}}>
                  <span className="text-white font-semibold text-xl">Dumbways Teacher Dashboard</span>
                  <img className='w-12 h-12 rounded-full cursor-pointer bg-slate-300 border-none'/>
         </div>
    </div>
  )
}

export default Header