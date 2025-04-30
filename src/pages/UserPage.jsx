import BuildingCard from '@/components/BuildingCard'
import { Button } from '@/components/ui/button'
import { UserTableDemo } from '@/components/UserTableDemo'
import { Plus, ScanText } from 'lucide-react'
import React from 'react'

const UserPage = () => {
  return (
    <div className='min-h-full w-full lg:p-10 p-5 flex flex-col gap-10'>
      <div className="h-auto w-full flex justify-end items-end gap-2">
        <Button>
          <Plus color='white' /> Create
        </Button>
        <Button className='bg-[#F5F5F5] text-black hover:bg-white'>
          <ScanText/> Import
        </Button>
      </div>

      <UserTableDemo/>
      
    </div>
  )
}

export default UserPage