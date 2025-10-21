const Graphics = ({ city }) => {
  const bg =
    city.id === "amsterdam"
      ? "linear-gradient(180deg,#030124 0%,#00092b 10%,#001f4f 25%,#023365 40%)"
      : city.id === "berlin"
      ? "linear-gradient(180deg,#0b132b 0%,#1c2541 100%)"
      : "linear-gradient(180deg,#1b1740 0%,#2b0a3d 100%)";

  return (
    <div id="weather-graphics" style={{ background: bg }}>
      <img className="cityscape" src={`img/${city.id}-01.png`} alt={city.name} />
    </div>
  );
};
window.Graphics = Graphics;