import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Alert } from "../../util/Alert";

const Register = () => {
  const { signup } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="login__layout">
      {error && <Alert message={error} />}

      <form onSubmit={handleSubmit} className="login__main-container">
        <h2>Registrate</h2>
        <div className="login__email-block">
          <label htmlFor="email" className="login__label-email">
            Correo
          </label>
          <input
            type="email"
            name="email"
            id="email"
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
            className="login__input-password"
            placeholder="*************"
          />
        </div>

        <div className="register__second-container">
          <button className="login__sign-in-button" type="submit">
            Registrar
          </button>
        </div>
        <p className="login__register-text">
          ¿Ya tienes cuenta?
          <Link to="/login" className="text-blue-700 hover:text-blue-900">
            Iniciar
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
