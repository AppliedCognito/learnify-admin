import React from 'react'

const AchievCard = ({AchievImage,AchievTitle}) => {
  return (
    <div className="h-60 w-full rounded-2xl flex flex-col justify-center items-center bg-[#F2F2F2] ">
        <img src={AchievImage} alt="rank" />
        <p className='text-black text-[16px] font-bold'>{AchievTitle}</p>
    </div>
  )
}

export default AchievCard