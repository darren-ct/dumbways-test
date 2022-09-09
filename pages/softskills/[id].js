import { useState, createContext } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import client from "../../lib/apollo-client";
import { GET_CLASS } from "../../lib/names/classes";
import {GET_SOFTSKILLS} from "../../lib/names/softskills"

import Success from "../../components/notify/Success";
import Loader from "../../components/notify/Loader";
import Error from "../../components/notify/Error";

import SoftskillRow from "../../components/rows/SoftskillRow";
import EditSoftSkill from "../../components/modals/EditSoftSkill";
import DeleteSoftskill from "../../components/modals/DeleteSoftskill";
import PostSoftSkill from "../../components/modals/PostSoftskill";


export const SoftskillContext = createContext(null)

const Softskill = (props) => {

  const {push} = useRouter();
  const {loading,error,data, refetch} = useQuery(GET_SOFTSKILLS, {notifyOnNetworkStatusChange:true,variables:{
    where: {
      student: {
        classesId: props.id
      }
    }
  }});

  // STATES
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
     <SoftskillContext.Provider value={{setOnEdit,setEditId,setOnDelete,setDeleteModal,refetch,setSuccessMsg,classId:props.id}}>
      <div className="relative xl:container xl:mx-auto px-8 py-4 flex flex-col items-center">
           {deleteModal && <DeleteSoftskill setDeleteModal={setDeleteModal} id={onDelete}/> }
           {onEdit && <EditSoftSkill id={editId} setOnEdit={setOnEdit}/>}
           {onPost && <PostSoftSkill setOnPost={setOnPost} ids={data.softSkills.map(softskill => softskill.student.id)}/>}

           <div className="absolute flex flex-row items-center space-x-4 left-8">
            <span style={{color:"#645CAA"}} className="cursor-pointer underline underline-offset-1" onClick={()=>{push("/")}}>Batches</span>
            <span className="font-bold" style={{color:"#645CAA"}}>{"<"}</span>
            <span style={{color:"#645CAA"}} className="cursor-pointer underline underline-offset-1" onClick={()=>{push(`/batch/${props.batchId}`)}}>{props.name}</span>
            <span className="font-bold" style={{color:"#645CAA"}}>{"<"}</span>
            <span style={{color:"#645CAA"}} className="cursor-pointer underline underline-offset-1" onClick={()=>{push(`/class/${props.id}`)}}>{props.type}</span>
            <span className="font-bold" style={{color:"#645CAA"}}>{"<"}</span>
            <span style={{color:"#645CAA"}}>Softskills</span>
          </div>

          <span className="mt-24 font-semibold text-2xl">{props.name}-{props.type}&apos;s Softskills</span>

          {/* TABLE */}
          <div className="w-full max-w-4xl flex flex-row items-center justify-end mt-10"> 
             <div className="text-lg text-white px-3 py-1 rounded-full flex items-center justify-center cursor-pointer -translate-x-14 translate-y-16 hover:scale-110 duration-150" 
             style={{background:"#645CAA"}} onClick={()=>{setOnPost(true)}}>+</div>
          </div>

          <table className="relative w-full max-w-2xl border rounded-3xl border-slate-200 mt-4 mb-12">
               <thead>
                    <tr className="border-b-2">
                       <th className="p-4 text-white">No.</th>
                       <th className="p-4 text-white">First Name</th>
                       <th className="p-4 text-white">Point</th>
                       <th className="p-4 text-white">Actions</th>
                    </tr>
              </thead>
              <tbody>
                  {data.softSkills.map((softskill,index) => <SoftskillRow item={softskill} key={softskill.id} index={index}/>)}
              </tbody> 
         </table>
      </div>
     </SoftskillContext.Provider>
  )
}

export default Softskill


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