import { useContext } from "react";
import { SoftskillContext } from "../../pages/softskills/[id]";
import Button from "../basic/Button";

const ProductivityRow = ({item,index}) => {
    const{setOnEdit,setEditId,setDeleteModal,setOnDelete} = useContext(SoftskillContext);

    // Functions
    const toDelete = (e) => {
        e.stopPropagation();
        setDeleteModal(true);
        setOnDelete(item.id);
   };

    const toEdit = (e) => {
         e.stopPropagation();
         setOnEdit(true);
         setEditId(item.id)
    };
  
    return (
    <tr className='text-center border-b border-slate-200'>
       <td className='p-3 text-lg'>{index + 1}</td>
       <td className='p-3 text-md'>{item.student.firstName}</td>
       <td className='p-3 text-lg text-green-500 font-semibold'>{item.point}</td>
       <td className='p-3 flex flex-row space-x-3 items-center justify-center'>
           <Button onClick={toDelete} content="Delete" theme="alert" width="default" mt={0}/>
           <Button onClick={toEdit} content="Edit" theme="primary" width="default" mt={0}/>
       </td>
    </tr>
  
    )
}

export default ProductivityRow