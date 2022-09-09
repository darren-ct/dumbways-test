import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { AttendanceContext } from "../../pages/attendances/[id]";

import { POST_ATTENDANCE } from "../../lib/names/attendances";
import { GET_NON_ATTENDANCE } from "../../lib/names/attendances";

import Image from "next/image";
import Input from "../basic/Input";

import Loader from "../notify/Loader";
import Button from "../basic/Button";
import Error from "../notify/Error";

const PostAttendance = ({ids,setOnPost}) => {
  const {refetch, setSuccessMsg, classId} = useContext(AttendanceContext);

  const [addAttendance, {data,loading,error}] = useMutation(POST_ATTENDANCE);
  const {data:data2, loading:loading2, error:error2, refetch:refetch2} = useQuery(GET_NON_ATTENDANCE, {
    notifyOnNetworkStatusChange:true,
    where : {
      id_not_in : ids,
      firstName_contains: "",
      classesId:classId
    }
  });

  // State
  const[form, setForm] = useState({
    name : {
      value : "",
      error : ""
    }
  });

  const[attendanceForm,setAttendanceForm] = useState({
    present: {value:"",error:""},
    absent: {value:"",error:""},
    sick: {value:"",error:""},
    permission: {value:"",error:""}
  })
  const[pickedId, setPickedId] = useState(null);

  // Effect
  useEffect(()=>{
    document.body.classList.add('hide-bar');
     
    return () => {
        document.body.classList.remove('hide-bar');
        };
        
  },[]);

  useEffect(()=>{
    //  refetch
    if(data2) {
    refetch2({
      where : {
        id_not_in:ids,
        firstName_contains:form.name.value,
        classesId:classId

      }
    }); }
},[form.name.value])

 if(data){
  setOnPost(false);
  setSuccessMsg("New Attendance has been added");
  refetch({id:classId});
};

  // Functions
    const onChange = (e) => {
      setForm(prev => {return { name : { value : e.target.value, error : prev.name.error} }})
   };

   const PostAttendance = () => {
    if(!pickedId) return alert("Pick One Person");

    //  Validation
    if(attendanceForm.present.value === "" || attendanceForm.present.value === null) {
      return setAttendanceForm( prev => { 
          return {...prev,present:{value: prev.present.value, error:"Present input can't be empty"}} 
      })
    };

    if(attendanceForm.absent.value === "" || attendanceForm.absent.value === null) {
      return setAttendanceForm( prev => { 
          return {...prev,absent:{value: prev.absent.value, error:"Absent input can't be empty"}} 
      })
    };

    if(attendanceForm.sick.value === "" || attendanceForm.sick.value === null) {
      return setAttendanceForm( prev => { 
          return {...prev,sick:{value: prev.sick.value, error:"Sick input can't be empty"}} 
      })
    };

    if(attendanceForm.permission.value === "" || attendanceForm.permission.value === null) {
      return setAttendanceForm( prev => { 
          return {...prev,permission:{value: prev.permission.value, error:"Permission input can't be empty"}} 
      })
    };

    addAttendance({
      variables : {
        input: {
          studentId: pickedId ,
          present: Number(attendanceForm.present.value),
          sick: Number(attendanceForm.sick.value),
          permission: Number(attendanceForm.permission.value),
          absent: Number(attendanceForm.absent.value)
        }
      }
    });
    
   };

   const ignore = (e) => {
  e.stopPropagation();
   };

// 

if(loading || loading2) return <Loader />
if(error) return <Error error="Make sure all inputs are number..."/>
if(error2) return <Error />

  return (
    <div style={{background:"rgba(0,0,0,.8)",zIndex:49}} className='w-full h-full fixed top-0 left-0 flex items-center justify-center' onClick={()=>{setOnPost(false)}}>

    <div className='relative py-12 px-24 bg-white flex flex-col items-center rounded-md' onClick={ignore} style={{overflowY:"scroll", height:"600px"}}>
        <span className="absolute top-4 right-4 cursor-pointer text-xl font-semibold" onClick={()=>{setOnPost(false)}}>X</span>

        <span className='text-xl font-semibold'>Choose user</span>
        <span className="mb-12">Add user on at a time</span>
        
        {/* INPUT */}
        <input type="text" className="mb-4 px-4 py-2 rounded-md bg-slate-100" onChange={onChange} value={form.name.value} placeholder="Search for users" />

        {/* LIST */}
        <div className="w-full flex flex-row items-end justify-between">
                 <span>Results:</span>
                 <span className="text-xs" style={{color:"#645CAA"}}>*pick one only</span>
        </div>
       
        <div className="flex flex-col items-center px-2 w-full mt-8 mb-8">
                  {loading2 ? <span style={{color:"#645CAA"}}>Loading..</span> : data2.users.length === 0 ? <span>No results found..</span> : data2.users.map(user =>
                    <div key={user.id} className="w-full mb-4 p-4 flex flex-row items-center justify-start rounded-md border border-slate-200 shadow-md space-x-4 duration-150 hover:scale-110">
                           <Image src="/unknown.png" width={24} height={24}/>
                           <div className="flex-1" style={{flex:1}}>{user.firstName}</div>
                           <input type="radio" name="pickone" value={pickedId === user.id ? true : false} onChange={(e)=>{setPickedId(user.id)}}/>
                    </div>
                    )}
        </div>
        

        <Input placeholder="Enter Present Number" label="Present Number" name="present" form={attendanceForm} setForm={setAttendanceForm}/>
        <Input placeholder="Enter Present Number" label="Absent Number" name="absent" form={attendanceForm} setForm={setAttendanceForm}/>
        <Input placeholder="Enter Present Number" label="Sick Number" name="sick" form={attendanceForm} setForm={setAttendanceForm}/>
        <Input placeholder="Enter Present Number" label="Permission Number" name="permission" form={attendanceForm} setForm={setAttendanceForm}/>

        <Button content="Add Attendance" onClick={PostAttendance} theme="primary" width="full" mt={4}/>
    </div>

   </div>
  )
}

export default PostAttendance