import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"

import { useDeletePaper } from '@/hooks/paperHook'
import { useDeleteSubject } from '@/hooks/subjectHook'
import { useDeleteModule } from '@/hooks/moduleHook'
import { useDeleteSubModule } from '@/hooks/subModuleHook'

const DeleteModule = ({ open, setOpen, paper, type }) => {
  const deleteHookMap = {
    paper: useDeletePaper,
    subject: useDeleteSubject,
    module: useDeleteModule,
    submodule: useDeleteSubModule,
  }

  const useDelete = deleteHookMap[type] || useDeletePaper
  const { mutate: deleteItem, isLoading } = useDelete()

  const handleDelete = () => {
    deleteItem(paper._id, {
      onSuccess: () => setOpen(false),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {type}</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete <strong>{paper.name}</strong>?</p>
        <div className="h-auto w-full flex justify-end gap-3 items-end">
          <Button className="bg-transparent text-purple-700 hover:bg-white" onClick={() => setOpen(false)}>Cancel</Button>
          <Button className="bg-red-600 text-white hover:bg-red-700" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteModule
