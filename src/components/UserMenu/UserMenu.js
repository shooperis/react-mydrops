import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './UserMenu.scss';

const UserMenu = ({expanded}) => {
  const [menuToggler, setMenuToggler] = useState(false);

  const onClickMenuToggler = (status) => {
    if (status) {
      setMenuToggler(false);
    } else {
      setMenuToggler(prevState => !prevState);
    }
  }

  return (
    <div className={`user-menu ${menuToggler ? 'active' : ''}`}>
      <div className="wrapper">
        <div className="menu">
          {expanded && (
            <div className="menu-item">
              <NavLink className="menu-link" to="/admin/users" onClick={() => {onClickMenuToggler(true)}}>Admin</NavLink>
            </div>
          )}
          <div className="menu-item">
            <NavLink className="menu-link" to="/logout" onClick={() => {onClickMenuToggler(true)}}>Logout</NavLink>
          </div>
        </div>
      </div>

      <button className={`user-menu-toggle-button ${menuToggler ? 'active' : ''}`} onClick={() => {onClickMenuToggler()}}>Navigation</button>
    </div>
  )
}

export default UserMenu