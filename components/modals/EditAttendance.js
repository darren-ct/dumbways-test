import { useState, useContext, useEffect } from "react"
import {AttendanceContext} from "../../pages/attendances/[id]"

import { useQuery, useMutation } from "@apollo/client";
import { GET_ATTENDANCE } from "../../lib/names/attendances";
import { PUT_ATTENDANCE } from "../../lib/names/attendances";

import Loader from "../notify/Loader";
import Button from "../basic/Button";
import Input from "../basic/Input";
import Error from "../notify/Error";

const EditAttendance = ({id, setOnEdit}) => {
  const {refetch, setSuccessMsg, classId} = useContext(AttendanceContext);

  const [updateattendance, { data:data2, loading:loading2, error:error2 }] = useMutation(PUT_ATTENDANCE);
  const {data, loading, error, refetch:refetch2} = useQuery(GET_ATTENDANCE, {
    notifyOnNetworkStatusChange:true,
    variables : {
      id : id
    }
  });

  // State
  const[attendanceForm,setAttendanceForm] = useState({
    present: {value:"",error:""},
    absent: {value:"",error:""},
    sick: {value:"",error:""},
    permission: {value:"",error:""}
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
           setAttendanceForm(
            {
              present: {value:data.attendance.present,error:""},
              absent: {value:data.attendance.absent,error:""},
              sick: {value:data.attendance.sick,error:""},
              permission: {value:data.attendance.permission,error:""}
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
          setSuccessMsg("Attendance successfully edited")
          refetch({where : {
            student: {
              classesId: classId
            }
          }})
      };
  },[data2])
  
  // Functions
  const EditAttendance = () => {

    setAttendanceForm(prev => { return {
      present: {value:prev.present.value,error:""},
      absent: {value:prev.absent.value,error:""},
      sick: {value:prev.sick.value,error:""},
      permission: {value:prev.permission.value,error:""}
    }})

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


    updateattendance({
      variables : {
        id: id,
        input: {
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
  if(error2 || error) return <Error />
  if(loading2 || loading) return <Loader/>


  return (
    <div style={{background:"rgba(0,0,0,.8)",zIndex:49}} className='w-full h-full fixed top-0 left-0 flex items-center justify-center' onClick={()=>{setOnEdit(false)}}>

    <div className='h-96 relative py-12 px-24 bg-white flex flex-col items-center rounded-md' onClick={ignore} style={{overflowY:"scroll"}}>
        <span className="absolute top-4 right-4 cursor-pointer text-xl font-semibold" onClick={()=>{setOnEdit(false)}}>X</span>

        <span className='text-xl font-semibold'>Edit Attendance</span>
        <span className="mb-12">Please fill in all forms. Make sure all are numbers.</span>

        <Input placeholder="Enter Present Number" label="Present Number" name="present" form={attendanceForm} setForm={setAttendanceForm}/>
        <Input placeholder="Enter Present Number" label="Absent Number" name="absent" form={attendanceForm} setForm={setAttendanceForm}/>
        <Input placeholder="Enter Present Number" label="Sick Number" name="sick" form={attendanceForm} setForm={setAttendanceForm}/>
        <Input placeholder="Enter Present Number" label="Permission Number" name="permission" form={attendanceForm} setForm={setAttendanceForm}/>

        <Button content="Edit Attendance" onClick={EditAttendance} theme="primary" width="full" mt={4}/>
    </div>

   </div>
  )
}

export default EditAttendance