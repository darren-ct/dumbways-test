import { useContext } from "react";
import {StudentsContext} from "../../pages/students/[id].js"

import Button from "../basic/Button";


const StudentRow = ({item,index}) => {
        const{setOnDelete,setDeleteModal} = useContext(StudentsContext);
      
        // Functions
        const toDelete = (e) => {
             e.stopPropagation();
             setDeleteModal(true);
             setOnDelete(item.id);
        };
      
        return (
        <tr className='text-center border-b border-slate-200'>
           <td className='p-3 text-lg'>{index + 1}</td>
           <td className='p-3 text-lg'>{item.firstName}</td>
           <td className='p-3 text-lg'>{item.email}</td>
           <td className='p-3 text-lg' style={{color:"#645CAA"}}>{item.role}</td>
           <td className='p-3 flex flex-row space-x-3 items-center justify-center'>
               <Button onClick={toDelete} content="Delete" theme="alert" width="default" mt={0}/>
           </td>
        </tr>
      
        )
      };
  

export default StudentRow