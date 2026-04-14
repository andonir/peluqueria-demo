import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-container">
        <div className="hero-text">
          <h1>PELUQUERÍA</h1>
          <h2>Cortes de pelo - barba - peinado</h2>
        </div>
                <a href="#/client/appointment" className={"hero-a"}target="_blank" rel="noopener noreferrer">Pedir cita</a>
      </div>
    </div>
  );
};

export default Hero;
