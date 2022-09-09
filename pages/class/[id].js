import { useRouter } from "next/router";
import Image from "next/image";

import client from "../../lib/apollo-client";
import { GET_CLASS } from "../../lib/names/classes";


const Class = (props) => {
  const {push} = useRouter();

  return (
    <div className="relative xl:container xl:mx-auto px-8 py-4 flex flex-col items-center">
        <div className="absolute flex flex-row items-center space-x-4 left-8">
             <span style={{color:"#645CAA"}} className="cursor-pointer underline underline-offset-1" onClick={()=>{push("/")}}>Batches</span>
             <span className="font-bold" style={{color:"#645CAA"}}>{"<"}</span>
             <span style={{color:"#645CAA"}} className="cursor-pointer underline underline-offset-1" onClick={()=>{push(`/batch/${props.batchId}`)}}>{props.name}</span>
             <span className="font-bold" style={{color:"#645CAA"}}>{"<"}</span>
             <span style={{color:"#645CAA"}}>{props.type}</span>
        </div>

        <span className="mt-24 font-semibold text-2xl">Welcome to {props.name}, {props.type}</span>

        {/* ROW 1 */}
        <div className="flex flex-row items-center justify-center space-x-8 mt-12">
             <div className="w-72 py-20 flex flex-col items-center shadow-2xl rounded-xl border border-slate-100 cursor-pointer duration-150 hover:scale-110 hover:border-violet-600"
             onClick={()=>{push(`/students/${props.id}`)}}>
                <Image src="/students.jpg" width={120} height={120}/>
                <span className="text-xl mt-4">Students</span>
             </div>

             <div className="w-72 py-20 flex flex-col items-center shadow-2xl rounded-xl border border-slate-100 cursor-pointer duration-150 hover:scale-110 hover:border-violet-600"
             onClick={()=>{push(`/attendances/${props.id}`)}}>
                <Image src="/attendance.jpg" width={120} height={120}/>
                <span className="text-xl mt-4">Attendance</span>
             </div>

             <div className="w-72 py-20 flex flex-col items-center shadow-2xl rounded-xl border border-slate-100 cursor-pointer duration-150 hover:scale-110 hover:border-violet-600"
              onClick={()=>{push(`/productivities/${props.id}`)}}>
                <Image src="/productivity.jpg" width={120} height={120}/>
                <span className="text-xl mt-4">Productivity</span>
             </div>
        </div>

        {/* ROW 2 */}
        <div className="flex flex-row items-center justify-center space-x-8 mt-12 mb-24">
             <div className="w-72 py-20 flex flex-col items-center shadow-2xl rounded-xl border border-slate-100 cursor-pointer duration-150 hover:scale-110 hover:border-violet-600"
             onClick={()=>{push(`/softskills/${props.id}`)}}>
                <Image src="/softskill.jpg" width={140} height={120}/>
                <span className="text-xl mt-4">Softskill</span>
             </div>

             <div className="w-72 py-20 flex flex-col items-center shadow-2xl rounded-xl border border-slate-100 cursor-pointer duration-150 hover:scale-110 hover:border-violet-600"
              onClick={()=>{push(`/assignments/${props.id}`)}}>
                <Image src="/assignment.jpg" width={120} height={120} />
                <span className="text-xl mt-4">Assignment</span>
             </div>

             <div className="w-72 py-20 flex flex-col items-center shadow-2xl rounded-xl border border-slate-100 cursor-pointer duration-150 hover:scale-110 hover:border-violet-600"
              onClick={()=>{push(`/reports/${props.id}`)}}>
                <Image  src="/report.jpg" width={120} height={120}/>
                <span className="text-xl mt-4">Report</span>
             </div>
        </div>
    </div>
  )
}

export default Class

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