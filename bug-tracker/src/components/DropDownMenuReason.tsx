import { useState, ChangeEvent } from 'react';

const DropdownMenuReason = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Status Reason: </label>
      <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
        <option value="">-- Select --</option>
        <option value="Web Issue">Need More Information</option>
        <option value="Hardware Issue">Reached out to User</option>
        <option value="Software Issue">Appoitment Setup</option>
        <option value="Miscellaneous">No Further Action Required</option>
      </select>
      {/* <p>Selected: {selectedOption}</p> */}
    </div>
  );
};

export default DropdownMenuReason;