import { getPapers, getQuestions } from '@/api/adminApi'
import BuildingCard from '@/components/BuildingCard'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const Analyticspage = () => {
  const {
    data: papers,
    isLoading: isPapersLoading,
    isError: isPapersError
  } = useQuery({
    queryKey: ['papers'],
    queryFn: getPapers
  })

  const {
    data: questions,
    isLoading: isQuestionsLoading,
    isError: isQuestionsError
  } = useQuery({
    queryKey: ['questions'],
    queryFn: getQuestions
  })

  return (
    <div className='min-h-screen w-full flex flex-col items-center p-6 space-y-10'>
      <BuildingCard />

      {/* Papers Section */}
      <div className='w-full max-w-3xl'>
        <h2 className='text-xl font-bold mb-4'>Papers</h2>

        {isPapersLoading && <div>Loading papers...</div>}
        {isPapersError && <div>Failed to load papers.</div>}

        <div className='space-y-4'>
          {papers?.map((paper) => (
            <div key={paper._id} className='border p-4 rounded bg-gray-100'>
              <h3 className='text-lg font-semibold'>{paper.name}</h3>
              <p className='text-sm text-gray-600'>
                Created at: {new Date(paper.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Questions Section */}
      <div className='w-full max-w-3xl'>
        <h2 className='text-xl font-bold mb-4'>Questions</h2>

        {isQuestionsLoading && <div>Loading questions...</div>}
        {isQuestionsError && <div>Failed to load questions.</div>}

        <div className='space-y-6'>
          {questions?.map((question) => (
            <div key={question._id} className='border p-4 rounded bg-white shadow'>
              <h3 className='text-lg font-medium mb-2'>{question.text}</h3>
              <p className='text-sm text-gray-500 mb-2'>
                Created at: {new Date(question.createdAt).toLocaleString()}
              </p>
              <ul className='list-disc ml-5 space-y-1'>
                {question.options.map((opt) => (
                  <li
                    key={opt._id}
                    className={
                      opt._id === question.correct_option_id
                        ? 'font-semibold text-green-600'
                        : ''
                    }
                  >
                    {opt.option_text}
                    {opt._id === question.correct_option_id && ' (Correct)'}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analyticspage
