import { useState, ChangeEvent } from 'react';

const DropdownMenuIssues = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Issue:</label>
      <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
        <option value="">-- Select --</option>
        <option value="Web Issue">Web Issue</option>
        <option value="Hardware Issue">Hardware Issue</option>
        <option value="Software Issue">Software Issue</option>
        <option value="Equipment Request">Equipment Request</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </select>
      {/* <p>Selected: {selectedOption}</p> */}
    </div>
  );
};

export default DropdownMenuIssues;