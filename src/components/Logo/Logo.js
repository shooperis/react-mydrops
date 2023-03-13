import './Logo.scss';
import { APP_SETTINGS } from './../../utils/config';
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link className="logo" to="/">
      <img src={APP_SETTINGS.logo} alt={APP_SETTINGS.name} />
    </Link>
  )
}

export default Logo