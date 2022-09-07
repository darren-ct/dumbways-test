import { useContext, useEffect } from "react";
import { HomeContext } from "../../pages";

import { useMutation } from "@apollo/client";
import { DELETE_BATCH } from "../../lib/names/batches";

import Loader from "../notify/Loader";
import Button from "../basic/Button";

const DeleteBatch = ({id,setDeleteModal}) => {
  const {refetch, setSuccessMsg} = useContext(HomeContext);
  const [deleteBatch, { data, loading, error }] = useMutation(DELETE_BATCH);

  console.log(data);
  
    // useEffect
    useEffect(()=>{
         if(data) {
          setSuccessMsg("Batch deleted");
          refetch({limit:10})
         }
    },[data])

    // Functions
    const deleteItem = async(e) => {
         deleteBatch({variables:{
             id:id
         }});

    };

    const ignore = (e) => {
      e.stopPropagation();
  
    };

    // 
    {loading && <Loader />}
  
    return (
      <div style={{background:"rgba(0,0,0,.8)",zIndex:49}} className='w-full h-full fixed top-0 left-0 flex items-center justify-center' onClick={()=>{setDeleteModal(false)}}>
          <div className='py-12 px-24 bg-white flex flex-col items-center rounded-md' onClick={ignore}>
              <span className='text-xl'>Are you sure you want to delete this?</span>
              <div className="flex-row items-center justify-center space-x-2 mt-8">
                   <Button content="Nevermind" onClick={()=>{setDeleteModal(false)}} theme="secondary" width="flex" mt={0}/>
                   <Button content="Yes, delete it" onClick={deleteItem} theme="alert" width="flex" mt={0}/>
              </div>
          </div>
      </div>
    )
  }
  

export default DeleteBatch