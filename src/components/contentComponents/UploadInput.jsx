import { ImageUp } from 'lucide-react'
import React from 'react'

const UploadInput = ({title,placeholder}) => {
  return (
    <div className="flex flex-col gap-2">
          <p>{title}</p>
          <div className="flex border-gray-100 border-2 justify-center items-center px-4 rounded-full">
            <input type="text" className='w-full h-10 bg-white rounded-md p-2 outline-none ' placeholder={placeholder} />
            <ImageUp/>
          </div>
    </div>
  )
}

export default UploadInput