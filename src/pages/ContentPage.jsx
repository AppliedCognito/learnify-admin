import { getPapers } from '@/api/adminApi'
import AddNewModule from '@/components/AddNewModule'
import AddQuestion from '@/components/contentComponents/AddQuestion'
import FinalFolderComponent from '@/components/contentComponents/FinalFolderComponent'
import FolderComponent from '@/components/contentComponents/FolderComponent'
import ImportBtn from '@/components/contentComponents/importBtn'
import MainInput from '@/components/contentComponents/MainInput'
import SelectBtn from '@/components/contentComponents/SelectBtn'
import SelectInput from '@/components/contentComponents/SelectInput'
import UploadInput from '@/components/contentComponents/UploadInput'
import { DataTableDemo } from '@/components/DataTableDemo'
import { Button } from '@/components/ui/button'
import { Select } from '@radix-ui/react-select'
import { useQuery } from '@tanstack/react-query'
import {ImageUp, Plus } from 'lucide-react'
import React from 'react'


const ContentPage = () => {
  const {
    data: papers,
    isLoading: isPapersLoading,
    isError: isPapersError
  } = useQuery({
    queryKey: ['papers'],
    queryFn: getPapers
  })
  return (
    <div className='h-full w-full lg:p-10 p-5'>
     <div className="h-auto w-full flex flex-wrap gap-4 items-start">
    {papers?.map((paper) => (
      <FinalFolderComponent key={paper._id} paper={paper}/>
    ))}
      
      <AddNewModule/>
     </div>
     <div className="h-auto mt-10 w-full flex justify-end items-end gap-2">
      <AddQuestion/>
      <ImportBtn/>
      
     </div>
     
     
     <DataTableDemo/>
     
     
    </div>
  )
}

export default ContentPage
