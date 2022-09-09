

const Input = ({label,type,placeholder,name,form,setForm}) => {


  // Functions
  const onChange = (e) => {
      setForm(prev => { 
        return {...prev,
          [e.target.name] : {value:e.target.value, error:prev[e.target.name].error}
        }
      })
  };

  return (
    <div className='relative flex flex-col mb-1 w-full pb-6'> 
         <label className="mb-1">{label}</label>
         <input type={type} placeholder={placeholder} name={name} value={form[name].value} onChange={onChange} className={`outline-none bg-slate-100 rounded-lg py-2 px-4 ${form[name].error && "border border-red-500"}`} />
         <p style={{top:72}} className="absolute text-red-500 text-xs">{form[name].error}</p>
    </div>
  )
};

export default Input