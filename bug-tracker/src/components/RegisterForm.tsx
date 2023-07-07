import { useState } from "react";
import UserType from "../types/auth";
import userAPI from "../lib/userAPI";
import "../index.css";

type Props = {};
export default function RegisterForm({}: Props) {
  const [formData, setFormData] = useState<UserType | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: UserType | null) => ({
      ...(prevState as UserType),
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    formData!.user_type = "customer";
    const { error } = await userAPI.register(formData!);
    setMessage(error || "Successfully Registered as Customer");
  };

  const handleRegisterAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    formData!.user_type = "agent";
    const { error } = await userAPI.register(formData!);
    setMessage(error || "Successfully Registered as Agent");
  };

  return (
    <div id="register-form">
      <h3>Register User</h3>
      <form>
        <label htmlFor="first_name">First Name: </label>
        <input
          type="text"
          id="first-name"
          name="first_name"
          onChange={handleInputChange}
          placeholder="John"
        />
        <br />
        <label htmlFor="last_name">Last Name: </label>
        <input
          type="text"
          id="last-name"
          name="last_name"
          onChange={handleInputChange}
          placeholder="Doe"
        />
        <br />
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          onChange={handleInputChange}
          placeholder="john.doe123"
        />
        <br />
        <label htmlFor="phone_number">Phone Number: </label>
        <input
          type="tel"
          name="phone_number"
          id="phone-number"
          onChange={handleInputChange}
          placeholder="555-555-5555"
        />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
          placeholder="john.doe@company.org"
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          onChange={handleInputChange}
          placeholder="password"
        />
        <br />
        <label htmlFor="company_id">Company ID: </label>
        <input
          type="text"
          name="company_id"
          onChange={handleInputChange}
          placeholder="ex: 1234"
        />
        <br />
        <label htmlFor="user_type">User Type:</label>
        <br />
        <input
          type="text"
          name="user_type"
          onChange={handleInputChange}
          placeholder="Agent or Customer"
        />
        <br />
        <button type="submit" onClick={handleRegisterCustomer}>
          Register Customer
        </button>
        <button type="submit" onClick={handleRegisterAgent}>
          Register Agent
        </button>
        {message}
      </form>
    </div>
  );
}
