import { useContext } from "react";
import { HomeContext } from "../../pages";
import Button from "../basic/Button";

const BatchRow = ({id,name,index}) => {
  const{setOnEdit,setOnDelete,setEditModal,setDeleteModal,push} = useContext(HomeContext);

  // Functions
  const toDelete = (e) => {
       e.stopPropagation();
       setDeleteModal(true);
       setOnDelete(id);
  };

  const toEdit = (e) => {
       e.stopPropagation();
       setEditModal(true);
       setOnEdit(id)
  };

  return (
  <tr className='text-center border-b border-slate-200 cursor-pointer duration-150 hover:scale-105 hover:opacity-70' onClick={()=>{push(`/batch/${id}`)}}>
     <td className='p-3 text-lg'>{index + 1}</td>
     <td className='p-3 text-lg'>{name}</td>
     <td className='p-3 flex flex-row space-x-3 items-center justify-center'>
         <Button onClick={toDelete} content="Delete" theme="alert" width="default" mt={0}/>
         <Button onClick={toEdit} content="Edit" theme="primary" width="default" mt={0}/>
     </td>
  </tr>

  )
}

export default BatchRow