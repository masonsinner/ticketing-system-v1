import { useState, ChangeEvent } from 'react';

const DropdownMenuTeam = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Assigned Team:</label>
      <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
        <option value="">-- Select --</option>
        <option value="Web Support">Web Support</option>
        <option value="Hardware Support">Hardware Support</option>
        <option value="Software Support">Software Support</option>
        <option value="Mobile Support">Mobile Support</option>
      </select>
      {/* <p>Selected: {selectedOption}</p> */}
    </div>
  );
};

export default DropdownMenuTeam;