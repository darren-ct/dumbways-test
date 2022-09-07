import React from 'react'

const Button = ({content,onClick,theme,width,mt}) => {
  // theme : primary , secondary , alert 
  // width : full , default , flex

  return (
    <button onClick={onClick} 
    className={`duration-150 hover:opacity-70 text-lg mt-${mt}
                ${width === 'flex' ? "flex-1 rounded-md px-4 py-2  hover:scale-110" : width === 'full' ? "p-4 rounded-lg w-full" : "rounded-md px-4 py-2 hover:scale-110" }
                ${theme === 'alert' ? "bg-red-500 text-white" : theme === 'primary' ? "text-white" : "" } font-semibold`}

    style={theme === "primary" ? {background:"#645CAA"} : theme === "secondary" ?  {color:"#645CAA",border:'1px solid #645CAA'} : {color:"white"} }
    >
        {content}
    </button>
  )
}

export default Button