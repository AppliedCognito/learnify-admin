import React, { useState } from 'react'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import FolderComponent from './FolderComponent'
import DeleteModule from '../DeleteModule'
import RenameModule from '../RenameModule'
import { FolderPen, Trash } from 'lucide-react'



const FinalFolderComponent = ({ paper, onClick, type = "paper", parentId }) => {
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div onClick={onClick}>
            <FolderComponent paperName={paper.name} />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem className="flex gap-2" onClick={() => setRenameOpen(true)}>
            <FolderPen size={12} />
            Rename
          </ContextMenuItem>
          <ContextMenuItem className="flex gap-2" onClick={() => setDeleteOpen(true)}>
            <Trash size={12} />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <RenameModule
        open={renameOpen}
        setOpen={setRenameOpen}
        paper={paper}
        type={type}
        parentId={parentId}
      />
      <DeleteModule
        open={deleteOpen}
        setOpen={setDeleteOpen}
        paper={paper}
        type={type}
      />
    </>
  )
}
export default FinalFolderComponent;