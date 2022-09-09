import { useState, useContext, useEffect } from "react"
import {SoftskillContext} from "../../pages/softskills/[id]"

import { useQuery, useMutation } from "@apollo/client";
import { GET_SOFTSKILL } from "../../lib/names/softskills";
import { PUT_SOFTSKILL } from "../../lib/names/softskills";

import Loader from "../notify/Loader";
import Button from "../basic/Button";
import Input from "../basic/Input";
import Error from "../notify/Error";

const EditSoftskill = ({id, setOnEdit}) => {
  const {refetch, setSuccessMsg, classId} = useContext(SoftskillContext);

  const [editSoft, { data:data2, loading:loading2, error:error2 }] = useMutation(PUT_SOFTSKILL);
  const {data, loading, error, refetch:refetch2} = useQuery(GET_SOFTSKILL, {
    notifyOnNetworkStatusChange:true,
    variables : {
      id : id
    }
  });

  // State
  const[form,setForm] = useState({
    point: {value:"",error:""},
  })

  // useEffect
  useEffect(()=>{
    document.body.classList.add('hide-bar');
     
    return () => {
        document.body.classList.remove('hide-bar');
        };

  },[]);

  useEffect(()=>{
      if(data){
           setForm(
            {
              point: {value:data.softSkill.point,error:""},
            }
           )
      };
  },[data]);

  useEffect(()=>{
       if(data){
             refetch2({id});
       };
  },[])

  useEffect(()=>{
      if(data2) {
          setOnEdit(false);
          setSuccessMsg("Softskill successfully edited")
          refetch({where : {
            student: {
              classesId: classId
            }
          }})
      };
  },[data2])
  
  // Functions
  const editSoftskill = () => {

    setForm(prev => { return {
      point: {value:prev.point.value,error:""}
    }})

      //  Validation
    if(!form.point.value) {
      return setForm( prev => { 
          return {...prev,point:{value: prev.point.value, error:"Point input can't be empty"}} 
      })
    };

    editSoft({
      variables : {
        id: id,
        input: {
            point: Number(form.point.value),
           }
      }
    });
    
  };

  const ignore = (e) => {
    e.stopPropagation();

  };

  // 
  if(error2 || error) return <Error />
  if(loading2 || loading) return <Loader/>


  return (
    <div style={{background:"rgba(0,0,0,.8)",zIndex:49}} className='w-full h-full fixed top-0 left-0 flex items-center justify-center' onClick={()=>{setOnEdit(false)}}>

    <div className='h-96 relative py-12 px-24 bg-white flex flex-col items-center rounded-md' onClick={ignore} style={{overflowY:"scroll"}}>
        <span className="absolute top-4 right-4 cursor-pointer text-xl font-semibold" onClick={()=>{setOnEdit(false)}}>X</span>

        <span className='text-xl font-semibold'>Edit Softskill</span>
        <span className="mb-12">Please fill in the form. Make sure all are numbers.</span>

        <Input placeholder="Enter Points" label="Points" name="point" form={form} setForm={setForm}/>

        <Button content="Edit Softskill" onClick={editSoftskill} theme="primary" width="full" mt={4}/>
    </div>

   </div>
  )
}

export default EditSoftskill