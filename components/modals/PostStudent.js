import { useState } from "react";
import { useEffect } from "react";

import Image from "next/image";

import { useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { StudentsContext } from "../../pages/students/[id]";

import { ADD_STUDENT } from "../../lib/names/students";
import { GET_NON_MEMBERS } from "../../lib/names/students";

import Loader from "../notify/Loader";
import Button from "../basic/Button";
import Error from "../notify/Error";


const PostBatch = ({setOnPost, lists}) => {
  const {refetch, setSuccessMsg, classId} = useContext(StudentsContext);

  const [addstudent, { data, loading, error }] = useMutation(ADD_STUDENT);
  const {data:data2, loading:loading2, error:error2, refetch:refetch2} = useQuery(GET_NON_MEMBERS,{notifyOnNetworkStatusChange:true, variables:{
    where: {
      id_not_in: lists,
      firstName_contains: ""
    }
  }});

  //  State
  const[form,setForm] = useState({
    name : {
      value : "",
      error : ""
    }
  });
  const[pickedId, setPickedId] = useState(null)

  // Effect
  useEffect(()=>{
    document.body.classList.add('hide-bar');
     
    return () => {
        document.body.classList.remove('hide-bar');
        };
        
  },[]);

  useEffect(()=>{
      //  refetch
    if(data2){
      refetch2({
        where : {
          id_not_in:lists,
          firstName_contains:form.name.value
        }
      }); 
    };
    
  },[form.name.value])

  if(data){
      setOnPost(false);
      setSuccessMsg("New Member has been added");
      refetch({id:classId});
  };
  
  // Functions
  const onChange = (e) => {
        setForm(prev => {return { name : { value : e.target.value, error : prev.name.error} }})
  };

  const postUser = () => {
      if(!pickedId) return;
      
      addstudent({
        variables : {
          userId: pickedId,
          classId:classId
        }
      });
  };

  const ignore = (e) => {
    e.stopPropagation();

  };

  // 
  if(loading) return <Loader />
  if(error || error2) return <Error />

  return (
    <div style={{background:"rgba(0,0,0,.8)",zIndex:49}} className='w-full h-full fixed top-0 left-0 flex items-center justify-center' onClick={()=>{setOnPost(false)}}>

    <div className='relative py-12 px-24 bg-white flex flex-col items-center rounded-md' onClick={ignore}>
        <span className="absolute top-4 right-4 cursor-pointer text-xl font-semibold" onClick={()=>{setOnPost(false)}}>X</span>

        <span className='text-xl font-semibold'>Add User</span>
        <span className="mb-12">Add user one at a time</span>
        
        {/* INPUT */}
        <input type="text" className="mb-4 px-4 py-2 rounded-md bg-slate-100" onChange={onChange} value={form.name.value} placeholder="Search for users" />

        {/* LIST */}
        <div className="w-full flex flex-row items-end justify-between">
                 <span>Results:</span>
                 <span className="text-xs" style={{color:"#645CAA"}}>*pick one only</span>
        </div>
        <div className={`h-40 w-full my-4 flex flex-col items-center ${!loading2 && data2.users.length !== 0 ? "justify-start" : "justify-center"}`} style={{overflowY:"scroll",overflowX:"hidden"}}>
           <div className="flex flex-col items-center px-2">
                  {loading2 ? <span style={{color:"#645CAA"}}>Loading..</span> : data2.users.length === 0 ? <span>No results found..</span> : data2.users.map(user =>
                    <div key={user.id} className="w-full mb-4 p-4 flex flex-row items-center justify-start rounded-md border border-slate-200 shadow-md space-x-4 duration-150 hover:scale-110">
                           <Image src="/unknown.png" width={24} height={24}/>
                           <div className="flex-1" style={{flex:1}}>{user.firstName}</div>
                           <input type="radio" name="pickone" value={pickedId === user.id ? true : false} onChange={(e)=>{setPickedId(user.id)}}/>
                    </div>
                    )}
           </div>
        </div>

        <Button content="Add User" onClick={postUser} theme="primary" width="full" mt={4}/>
    </div>

   </div>
  )
}

export default PostBatch