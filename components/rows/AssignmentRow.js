import { useContext } from "react";
import { AssignmentContext} from "../../pages/assignments/[id]";
import Button from "../basic/Button";

const AssignmentRow = ({item,index}) => {
    const{setUpdateModal,setOnUpdate} = useContext(AssignmentContext);

    const toEdit = (e) => {
         e.stopPropagation();
         setUpdateModal(true);
         setOnUpdate(item.id)
    };
  
    return (
    <tr className='text-center border-b border-slate-200'>
       <td className='p-3 text-lg'>{index + 1}</td>
       <td className='p-3 text-md'>{item.firstName}</td>
       <td className='p-3 flex flex-row space-x-3 items-center justify-center'>
           <Button onClick={toEdit} content="View & Edit Assignments" theme="primary" width="flex" mt={0}/>
       </td>
    </tr>
  
    )
}

export default AssignmentRow