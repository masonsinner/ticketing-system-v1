import { useState, ChangeEvent } from 'react';

const DropdownMenuLevel = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Impact Level:</label>
      <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
        <option value="">-- Select --</option>
        <option value="Minor">Minor/Barely Affects Work</option>
        <option value="Signifigant">Signifigant/Affects Most Tasks</option>
        <option value="Major">Major/Work Stoppage</option>
      </select>
      {/* <p>Selected: {selectedOption}</p> */}
    </div>
  );
};

export default DropdownMenuLevel;