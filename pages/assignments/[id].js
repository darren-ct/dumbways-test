import { useState, createContext } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import client from "../../lib/apollo-client";
import { GET_CLASS } from "../../lib/names/classes";
import { GET_STUDENTS } from "../../lib/names/students";

import AssignmentRow from "../../components/rows/AssignmentRow";
import UpdateAssignments from "../../components/modals/UpdateAssignments";


import Success from "../../components/notify/Success";
import Loader from "../../components/notify/Loader";
import Error from "../../components/notify/Error";

export const AssignmentContext = createContext(null)


const Assignment = (props) => {
  const {push} = useRouter();

  const {loading,error,data, refetch} = useQuery(GET_STUDENTS, {notifyOnNetworkStatusChange:true,variables:{
    id : props.id
  }})

  // States
        // edit related
  const [updateModal, setUpdateModal] = useState(false);
  const [onUpdate, setOnUpdate] = useState(null);

        // notif 
  const [successMsg,setSuccessMsg] = useState(null);  
  
  // 
  if(error) return <Error />
  if(loading) return <Loader />
  if(successMsg) return <Success setSuccessMsg={setSuccessMsg} successMsg={successMsg}/>


  return (
  <AssignmentContext.Provider value={{refetch,setSuccessMsg,setOnUpdate,setUpdateModal,classId:props.id}}>
    <div className="relative xl:container xl:mx-auto px-8 py-4 flex flex-col items-center">
         {updateModal && <UpdateAssignments setUpdateModal={setUpdateModal} id={onUpdate} type={props.type}/>}

          <div className="absolute flex flex-row items-center space-x-4 left-8">
            <span style={{color:"#645CAA"}} className="cursor-pointer underline underline-offset-1" onClick={()=>{push("/")}}>Batches</span>
            <span className="font-bold" style={{color:"#645CAA"}}>{"<"}</span>
            <span style={{color:"#645CAA"}} className="cursor-pointer underline underline-offset-1" onClick={()=>{push(`/batch/${props.batchId}`)}}>{props.name}</span>
            <span className="font-bold" style={{color:"#645CAA"}}>{"<"}</span>
            <span style={{color:"#645CAA"}} className="cursor-pointer underline underline-offset-1" onClick={()=>{push(`/class/${props.id}`)}}>{props.type}</span>
            <span className="font-bold" style={{color:"#645CAA"}}>{"<"}</span>
            <span style={{color:"#645CAA"}}>Assignments</span>
          </div>

          <span className="mt-24 font-semibold text-2xl">{props.name}-{props.type}&apos;s Assignments</span>

          {/* TABLE */}
          <table className="relative w-full max-w-2xl border rounded-3xl border-slate-200 mt-10 mb-12">
               <thead>
                    <tr className="border-b-2">
                       <th className="p-4 text-white">No.</th>
                       <th className="p-4 text-white">First Name</th>
                       <th className="p-4 text-white">Action</th>
                    </tr>
              </thead>
              <tbody>
                  {data.class.students.length === 0 ? <p>Jika list kosong, berarti kelas masih tidak ada anggota, mohon tambah anggota terlebih dahulu</p> : data.class.students.map((student,index) => <AssignmentRow item={student} key={student.id} index={index}/>)}
              </tbody> 
         </table>
    </div>
  </AssignmentContext.Provider>

  )
}

export default Assignment

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