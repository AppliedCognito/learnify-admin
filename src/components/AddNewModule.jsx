import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddFolderComponent from "./contentComponents/AddFolderComponent";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAddPaper } from "@/hooks/paperHook";

const AddNewModule = () => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const { mutate: addPaper, isLoading } = useAddPaper();

  const handleCreate = () => {
    if (name.trim()) {
      addPaper(
        { name },
        {
          onSuccess: () => {
            setName("");
            setOpen(false);
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger><AddFolderComponent /></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new module</DialogTitle>
        </DialogHeader>
        <div className="h-auto w-auto">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter paper name"
          />
        </div>
        <div className="h-auto w-full flex justify-end gap-3 items-end">
          <Button
            className="bg-transparent text-purple-700 hover:bg-white"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-purple-700 text-white hover:bg-purple-800"
            onClick={handleCreate}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewModule;
