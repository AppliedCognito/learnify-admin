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
import { useAddSubject } from "@/hooks/subjectHook";
import { useAddModule } from "@/hooks/moduleHook";
import { useAddSubModule } from "@/hooks/subModuleHook";

const AddNewModule = ({ selectedPaper, selectedSubject, selectedModule }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate: addPaper, isLoading: loadingPaper } = useAddPaper();
  const { mutate: addSubject, isLoading: loadingSubject } = useAddSubject();
  const { mutate: addModule, isLoading: loadingModule } = useAddModule();
  const { mutate: addSubModule, isLoading: loadingSubModule } = useAddSubModule();

  const resetForm = () => {
    setName("");
    setOpen(false);
  };

  const handleCreate = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    if (!selectedPaper) {
      addPaper({ name: trimmedName }, { onSuccess: resetForm });
    } else if (!selectedSubject) {
      addSubject({ name: trimmedName, paper_id: selectedPaper._id }, { onSuccess: resetForm });
    } else if (!selectedModule) {
      addModule({ name: trimmedName, subject_id: selectedSubject._id }, { onSuccess: resetForm });
    } else {
      addSubModule({ name: trimmedName, module_id: selectedModule._id }, { onSuccess: resetForm });
    }
  };

  const getTitle = () => {
    if (!selectedPaper) return "Add New Paper";
    if (!selectedSubject) return "Add New Subject";
    if (!selectedModule) return "Add New Module";
    return "Add New Submodule";
  };

  const isLoading = loadingPaper || loadingSubject || loadingModule || loadingSubModule;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <AddFolderComponent />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="w-full"
          />
          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              className="text-purple-700"
              onClick={() => setOpen(false)}
              disabled={isLoading}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewModule;
