"use client"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScanText } from "lucide-react"
import ImportIcon from '@/assets/image/importicon.png'

const ImportBtn = () => {
  const [highlight, setHighlight] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setHighlight(false)

    const file = e.dataTransfer.files[0]
    if (file && (file.name.endsWith(".csv") || file.name.endsWith(".xlsx"))) {
      setSelectedFile(file)
      console.log("Dropped file:", file)
    } else {
      alert("Please upload a valid CSV or XLSX file.")
    }
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setHighlight(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setHighlight(false)
  }, [])

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file && (file.name.endsWith(".csv") || file.name.endsWith(".xlsx"))) {
      setSelectedFile(file)
      console.log("Selected file:", file)
    } else {
      alert("Please upload a valid CSV or XLSX file.")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-[#F5F5F5] text-black hover:bg-white'>
          <ScanText className="mr-2" /> Import
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md h-[500px] bg-white flex flex-col justify-center items-center gap-4 p-6">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`w-full h-64 border-2 ${highlight ? 'border-blue-500' : 'border-gray-300'} border-dashed flex flex-col justify-center items-center rounded-lg transition`}
        >
          <img src={ImportIcon} alt="Import Icon" className='w-16 mb-4' />
          <h1 className='text-xl font-semibold text-gray-600'>Add CSV/XLSX File</h1>
          <p className='text-sm text-gray-400'>Drag & drop your file here or click below</p>
        </div>

        <input
          type="file"
          accept=".csv, .xlsx"
          id="file-upload"
          onChange={handleFileSelect}
          className="hidden"
        />
        <label htmlFor="file-upload">
          <Button variant="outline" className="mt-2">Browse File</Button>
        </label>

        {selectedFile && (
          <p className="text-sm text-green-600 mt-2">
            Selected: {selectedFile.name}
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ImportBtn
