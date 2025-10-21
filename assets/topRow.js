const TopRow = ({ city }) => {
  if (!city) return null;
  return (
    <div id="top-row">
      <span className="weather-icon material-symbols-outlined">{city.icon}</span>
      <h1 className="weather-location">{city.name}</h1>
      <h3 className="weather-type">{city.type}</h3>
      <h2 className="weather-temp">{city.temp}°</h2>
    </div>
  );
};
window.TopRow = TopRow;