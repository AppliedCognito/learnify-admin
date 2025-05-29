import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, ScanText } from "lucide-react"
import MainInput from "@/components/contentComponents/MainInput"
import UploadInput from "@/components/contentComponents/UploadInput"
import SelectInput from "@/components/contentComponents/SelectInput"
const AddQuestion = () => {
  return (
    <Dialog>
    <DialogTrigger asChild>
    <Button className='bg-black text-white hover:bg-grey-800'>
            <Plus/> Add New Question
    </Button>
    </DialogTrigger>
    <DialogContent className="w-full !max-w-[70vw] flex flex-col justify-start items-start mt-10 ">
      
      <h1 className='text-2xl font-bold'>Add New Question</h1>
        <div className="h-full w-full flex ">
          <div className="h-full w-1/2  p-4 flex flex-col gap-6">
            <MainInput title='Question' placeholder='Type your question here'/>
            <MainInput title='Explanation' placeholder='Type your explanation here'/>
            <UploadInput title='Image' placeholder="Upload Image"/>
            <UploadInput title="Option A" placeholder="Upload Image"/>
            <UploadInput title="Option B" placeholder="Upload Image"/>
            <UploadInput title="Option C" placeholder="Upload Image"/>
            <UploadInput title="Option D" placeholder="Upload Image"/>
            <SelectInput title="Correct Option" sampleSelectLabel="A"/>
          </div>
          
          <div className="h-full w-1/2  p-4 flex flex-col gap-6">
            <SelectInput title="Year" sampleSelectLabel="Select the year"/>
            <SelectInput title="Batch" sampleSelectLabel="Select the Batch"/>
            <SelectInput title="Shift" sampleSelectLabel="Select the Shift"/>
            <SelectInput title="Difficulty" sampleSelectLabel="Select the Difficulty"/>
            <MainInput title='Explanation' placeholder='Write the explanation'/>
            <MainInput title='Tags' placeholder='Write tags'/>
          </div>
        </div>
      
    </DialogContent>
  </Dialog>
)
}

export default AddQuestion