import AddFolderComponent from '@/components/contentComponents/AddFolderComponent'
import FolderComponent from '@/components/contentComponents/FolderComponent'
import React from 'react'

const ContentPage = () => {
  return (
    <div className='h-full w-full  p-10'>
     <div className="h-auto w-full flex gap-4">
      <FolderComponent/>
      <FolderComponent/>
      <FolderComponent/>
      <FolderComponent/>
      <FolderComponent/>
      <AddFolderComponent/>
     </div>
    </div>
  )
}

export default ContentPage
