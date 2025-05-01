import React from 'react'
import BuildingImg from '@/assets/image/Building.png'

const BuildingCard = () => {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
        <img src={BuildingImg} alt="BuildingImage" />
        <p className='text-xl text-black font-semibold'>We're Still Building</p>
        <p className='text-sm text-[#ADADAD] font-normal'>Thanks for stopping by!</p>
        <p className='text-sm text-[#ADADAD] font-normal'> We’re hard at work crafting something exciting, and it’s not quite ready yet.</p>
      
    </div>
  )
}

export default BuildingCard
