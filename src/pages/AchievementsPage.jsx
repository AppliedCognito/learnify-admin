import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';
import Rank from '@/assets/logo/Rank.svg';
import AchievCard from '@/components/AchievCard';

const AchievementsPage = () => {
  return (
    <div className='min-h-full w-full lg:p-10 p-5 flex flex-col gap-10'>
       <div className="h-auto w-full flex justify-end items-end">
            <Button>
                <Plus/> Create New Achievement
            </Button>
       </div>
        <div className="h-auto w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-4">
            {'abcdefgh'.split('').map((index) => (
                 <AchievCard
                 key={index}
                 AchievImage={Rank}
                 AchievTitle='Ranked 1st'
                 />
            ))}
        </div>
        
        
    </div>
  )
}

export default AchievementsPage