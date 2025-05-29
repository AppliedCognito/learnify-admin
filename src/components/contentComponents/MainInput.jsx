import React from 'react'

const MainInput = ({title,placeholder}) => {
  return (
    <div className="flex flex-col gap-2">
        <p>{title}</p>
        <input type="text" className='w-full h-10 bg-white px-4  border-gray-100 border-2 rounded-full outline-none' placeholder={placeholder} />
    </div>
  )
}

export default MainInput