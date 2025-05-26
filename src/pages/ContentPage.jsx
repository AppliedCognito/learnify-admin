import AddNewModule from '@/components/AddNewModule'
import FinalFolderComponent from '@/components/contentComponents/FinalFolderComponent'
import FolderComponent from '@/components/contentComponents/FolderComponent'
import ImportBtn from '@/components/contentComponents/importBtn'
import { DataTableDemo } from '@/components/DataTableDemo'
import { Button } from '@/components/ui/button'
import { Plus, ScanText } from 'lucide-react'
import React from 'react'

const ContentPage = () => {
  return (
    <div className='h-full w-full lg:p-10 p-5'>
     <div className="h-auto w-full flex flex-wrap gap-4 items-start">
      <FolderComponent/>
      <FolderComponent/>
      <FolderComponent/>
      <FinalFolderComponent/>
      <AddNewModule/>
     </div>
     <div className="h-auto mt-10 w-full flex justify-end items-end gap-2">
      <Button>
        <Plus color='white' /> Create hai
      </Button>
      <ImportBtn/>
      
     </div>
     
     <DataTableDemo/>
    </div>
  )
}

export default ContentPage
