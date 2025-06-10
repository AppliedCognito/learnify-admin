import React from 'react';
import SelectBtn from './SelectBtn';

const SelectInput = ({ title, sampleSelectLabel, options, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <p>{title}</p>
      <SelectBtn
        sampleSelectLabel={sampleSelectLabel}
        options={options}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectInput;
