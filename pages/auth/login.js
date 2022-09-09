import { useEffect, useLayoutEffect, useState } from "react"
import { useContext } from "react";
import { AppContext } from "../_app";
import { useRouter } from "next/router"

import { useMutation } from "@apollo/client";
import { LOGIN } from "../../lib/names/login";

import Loader from '../../components/notify/Loader'
import Error from '../../components/notify/Error';

import Input from "../../components/basic/Input";
import Button from "../../components/basic/Button";


const Login = () => {
    const {push} = useRouter();

    const {user,setUser,token,setToken} = useContext(AppContext)
    const [submitLogin, {data,loading,error}] = useMutation(LOGIN);
    
    // States
    const[form,setForm] = useState({
        email: {
            value : "",
            error : ""
        },
        password : {
            value : "",
            error : ""
        }
    });

    // effects
    useLayoutEffect(()=>{
        if(token) {
            push("/")
        };
    },[token]);

    useEffect(()=>{
         if(data){
            setToken(data.login.token);
            setUser(data.login.user);
            push("/")
         };
    },[data])

    // Functions
    const onSubmit = () => {
        // Reset Errors
         setForm(prev => {
            return {
                email: {
                    value : prev.email.value,
                    error : ""
                },
                password : {
                    value : prev.password.value,
                    error : ""
                }
            }
         });

        //  Validation
         if(!form.email.value) {
            return setForm( prev => { 
                return {...prev,email:{value: prev.email.value, error:"Email input can't be empty"}} 
            })
        };

         if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.value))){
            return setForm(prev => { 
                return {...prev,email:{value: prev.email.value, error:"Email format invalid"}} 
           })
        };

         if(!form.password.value || form.password.value.length < 8) {
            return setForm(prev => { 
                return {...prev,password:{value: prev.email.password, error:"Password cant be empty and must have minimal 8 characters"}} 
            })
        };

        // Submit
        submitLogin({ 
            variables: { input: {email:form.email.value, password: form.password.value }}
        });
        
    };

    // IF ELSE
    if(error) {
        return <Error error="Make sure your credentials is correct"/>
    }
    if(loading) return <Loader/>

    return (
    <div className='xl:container xl:mx-auto px-8 py-4'>
             {/* <Loader /> */}
             <div className='w-full max-w-lg mx-auto flex flex-col items-center justify-start mt-20 p-8 border border-slate-50 rounded-xl shadow-md'>
                  <span className='text-2xl font-semibold'>Login</span>
                  <span className='text-sm font-medium mb-10'>Isi email & password Anda</span>
                  
                  <Input label="Email" type="text" placeholder="Enter your email" name="email" form={form} setForm={setForm}/>
                  <Input label="Password" type="password" placeholder="Enter your password" name="password" form={form} setForm={setForm}/>

                  <Button onClick={onSubmit} content="Login" theme="primary" width="full" mt={10}/>
             </div>
    </div> 
  )
}

export default Login