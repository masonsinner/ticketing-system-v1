import { Link } from "react-router-dom"

type Props = {}
export default function NavBar({}: Props) {
  return (
    <nav>
        <Link to="/home">Home</Link>&emsp;
        <Link to="/get-started">Register</Link>&emsp;
        <Link to="/get-started">Login</Link>&emsp;
        <Link to="/portal">Portal</Link>&emsp;
        <Link to="/knowlege-base">Knowlege Base</Link>&emsp;
        <Link to="/new-ticket">Create Ticket</Link>&emsp;
    </nav>
  )
}