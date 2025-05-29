import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectBtn = ({sampleSelectLabel}) => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={sampleSelectLabel} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{sampleSelectLabel}</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectBtn