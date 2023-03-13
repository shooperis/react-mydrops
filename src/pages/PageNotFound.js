import './PageNotFound.scss';
import Logo from '../components/Logo/Logo';
import { APP_SETTINGS } from './../utils/config';
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="container page-not-found-page">
      <header className="header">
        <Logo />

        <Link className="back-button" to="/">Back to MyDrops</Link>
      </header>

      <div className="content">
        <h1 className="title">Page not found</h1>

        <br />
        The requested URL was not found on this website
        <br /><br />
        Most likely causes:
        <br />
        <ul>
          <li>There might be a typing error in the address.</li>
          <li>If you clicked on a link, it may be out of date.</li>
        </ul>
        <br />
        What you can try:
        <br />
        <ul>
          <li>Retype the address.</li>
          <li>Go back to the previuos page.</li>
          <li>Go to <Link to={APP_SETTINGS.address}>{APP_SETTINGS.address}</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default PageNotFound