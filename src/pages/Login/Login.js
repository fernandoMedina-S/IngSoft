import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Alert } from "../../util/Alert";
import { ToastContainer, toast } from "react-toastify";

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
      navigate("/profile");
    } catch (error) {
      toast.error("Error: cuenta no válida", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/profile");
    } catch (error) {
      toast.error("Cuenta de Google no válida", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email)
      return toast.error("Error: Ingresa un correo válido", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    try {
      await resetPassword(user.email);
      toast.success("Se mandó un correo a la dirección solicitada", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error("Error: Ingresa un correo válido", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="login__layout">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
        <button onClick={handleGoogleSignin} className="login__google-button">
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
