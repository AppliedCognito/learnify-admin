// FinalFolderComponent.jsx
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

const FinalFolderComponent = ({paperName}) => {
  const [renameOpen, setRenameOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <FolderComponent paperName={paperName}/>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem className='flex gap-2' onClick={() => setRenameOpen(true)}>
            <FolderPen size={12} />
            Rename
          </ContextMenuItem>
          <ContextMenuItem className='flex gap-2' onClick={() => setDeleteOpen(true)}>
            <Trash size={12}/>
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <RenameModule open={renameOpen} setOpen={setRenameOpen} />
      <DeleteModule open={deleteOpen} setOpen={setDeleteOpen} />
    </>
  )
}

export default FinalFolderComponent
