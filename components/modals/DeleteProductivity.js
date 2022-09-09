import { useContext, useEffect } from "react";
import { ProductivityContext } from "../../pages/productivities/[id]";

import { useMutation } from "@apollo/client";
import { DELETE_PRODUCTIVITY } from "../../lib/names/productivity";

import Loader from "../notify/Loader";
import Error from "../notify/Error";
import Button from "../basic/Button";

const DeleteProductivity = ({id, setDeleteModal}) => {
  const {refetch, setSuccessMsg, classId} = useContext(ProductivityContext);
  const [deleteProd, { data, loading, error }] = useMutation(DELETE_PRODUCTIVITY);

     // useEffect
 useEffect(()=>{
      if(data) {
       setSuccessMsg("User productivity deleted");
       refetch({where: {
        student: {
          classesId: classId
        }
      }});
       setDeleteModal(false)
      }
 },[data])

 // Functions
 const deleteItem = async(e) => {
      deleteProd({variables:{
          id:id
      }});

 };

 const ignore = (e) => {
   e.stopPropagation();

 };

 // 
 {loading && <Loader />}
 {error && <Error />}

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

export default DeleteProductivity