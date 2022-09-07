import { useState } from "react";
import { useEffect } from "react";

import Button from "../basic/Button";

import Input from "../basic/Input";

const PostBatch = ({setOnPost}) => {

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
  
  // Functions
  const postBatch = () => {

  };

  const ignore = (e) => {
    e.stopPropagation();

  };

  return (
    <div style={{background:"rgba(0,0,0,.8)",zIndex:49}} className='w-full h-full fixed top-0 left-0 flex items-center justify-center' onClick={()=>{setOnPost(false)}}>

    <div className='relative py-12 px-24 bg-white flex flex-col items-center rounded-md' onClick={ignore}>
        <span className="absolute top-4 right-4 cursor-pointer text-xl font-semibold" onClick={()=>{setOnPost(false)}}>X</span>

        <span className='text-xl font-semibold'>Add Batch</span>
        <span className="mb-12">Fill the fields below</span>
        
        <Input label="Batch Name" type="text" placeholder="Enter batch name" name="name" form={form} setForm={setForm}/>

        <Button content="Add Batch" onClick={postBatch} theme="primary" width="full" mt={4}/>
    </div>

   </div>
  )
}

export default PostBatch