import { useState } from "react";
import { useEffect } from "react";

import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { ClassContext } from "../../pages/batch/[id]";

import { POST_CLASS } from "../../lib/names/classes";

import Loader from "../notify/Loader";
import Button from "../basic/Button";
import Input from "../basic/Input";
import Error from "../notify/Error";

const PostClass = ({setOnPost, id}) => {
  const {refetch, setSuccessMsg} = useContext(ClassContext);
  const [postclass, { data, loading, error }] = useMutation(POST_CLASS);

  //  State
  const[form,setForm] = useState({
    name : {
      value : "",
      error : ""
    }
  });

  // Effect
  useEffect(()=>{
    document.body.classList.add('hide-bar');
     
    return () => {
        document.body.classList.remove('hide-bar');
        };
        
  },[])

  if(data){
      setOnPost(false);
      setSuccessMsg("New Class has been posted");
      refetch({where:{batchId:id}});
  }
  
  // Functions
  const postClass = () => {

    if(!form.name.value) return setForm(prev => { return {name:{
      value: prev.name.value,
      error: "Name cannot be empty"
   }}});

   if(form.name.value !== "STAGEONE" && form.name.value !== "STAGETWO") return setForm(prev => { return {name:{
    value: prev.name.value,
    error: "Name must be either STAGEONE or STAGETWO"
   }}});


      postclass({
        variables : {
          input : { type:form.name.value, batchId:id }
        }
      });
  };

  const ignore = (e) => {
    e.stopPropagation();

  };

  // 
  if(loading) return <Loader />
  if(error) return <Error />

  return (
    <div style={{background:"rgba(0,0,0,.8)",zIndex:49}} className='w-full h-full fixed top-0 left-0 flex items-center justify-center' onClick={()=>{setOnPost(false)}}>

    <div className='relative py-12 px-24 bg-white flex flex-col items-center rounded-md' onClick={ignore}>
        <span className="absolute top-4 right-4 cursor-pointer text-xl font-semibold" onClick={()=>{setOnPost(false)}}>X</span>

        <span className='text-xl font-semibold'>Add Class</span>
        <span className="mb-12">Fill the fields below</span>
        
        <Input label="Class Name" type="text" placeholder="Enter class name" name="name" form={form} setForm={setForm}/>

        <Button content="Add Class" onClick={postClass} theme="primary" width="full" mt={4}/>
    </div>

   </div>
  )
}

export default PostClass;