import { useState, useEffect, createContext} from "react";
import { useQuery } from '@apollo/client';
import { useRouter } from "next/router"
import Image from "next/image";

import client from "../lib/apollo-client";
import {GET_BATCHES} from "../lib/names/batches";

import BatchRow from "../components/rows/BatchRow";

import Loader from "../components/notify/Loader";
import Error from "../components/notify/Error";
import Success from "../components/notify/Success";

import PostBatch from "../components/modals/PostBatch";
import EditBatch from "../components/modals/EditBatch";
import DeleteBatch from "../components/modals/DeleteBatch";



export const HomeContext = createContext(null);


const Index = () => {

   const {push} = useRouter();
  
  const { loading, error, data, refetch } = useQuery(GET_BATCHES,{notifyOnNetworkStatusChange: true,
      variables: {
            limit:10,
            skip:0,
            where : {
                  name_contains:""
            }
      }
   });

  // STATE 
        // sort
  const [page,setPage] = useState(1);
  const [search, setSearch] = useState("");

        // delete related
  const [deleteModal, setDeleteModal] = useState(false);
  const [onDelete,setOnDelete] = useState(null); //id

        // edit related
  const [editModal , setEditModal] = useState(false);
  const [onEdit, setOnEdit] = useState(null); // id
 

        // post related
  const [onPost, setOnPost] = useState(false);

        // notif 
  const [successMsg,setSuccessMsg] = useState(null);   
  
  // EFFECT
  useEffect(()=>{
      if(data) { 
            refetch({
                  limit:10,
                  skip: (page - 1) * 10,
                  name_contains: search
                })
      };
            
  },[search, page]);

//   useEffect(()=>{
//        if(!token) push('/auth/login');
//   },[])

  // FUNCTION
  const onChange = (e) => {
    setSearch(e.target.value)
  };

  const incrementPage = () => {
     setPage(page => page + 1);
  };

  const decrementPage = () => {
     if(page === 1) return;
     setPage(page => page - 1)
  }

  // 
  if(error) return <Error />
  if(loading) return <Loader />
  if(successMsg) return <Success setSuccessMsg={setSuccessMsg} successMsg={successMsg}/>

  return (
  <HomeContext.Provider value={{setOnEdit,setOnDelete,setEditModal,setDeleteModal,setSuccessMsg,refetch,push}}>
     <div className='xl:container xl:mx-auto px-8 py-4 flex flex-col items-center'>
          {deleteModal && <DeleteBatch setDeleteModal={setDeleteModal} id={onDelete}/> }
          {editModal && <EditBatch setEditModal={setEditModal} id={onEdit}/>}
          {onPost && <PostBatch setOnPost={setOnPost}/>}

          <span className='text-3xl font-semibold mt-10 mb-8'>Daftar Batches</span>
          <div className='relative w-full max-w-lg'>
                <span className="absolute left-6 top-3">
                    <Image src="/search.png" width="12" height="12"/>
                </span>
                <input value={search} onChange={onChange} placeholder='Cari batch'  className='w-full outline-none bg-slate-100 rounded-lg py-3 px-12'/>
          </div>
          <div className="w-full max-w-2xl flex flex-row justify-between mt-16 -mb-10">
              <span className="text-xs" style={{color:"#645CAA"}}> Showing results for "{search}" on page number {page} </span>
              <span className="text-xs" style={{color:"#645CAA"}}> *Every page contains  maximum 10 fields</span>
          </div>


          {/* TABLE */}
          <div className="w-full max-w-2xl flex flex-row items-center justify-end"> 
             <div className="text-lg text-white px-3 py-1 rounded-full flex items-center justify-center cursor-pointer translate-x-12 translate-y-16 hover:scale-110 duration-150" 
             style={{background:"#645CAA"}} onClick={()=>{setOnPost(true)}}>+</div>
          </div>

          <table className="relative w-full max-w-2xl border rounded-3xl border-slate-200 mt-4">
               <thead>
                    <tr className="border-b-2">
                       <th className="p-4 text-white">No.</th>
                       <th className="p-4 text-white">Name</th>
                       <th className="p-4 text-white">Action</th>
                    </tr>
              </thead>
              <tbody>
                  {data.batches.map((batch,index) => <BatchRow id={batch.id} name={batch.name} key={batch.id} index={index}/>)}
              </tbody> 
         </table>

        {/* PAGINATION */}
         <div className="flex flex-row items-center space-x-2 py-2 px-3 mt-10 mb-16 bg-slate-100 rounded">
             <div className="flex items-center justify-center text-white px-3 py-1 rounded font-semibold cursor-pointer hover:scale-110 duration-150" style={{background:"#645CAA"}} onClick={decrementPage}>{"<"}</div>
             <div>{page}</div>
             <div className="flex items-center justify-center text-white px-3 py-1 rounded font-semibold cursor-pointer hover:scale-110 duration-150" style={{background:"#645CAA"}} onClick={incrementPage}>{">"}</div>
         </div>
     </div>
 </HomeContext.Provider>
  )
};


export default Index