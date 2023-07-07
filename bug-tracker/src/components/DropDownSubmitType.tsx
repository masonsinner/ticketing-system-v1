import { useState, ChangeEvent } from 'react';

const DropdownMenuSource = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Source Submitted: </label>
      <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
        <option value="">-- Select --</option>
        <option value="Phone">Phone</option>
        <option value="Email">Email</option>
        <option value="Chat">Chat</option>
        <option value="Walk-in">Walk-in</option>
        <option value="User Submitted">User Submitted</option>
      </select>
      {/* <p>Selected: {selectedOption}</p> */}
    </div>
  );
};

export default DropdownMenuSource;