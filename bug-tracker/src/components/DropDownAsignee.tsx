import React, { ChangeEvent } from "react";

interface DropdownMenuAsigneeProps {
  users: number[];
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const DropdownMenuAsignee: React.FC<DropdownMenuAsigneeProps> = ({ users, handleSelectChange }) => {
  return (
    <div>
      <label htmlFor="dropdown">Assignee:</label>
      <select id="dropdown" onChange={handleSelectChange}>
        <option value="">-- Select --</option>
        {users.map((userId) => (
          <option key={userId} value={userId}>
            {userId}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenuAsignee;
