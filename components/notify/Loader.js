import {MutatingDots} from 'react-loader-spinner'

const Loader = () => {
  return (
    <div style={{background:"rgba(0,0,0,.8)"}} className='w-full h-full fixed top-0 left-0 z-50 flex items-center justify-center'>
        <div className='py-12 px-24 bg-white flex flex-col items-center rounded-md'>
            <MutatingDots height="100" width="100" color="#BFACE0" secondaryColor= '#A084CA' radius='12.5' ariaLabel="mutating-dots-loading"  wrapperStyle={{}} wrapperClass="" visible={true}/>
            <span className='text-xl'>Loading...</span>
        </div>
    </div>
  )
}

export default Loader