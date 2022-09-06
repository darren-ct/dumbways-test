import {useRouter} from 'next/router';
import Link from 'next/link';

const id = () => {
  const {query,push} = useRouter();

  const id = query.id;

  console.log(id)
  
  return (
    <div>
        <Link href='/'>Home</Link>
        <p onClick={()=>{push('/')}}>Home</p>
    </div>
  )
}

export default id