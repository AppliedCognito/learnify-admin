import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import AddFolderComponent from "./contentComponents/AddFolderComponent"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"


const AddNewModule = () => {
  return (
    <Dialog>
        <DialogTrigger><AddFolderComponent/></DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Add new module</DialogTitle>
            </DialogHeader>
            <div className="h-auto w-auto">
                <Input />
            </div>
            <div className="h-auto w-full flex justify-end gap-3 items-end">
                <Button className='bg-transparent text-purple-700 hover:bg-white'>Cancel</Button>
                <Button className='bg-transparent text-purple-700 hover:bg-white'>Create</Button>
            </div>
            
        </DialogContent>
    </Dialog>

  )
}

export default AddNewModule
