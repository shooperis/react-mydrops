import './AdminLayout.scss';
import { Outlet, Link, NavLink } from "react-router-dom";
import Logo from '../Logo/Logo';

const AdminLayout = () => {
  return (
    <div className="container admin-page">
      <header className="header">
        <Logo />

        <Link className="back-button" to="/">Exit from admin panel</Link>
      </header>

      <nav className='admin-nav'>
        <ul>
          <li>
            <NavLink to="users">Users</NavLink>
          </li>
          <li>
            <NavLink to="posts">Posts</NavLink>
          </li>
          <li>
            <NavLink to="comments">Comments</NavLink>
          </li>
        </ul>
      </nav>

      <div className="content">
        <Outlet />
      </div>
    </div>
  )
};

export default AdminLayout;