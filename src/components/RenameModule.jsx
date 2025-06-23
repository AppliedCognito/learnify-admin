import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"

import { useUpdatePaper } from '@/hooks/paperHook'
import { useUpdateSubject } from '@/hooks/subjectHook'
import { useUpdateModule } from '@/hooks/moduleHook'
import { useUpdateSubModule } from '@/hooks/subModuleHook'

const RenameModule = ({ open, setOpen, paper, type, parentId }) => {
  const [name, setName] = useState(paper.name)

  useEffect(() => {
    setName(paper.name)
  }, [paper])

  const updateHookMap = {
    paper: useUpdatePaper,
    subject: useUpdateSubject,
    module: useUpdateModule,
    submodule: useUpdateSubModule,
  }

  const useUpdate = updateHookMap[type] || useUpdatePaper
  const { mutate: updateItem, isLoading } = useUpdate()

  const handleRename = () => {
    if (name.trim()) {
      const updatedData = { name }
      
      // Include parentId if applicable
      if (type === 'subject') updatedData.paper_id = parentId
      if (type === 'module') updatedData.subject_id = parentId
      if (type === 'submodule') updatedData.module_id = parentId

      updateItem(
        { id: paper._id, updatedData },
        {
          onSuccess: () => setOpen(false),
        }
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename {type}</DialogTitle>
        </DialogHeader>
        <div className="h-auto w-auto">
          <Input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={
            (e)=>{
              if(e.key == 'Enter'){
                handleRename()
              }
            }
          }/>
        </div>
        <div className="h-auto w-full flex justify-end gap-3 items-end">
          <Button className="bg-transparent text-purple-700 hover:bg-white" onClick={() => setOpen(false)}>Cancel</Button>
          <Button className="bg-purple-700 text-white hover:bg-purple-800" onClick={handleRename} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RenameModule
