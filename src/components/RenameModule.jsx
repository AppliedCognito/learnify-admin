// RenameModule.jsx
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"

const RenameModule = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Rename module</DialogTitle>
            </DialogHeader>
            <div className="h-auto w-auto">
                <Input />
            </div>
            <div className="h-auto w-full flex justify-end gap-3 items-end">
                <Button 
                    className='bg-transparent text-purple-700 hover:bg-white'
                    onClick={() => setOpen(false)}
                >Cancel</Button>
                <Button className='bg-transparent text-purple-700 hover:bg-white'>Create</Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default RenameModule
