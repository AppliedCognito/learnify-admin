import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useDeletePaper } from '@/hooks/paperHook';

const DeleteModule = ({ open, setOpen, paper }) => {
  const { mutate: deletePaper, isLoading } = useDeletePaper();

  const handleDelete = () => {
    deletePaper(paper._id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete module</DialogTitle>
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
  );
};

export default DeleteModule;
