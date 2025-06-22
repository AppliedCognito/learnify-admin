import { CirclePlus } from 'lucide-react'
import React from 'react'

const AddFolderComponent = () => {
  return (
    <div className="h-auto w-auto transform transition duration-300 hover:scale-105">
        <div className='h-20 w-20 cursor-pointer '>
            <div className="h-4 w-16 bg-[#EBEBEB] rounded-t-md"></div>
            <div className="h-16 w-full bg-[#EBEBEB] rounded-b-md flex justify-center items-center mt-[-1px]"> <CirclePlus size={16}/></div> 
        </div>
        <p className='h-auto w-20 text-md text-[#272727] font-bold text-center'>Add new</p>
    </div>
  )
}

export default AddFolderComponent
