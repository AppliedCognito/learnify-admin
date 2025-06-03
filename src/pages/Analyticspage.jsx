import { getPapers } from '@/api/adminApi'
import BuildingCard from '@/components/BuildingCard'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const Analyticspage = () => {

  const {data, isLoading, isError} = useQuery({
    queryKey: ['papers'],
    queryFn: getPapers
  })


  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <BuildingCard/>
      <div className='w-full max-w-3xl'>
        <h2 className='text-xl font-bold mb-4'>Papers</h2>

        {isLoading && <div>Loading papers...</div>}
        {isError && <div>Failed to load papers.</div>}

        <div className='space-y-4'>
          {data?.map((paper) => (
            <div key={paper._id} className='border p-4 rounded bg-gray-100'>
              <h3 className='text-lg font-semibold'>{paper.name}</h3>
              <p className='text-sm text-gray-600'>
                Created at: {new Date(paper.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Analyticspage