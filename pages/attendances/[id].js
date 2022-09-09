import { useState, createContext } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import client from "../../lib/apollo-client";
import { GET_CLASS } from "../../lib/names/classes";
import {GET_ATTENDANCES} from "../../lib/names/attendances";

import Success from "../../components/notify/Success";
import Loader from "../../components/notify/Loader";
import Error from "../../components/notify/Error";

import AttendanceRow from "../../components/rows/AttendanceRow";
import PostAttendance from "../../components/modals/PostAttendance";
import EditAttendance from "../../components/modals/EditAttendance";
import DeleteAttendance from "../../components/modals/DeleteAttendance";

export const AttendanceContext = createContext(null)


const Attendances = (props) => {
  const {push} = useRouter();
  const {loading,error,data, refetch} = useQuery(GET_ATTENDANCES, {notifyOnNetworkStatusChange:true,variables:{
    where : {
      student: {
        classesId: props.id
      }
    }
  }})

  // States
    // delete related
      const [deleteModal, setDeleteModal] = useState(false);
      const [onDelete, setOnDelete] = useState(null)
  
    // post related
    const [onPost, setOnPost] = useState(false);

    // edit related
    const [onEdit, setOnEdit] = useState(false);
    const[editId, setEditId] = useState(null);

     // notif 
    const [successMsg,setSuccessMsg] = useState(null);  
  
  // 
  if(error) return <Error />
  if(loading) return <Loader />
  if(successMsg) return <Success setSuccessMsg={setSuccessMsg} successMsg={successMsg}/>


  return (
  <AttendanceContext.Provider value={{refetch, setSuccessMsg, setOnPost, setOnDelete, setDeleteModal, setOnEdit, setEditId, classId:props.id}}>
      <div className="relative xl:container xl:mx-auto px-8 py-4 flex flex-col items-center">
           {onEdit && <EditAttendance id={editId} setOnEdit={setOnEdit}/>}
           {onPost && <PostAttendance setOnPost={setOnPost} ids={data.attendances.map(attendance => attendance.student.id)}/>}
           {deleteModal && <DeleteAttendance setDeleteModal={setDeleteModal} id={onDelete}/> }

           <div className="absolute flex flex-row items-center space-x-4 left-8">
            <span style={{color:"#645CAA"}} className="cursor-pointer underline underline-offset-1" onClick={()=>{push("/")}}>Batches</span>
            <span className="font-bold" style={{color:"#645CAA"}}>{"<"}</span>
            <span style={{color:"#645CAA"}} className="cursor-pointer underline underline-offset-1" onClick={()=>{push(`/batch/${props.batchId}`)}}>{props.name}</span>
            <span className="font-bold" style={{color:"#645CAA"}}>{"<"}</span>
            <span style={{color:"#645CAA"}} className="cursor-pointer underline underline-offset-1" onClick={()=>{push(`/class/${props.id}`)}}>{props.type}</span>
            <span className="font-bold" style={{color:"#645CAA"}}>{"<"}</span>
            <span style={{color:"#645CAA"}}>Attendance</span>
          </div>

          <span className="mt-24 font-semibold text-2xl">{props.name}-{props.type}'s Attendance</span>

          {/* TABLE */}
          <div className="w-full max-w-4xl flex flex-row items-center justify-end mt-10"> 
             <div className="text-lg text-white px-3 py-1 rounded-full flex items-center justify-center cursor-pointer -translate-x-2 translate-y-16 hover:scale-110 duration-150" 
             style={{background:"#645CAA"}} onClick={()=>{setOnPost(true)}}>+</div>
          </div>

          <table className="relative w-full max-w-2xl border rounded-3xl border-slate-200 mt-4 mb-12">
               <thead>
                    <tr className="border-b-2">
                       <th className="p-4 text-white">No.</th>
                       <th className="p-4 text-white">First Name</th>
                       <th className="p-4 text-white">Present</th>
                       <th className="p-4 text-white">Sick</th>
                       <th className="p-4 text-white">Permission</th>
                       <th className="p-4 text-white">Absent</th>
                       <th className="p-4 text-white">Score</th>
                       <th className="p-4 text-white">Actions</th>
                    </tr>
              </thead>
              <tbody>
                  {data.attendances.map((attendance,index) => <AttendanceRow item={attendance} key={attendance.id} index={index}/>)}
              </tbody> 
         </table>
      </div>
  </AttendanceContext.Provider>
  )
}

export default Attendances

// OTHERS
export async function getServerSideProps(context) {
  const id = context.params.id;

  const { data } = await client.query({
    query: GET_CLASS,
    variables : {id:id}
  });

   return {
        props : {
             type : data.class.type,
             id : id,
             batchId : data.class.batch.id,
             name : data.class.batch.name
        }
   }
}