import { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserMenu.scss';

const UserMenu = () => {
  const [menuToggler, setMenuToggler] = useState(false);

  const onClickMenuToggler = () => {
    setMenuToggler(prevState => !prevState);
  }

  return (
    <div className={`user-menu ${menuToggler ? 'active' : ''}`}>
      <div className="wrapper">
        <div className="menu">
          <div className="menu-item">
            <Link className="menu-link" to="/logout" onClick={onClickMenuToggler}>Logout</Link>
          </div>
        </div>
      </div>

      <button className={`user-menu-toggle-button ${menuToggler ? 'active' : ''}`} onClick={onClickMenuToggler}>Navigation</button>
    </div>
  )
}

export default UserMenu