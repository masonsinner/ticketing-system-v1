import { useState } from "react";
import CompanyType from "../types/companyAuth";
import companyAPI from "../lib/companyAPI";
import "../index.css";

type Props = {};

export default function RegisterCompany({}: Props) {
  const [formData, setFormData] = useState<CompanyType | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: CompanyType | null) => ({
      ...(prevState as CompanyType),
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error, data } = await companyAPI.createCompany(formData!);
    if (error) {
      setMessage("Registration failed");
    } else {
      setMessage(`Successfully registered. Company ID: ${data.id}`);
    }
  };

  return (
    <div id="register-form">
      <h3>Register Company</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="company_name">Company Name: </label>
        <input
          type="text"
          id="company-name"
          name="name"
          onChange={handleInputChange}
          placeholder="Solutions LLC"
        />
        <br />
        <button type="submit">Register</button>
        <br />
        {message}
      </form>
    </div>
  );
}
