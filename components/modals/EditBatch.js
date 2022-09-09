import { useState, useContext, useEffect } from "react";
import { HomeContext } from "../../pages";
import client from "../../lib/apollo-client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_BATCH } from "../../lib/names/batches";
import { PUT_BATCH } from "../../lib/names/batches";

import Loader from "../notify/Loader";
import Button from "../basic/Button";
import Input from "../basic/Input";

const EditBatch = ({id, setEditModal}) => {
  const {refetch, setSuccessMsg} = useContext(HomeContext);
  
 
  const [updatebatch, { data:data2, loading:loading2, error:error2 }] = useMutation(PUT_BATCH);

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

  },[]);

  useEffect(()=>{
    const getBatch = async() => {

    try {
    const { data } = await client.query({
      query: GET_BATCH,
      variables : {id:id}
    }); 

    setForm(prev => {return {name:{value:data.batch.name,error:prev.name.error}}});
  
  } catch(err) {
    console.log(err)
  }
  };

  getBatch();


  },[]);

  useEffect(()=>{
      if(data2) {
          setEditModal(false);
          setSuccessMsg("Batch successfully edited")
          refetch({limit:10})
      };
  },[data2])
  
  // Functions
  const editBatch = () => {
      if(!form.name.value) return setForm(prev => { return {name:{
         value: prev.name.value,
         error: "Name cannot be empty"
      }}});

      updatebatch({
        variables : {
          id : id,
          input : {name:form.name.value}
        }
      });
  };

  const ignore = (e) => {
    e.stopPropagation();

  };

  // 
  if(error2) return <Error />
  if(loading2) return <Loader/>

  return (
    <div style={{background:"rgba(0,0,0,.8)",zIndex:49}} className='w-full h-full fixed top-0 left-0 flex items-center justify-center' onClick={()=>{setEditModal(false)}}>

    <div className='relative py-12 px-24 bg-white flex flex-col items-center rounded-md' onClick={ignore}>
        <span className="absolute top-4 right-4 cursor-pointer text-xl font-semibold" onClick={()=>{setEditModal(false)}}>X</span>

        <span className='text-xl font-semibold'>Edit Batch</span>
        <span className="mb-12">Fill the fields below</span>
        
        <Input label="Batch Name" type="text" placeholder="Enter batch name" name="name" form={form} setForm={setForm}/>

        <Button content="Update" onClick={editBatch} theme="primary" width="full" mt={4}/>
    </div>

   </div>
  )
}

export default EditBatch