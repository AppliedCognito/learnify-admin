import AddFolderComponent from '@/components/contentComponents/AddFolderComponent'
import FolderComponent from '@/components/contentComponents/FolderComponent'
import { DataTableDemo } from '@/components/DataTableDemo'
import { Button } from '@/components/ui/button'
import { Plus, Scan, ScanText } from 'lucide-react'
import React from 'react'

const ContentPage = () => {
  return (
    <div className='h-full w-full lg:p-10 p-5'>
     <div className="h-auto w-full flex flex-wrap gap-4">
      <FolderComponent/>
      <FolderComponent/>
      <FolderComponent/>
      <FolderComponent/>
      <FolderComponent/>
      <AddFolderComponent/>
     </div>
     <div className="h-auto mt-10 w-full flex justify-end items-end gap-2">
      <Button>
        <Plus color='white' /> Create
      </Button>
      <Button className='bg-[#F5F5F5] text-black hover:bg-white'>
        <ScanText/> Import
      </Button>
     </div>
     <DataTableDemo/>
    </div>
  )
}

export default ContentPage
