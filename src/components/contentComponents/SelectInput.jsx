import React from 'react'
import SelectBtn from './SelectBtn'

const SelectInput = ({title,sampleSelectLabel}) => {
  return (
    <div className="flex flex-col gap-2">
        <p>{title}</p>
        <SelectBtn sampleSelectLabel={sampleSelectLabel}/>
    </div>
  )
}

export default SelectInput