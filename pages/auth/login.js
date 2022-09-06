import { useState } from "react"
import { useRouter } from "next/router"

import { useMutation } from "@apollo/client";
import { LOGIN } from "../../lib/names/login";

import Loader from '../../components/notify/Loader'



const login = () => {
    const {push} = useRouter();

    const [submitLogin, {data,loading,error}] = useMutation(LOGIN, )

    // States
    const[form,setForm] = useState({
        email: "",
        password : ""
    });

    const [Error,setError] = useState({
        email: "",
        password:""
    })

    // Functions
    const onChange = (e) => {
         setForm(prev => {
            return {
                ...prev,
                [e.target.name] : e.target.value
            }
         })
    };

    const onSubmit = () => {
         setError({email:"",password:""});

        //  Validation
         if(!form.email) return setError(prev => { return {...prev,email:"Email input can't be empty"} });
         if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email))) return setError(prev => { return {...prev,email:"Email format invalid"} });
         if(!form.password || form.password.length < 8) return setError(prev => { return {...prev,password:"Password cant be empty and must have minimal 8 characters"} });

        // Submit
        submitLogin({ 
            variables: { input: {email:form.email, password: form.password }}
        });
        
    };

    // 
    console.log(error,data)
    if(loading) return <Loader/>

    return (
    <div className='xl:container xl:mx-auto '>
             {/* <Loader /> */}
             <div className='w-full max-w-lg mx-auto flex flex-col items-center justify-start mt-20 p-8 border border-slate-50 rounded-xl shadow-md'>
                  <span className='text-2xl font-semibold'>Login</span>
                  <span className='text-sm font-medium'>Isi email & password Anda</span>
                  
                  <div className='relative flex flex-col mt-10 mb-1 w-full pb-6'>
                      <label className='mb-1'>Email</label>
                      <input name="email" value={form.email} onChange={onChange} type="text" placeholder='Isi email Anda' className={`outline-none bg-slate-100 rounded-lg py-2 px-4 ${Error.email && "border border-red-500"}`}/>
                      <p className="absolute bottom-1 text-red-500 text-xs">{Error.email}</p>
                  </div>

                  <div className='relative flex flex-col w-full pb-6'>
                       <label className='mb-1'>Password</label>
                       <input name="password" value={form.password} onChange={onChange} type="password" placeholder='Isi Password Anda' className={`outline-none bg-slate-100 rounded-lg py-2 px-4 ${Error.password && "border border-red-500"}`}/>
                       <p className="absolute bottom-1 text-red-500 text-xs">{Error.password}</p>
                  </div>

                  <button onClick={onSubmit} className='mt-8 w-full p-2 text-lg rounded-lg text-white duration-100 hover:opacity-70' style={{background:"#645CAA"}}>Login</button>
             </div>
    </div> 
  )
}

export default login