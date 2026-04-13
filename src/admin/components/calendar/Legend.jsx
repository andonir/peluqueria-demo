const Legend = () => {
  return (
    <div className="legend">
      <div className="legend-content">
        <div className="legend-elem">
          <span className="green"></span>
          <p>Libre</p>
        </div>
        <div className="legend-elem">
          <span className="orange"></span>
          <p>Medio lleno</p>
        </div>
        <div className="legend-elem">
          <span className="red"></span>
          <p>Lleno</p>
        </div>
      </div>
    </div>
  );
};

export default Legend;
