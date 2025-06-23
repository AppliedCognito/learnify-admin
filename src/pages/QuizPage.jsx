import BuildingCard from '@/components/BuildingCard'
import { DataTableDemo } from '@/components/DataTableDemo'
import React from 'react'

const QuizPage = () => {
  return (
    <div className='h-screen w-full flex justify-center items-start lg:p-10 p-5'>
      {/* <BuildingCard/> */}
      <DataTableDemo/>
    </div>
  )
}

export default QuizPage
