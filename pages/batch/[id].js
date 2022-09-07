import client from "../../lib/apollo-client";

import { GET_CLASSES } from "../../lib/names/classes";
import {GET_BATCH} from "../../lib/names/batches"

const batch = (props) => {
  return (
    <div>
        
    </div>
  )
}

export default batch

// OTHERS
export async function getServerSideProps(context) {
  const id = context.params.id;

  const { data } = await client.query({
    query: GET_CLASSES,
    variables : {batchId:id}
  });


   return {
        props : {
             id : id,
             classess : data.classes
        }
   }
}