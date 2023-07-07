import { useState } from "react";
import "../index.css"
import UserType from "../types/auth"
import userAPI from "../lib/userAPI";

type Props = {
  setUser: (user: UserType) => void;
};

export default function LoginForm({ setUser }: Props) {
  const [formData, setFormData] = useState<UserType | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await userAPI.login(
      formData!.email,
      formData!.password
    );
    setMessage(error || "");
    if (data) {
      setUser(data);
      setMessage("Logged in Successfully");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: UserType | null) => ({
      ...(prevState as UserType),
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div id="login-form">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
          placeholder="email"
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
        <button type="submit">Login</button>
        <br />
        {message}
      </form>
    </div>
  );
}
