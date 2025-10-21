const { useEffect } = React;

const BottomRow = ({ city }) => {
  if (!city) return null;
  return (
    <div id="bottom-row">
      <p className="weather-humity">humidity {city.humidity}%</p>
      <p>|</p>
      <p className="weather-wind">wind {city.wind}</p>
      <p>|</p>
      <p className="weather-visability">visibility {city.visibility}</p>
    </div>
  );
};
window.BottomRow = BottomRow;

window.BottomRow = BottomRow;
