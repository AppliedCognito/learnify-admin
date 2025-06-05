import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useUpdatePaper } from '@/hooks/paperHook';

const RenameModule = ({ open, setOpen, paper }) => {
  const [name, setName] = useState(paper.name);
  const { mutate: updatePaper, isLoading } = useUpdatePaper();

  const handleRename = () => {
    if (name.trim()) {
      updatePaper(
        { id: paper._id, updatedData: { name } },
        {
          onSuccess: () => {
            setOpen(false);
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename module</DialogTitle>
        </DialogHeader>
        <div className="h-auto w-auto">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="h-auto w-full flex justify-end gap-3 items-end">
          <Button className="bg-transparent text-purple-700 hover:bg-white" onClick={() => setOpen(false)}>Cancel</Button>
          <Button className="bg-purple-700 text-white hover:bg-purple-800" onClick={handleRename} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModule;
