import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Trash } from 'lucide-react'

const DeleteModule = ({open, setOpen}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Delete module</DialogTitle>
            </DialogHeader>
            <div className="h-auto w-full flex justify-end gap-3 items-end">
                <Button className='bg-transparent text-purple-700 hover:bg-white' onClick={() => setOpen(false)}>Cancel</Button>
                <Button className='bg-transparent text-purple-700 hover:bg-white'>Delete</Button>
            </div>
            
        </DialogContent>
    </Dialog>
  )
}

export default DeleteModule
