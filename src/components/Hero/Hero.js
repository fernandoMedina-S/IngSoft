import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="hero__main-container">
        <h1>Enterate de lo nuevo</h1>
        <h2>Descubre los nuevos eventos en CUCEI</h2>
        <Link to="/login">
          <button>Explorar</button>
        </Link>
      </div>
    </>
  );
};

export default Hero;
