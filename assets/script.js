const { useEffect, useState } = React;
const { createRoot } = ReactDOM;

function App() {
  const [data, setData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("./assets/weather.json")
      .then(r => r.json())
      .then(setData)
      .catch(err => console.error("Failed to load weather.json", err));
  }, []);

  if (!data) return <div style={{color:'#fff'}}>Loading…</div>;

  const city = data.cities[currentIndex];

  return (
    <>
      <div className="container">
        <div id="weather-widget">
          <Graphics city={city} />
          <TopRow city={city} />
          <BottomRow city={city} />
          <Weather city={city} />
        </div>

        <Controls
          cities={data.cities}
          currentIndex={currentIndex}
          onSelect={setCurrentIndex}
        />
      </div>
      <Main />
    </>
  );
}

const root = createRoot(document.getElementById("app-root"));
root.render(<App />);
