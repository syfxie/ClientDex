import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <div>
        <h1 id="title">Rolodex</h1>
        <ul>
          <li>
            <Link to="/add-contact">Add Contact</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;