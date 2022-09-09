import { useState, useContext, useEffect } from "react"
import {ProductivityContext} from "../../pages/productivities/[id]"

import { useMutation, useQuery } from "@apollo/client";
import { POST_PRODUCTIVITY, GET_NON_PRODUCTIVITY } from "../../lib/names/productivity";

import Loader from "../notify/Loader";
import Button from "../basic/Button";
import Error from "../notify/Error";
import Input from "../basic/Input";
import Image from "next/image";

const PostProductivity = ({setOnPost ,ids}) => {
  const {refetch, setSuccessMsg, classId} = useContext(ProductivityContext);

  const [postprod, { data, loading, error }] = useMutation(POST_PRODUCTIVITY);
  const {data:data2, loading:loading2, error:error2, refetch:refetch2} = useQuery(GET_NON_PRODUCTIVITY, {
    notifyOnNetworkStatusChange: true,
    variables : {
      where: {
        id_not_in: ids,
        firstName_contains: "",
        classesId:classId
      }
    }
  })
 

  // State
  const[pickedId, setPickedId] = useState(null)
  const[input,setInput] = useState({
    name : {
      value : "",
      error : ""
    }
  });
  const[form,setForm] = useState({
    point: {value:"",error:""},
  });

  // useEffect
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
        id_not_in:ids,
        firstName_contains:input.name.value,
        classesId:classId
      }
    }); 
  };
  
  },[input.name.value])

  if(data){
    console.log(data)
  setOnPost(false);
  setSuccessMsg("New Productivity has been added");
  refetch({id:classId});
  };
  
  // Functions
  const onChange = (e) => {
    setInput(prev => {return { name : { value : e.target.value, error : prev.name.error} }})
  };

  const postProd = () => {
    if(!pickedId) return alert("Pick one");

    // Reset
    setForm(prev => { return {
      point: {value:prev.point.value,error:""}
    }})

      //  Validation
    if(!form.point.value) {
      return setForm( prev => { 
          return {...prev,point:{value: prev.point.value, error:"Point input can't be empty"}} 
      })
    };

    postprod({
      variables : {
        input: {
            studentId : pickedId,
            point: Number(form.point.value),
           }
      }
    });
    
  };

  const ignore = (e) => {
    e.stopPropagation();
  };

  // 
  if(error) return <Error error="Make sure all inputs are number..."/>
  if(error2) return <Error />
  if(loading) return <Loader/>


  return (
    <div style={{background:"rgba(0,0,0,.8)",zIndex:49}} className='w-full h-full fixed top-0 left-0 flex items-center justify-center' onClick={()=>{setOnPost(false)}}>

    <div className='relative py-12 px-24 bg-white flex flex-col items-center rounded-md' onClick={ignore} style={{overflowY:"scroll"}}>
        <span className="absolute top-4 right-4 cursor-pointer text-xl font-semibold" onClick={()=>{setOnPost(false)}}>X</span>

        <span className='text-xl font-semibold'>Add Productivity</span>
        <span className="mb-12">Please fill in the form. Make sure answer are numbers.</span>

         {/* INPUT */}
         <input type="text" className="mb-4 px-4 py-2 rounded-md bg-slate-100" onChange={onChange} value={input.name.value} placeholder="Search for users" />

        {/* LIST */}
        <div className="w-full flex flex-row items-end justify-between">
             <span>Results:</span>
             <span className="text-xs" style={{color:"#645CAA"}}>*pick one only</span>
        </div>
        <div className={`h-32 mb-8 w-full my-4 flex flex-col items-center ${!loading2 && data2.users.length !== 0 ? "justify-start" : "justify-center"}`} style={{overflowY:"scroll",overflowX:"hidden"}}>
              <div className="flex flex-col items-center px-2 w-full" style={{maxWidth:240}}>
                 {loading2 ? <span style={{color:"#645CAA"}}>Loading..</span> : data2.users.length === 0 ? <span>No results found..</span> : data2.users.map(user =>
                     <div key={user.id} className="w-full mb-4 p-4 flex flex-row items-center justify-start rounded-md border border-slate-200 shadow-md space-x-4 duration-150 hover:scale-110">
                            <Image src="/unknown.png" width={24} height={24}/>
                            <div className="flex-1" style={{flex:1}}>{user.firstName}</div>
                            <input type="radio" name="pickone" value={pickedId === user.id ? true : false} onChange={(e)=>{setPickedId(user.id)}}/>
                     </div>
                  )}
              </div>
        </div>

        <Input placeholder="Enter Points" label="Points" name="point" form={form} setForm={setForm}/>

        <Button content="Add Productivity" onClick={postProd} theme="primary" width="full" mt={4}/>
    </div>

   </div>
  )
}

export default PostProductivity