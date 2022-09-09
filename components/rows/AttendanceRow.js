import { useContext } from "react";
import { AttendanceContext } from "../../pages/attendances/[id]";
import Button from "../basic/Button";

const AttendanceRow = ({item,index}) => {
  const{setOnEdit,setEditId,setDeleteModal,setOnDelete} = useContext(AttendanceContext);

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
  <tr className='text-center border-b border-slate-200 cursor-pointer'>
     <td className='p-3 text-lg'>{index + 1}</td>
     <td className='p-3 text-md'>{item.student.firstName}</td>
     <td className='p-3 text-lg text-green-500 font-semibold'>{item.present}</td>
     <td className='p-3 text-lg text-yellow-600 font-semibold'>{item.sick}</td>
     <td className='p-3 text-lg text-yellow-600 font-semibold'>{item.permission}</td>
     <td className='p-3 text-lg text-red-600 font-semibold'>{item.absent}</td>
     <td className='p-3 text-lg font-bold'>{Math.floor(item.present / 18 * 100)}</td>
     <td className='p-3 flex flex-row space-x-3 items-center justify-center'>
         <Button onClick={toDelete} content="Delete" theme="alert" width="default" mt={0}/>
         <Button onClick={toEdit} content="Edit" theme="primary" width="default" mt={0}/>
     </td>
  </tr>

  )
}

export default AttendanceRow