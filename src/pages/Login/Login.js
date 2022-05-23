import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Alert } from "../../util/Alert";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/events");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/events");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Write an email to reset password");
    try {
      await resetPassword(user.email);
      setError("We sent you an email. Check your inbox");
    } catch (error) {
      setError(error.message);
    }
  };

  

  return (
    <div className="login__layout">
      {error && <Alert message={error} />}

      <form onSubmit={handleSubmit} className="login__main-container">
        <h2>Inicia Sesión</h2>
        <div className="login__email-block">
          <label htmlFor="email" className="login__label-email">
            Correo
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            className="login__input-email"
            placeholder="ejemplo@dominio.com"
          />
        </div>
        <div className="login__password-block">
          <label htmlFor="password" className="login__label-password">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            className="login__input-password"
            placeholder="*************"
          />
        </div>

        <div className="login__second-container">
          <button className="login__sign-in-button" type="submit">
            Iniciar
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#!"
            onClick={handleResetPassword}
          >
            ¿Olvidaste la contraseña?
          </a>
        </div>
        <button
          onClick={handleGoogleSignin}
          className="login__google-button"
        >
          Inicia con Google
        </button>
        <p className="login__register-text">
          ¿No tienes cuenta?
          <Link to="/register" className="text-blue-700 hover:text-blue-900">
            Registrate
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
