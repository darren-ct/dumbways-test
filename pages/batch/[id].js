import { useState, createContext } from "react";
import { useQuery } from '@apollo/client';
import { useRouter } from "next/router";
import client from "../../lib/apollo-client";

import { GET_CLASSES } from "../../lib/names/classes";
import {GET_BATCH} from "../../lib/names/batches";
import PostClass from "../../components/modals/PostClass";

import Success from "../../components/notify/Success"
import Loader from "../../components/notify/Loader";
import Error from "../../components/notify/Error";

export const ClassContext = createContext(null)

const Batch = (props) => {
  const [onPost, setOnPost] = useState(false);
  const [successMsg,setSuccessMsg] = useState(null);   

  const {loading,error,data, refetch} = useQuery(GET_CLASSES, {notifyOnNetworkStatusChange:true,variables:{
    where: {batchId : props.id}
  }})
  const {push} = useRouter();

  // 
  if(error) return <Error />
  if(successMsg) return <Success setSuccessMsg={setSuccessMsg} successMsg={successMsg}/>
  if(loading) return <Loader />

  return (
  <ClassContext.Provider value={{setOnPost, setSuccessMsg, refetch}}>
    {onPost && <PostClass setOnPost={setOnPost} id={props.id}/>}
    <div className="relative xl:container xl:mx-auto px-8 py-4 flex flex-col items-center">
        <div className="absolute flex flex-row items-center space-x-4 left-8">
             <span style={{color:"#645CAA"}} className="cursor-pointer underline underline-offset-1" onClick={()=>{push("/")}}>Batches</span>
             <span className="font-bold" style={{color:"#645CAA"}}>{"<"}</span>
             <span style={{color:"#645CAA"}}>{props.name}</span>
        </div>


      
        <span className="mt-20 mb-8 font-semibold text-3xl">Pick your class</span>
        <div className="flex flex-row space-x-16">

             {
              data.classes.map((item,index) => (
                <div className="p-20 flex flex-col items-center shadow-2xl rounded-xl border border-slate-100 cursor-pointer duration-150 hover:scale-110 hover:border-violet-600" onClick={()=>{push(`/class/${item.id}`)}}>
                 <span className="font-semibold text-3xl mb-4" style={{color:"#645CAA"}}>{index+1}</span>
                 <span className="text-xl">{item.type}</span>
             </div>
              ))
             }

             <div className="p-20 flex flex-col items-center shadow-2xl rounded-xl border border-slate-100 cursor-pointer duration-150 hover:scale-110 hover:border-violet-600"  onClick={()=>{setOnPost(true)}}>
             <div className='flex items-center justify-center rounded-full w-12 h-12 text-white font-semibold text-2xl' style={{background:"#645CAA"}}>+</div>
                 <span className="text-xl mt-4">Add More</span>
             </div>
        </div>
    </div>
    </ClassContext.Provider>
  )
}

export default Batch

// OTHERS
export async function getServerSideProps(context) {
  const id = context.params.id;

  const { data:data2 } = await client.query({
    query: GET_BATCH,
    variables : {id:id}
  });


   return {
        props : {
             name : data2.batch.name,
             id : id,
        }
   }
}