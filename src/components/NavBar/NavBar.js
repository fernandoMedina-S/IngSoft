import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const NavBar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <nav>
        <ul className="navbar__main-list">
          <Link to="/">
            <li className="navbar__logo">Sistema de gestion</li>
          </Link>
          <li className="navbar__item-container">
            {!user && (
              <Link to="/login">
                <a className="navbar__list-item">Login</a>
              </Link>
            )}
            {user && (
              <>
              <Link to="/events">
                <a className="navbar__list-item" >Eventos</a>
              </Link>
              <Link to="/create_event">
                <a className="navbar__list-item" >Crear evento</a>
              </Link>
              <Link to="/login">
                <a className="navbar__list-item" onClick={handleLogout}>Salir</a>
              </Link>
              </>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
