const { useEffect, useRef } = React;

const Controls = ({ cities = [], currentIndex = 0, onSelect }) => {
  const seqRef = useRef(0);

  useEffect(() => {
    cities.forEach((city) => {
      if (city?.id) {
        const img = new Image();
        img.src = `img/${city.id}-01.png`;
      }
    });
  }, [cities]);

  const preloadSrc = (src) =>
    new Promise((resolve) => {
      const tmp = new Image();
      tmp.onload = resolve;
      tmp.onerror = resolve;
      tmp.src = src;
      if (tmp.complete && tmp.naturalWidth > 0) resolve();
    });

  const runTransition = (nextIndex) => {
    if (!cities[nextIndex]) return;

    const runId = ++seqRef.current;

    if (window.__cityTL) {
      try { window.__cityTL.kill(); } catch (_) {}
    }
    gsap.killTweensOf([
      ".weather-location",
      ".weather-type",
      ".weather-temp",
      ".weather-icon",
      "#bottom-row p",
      "#weather",
      ".cityscape",
      "#weather-graphics",
    ]);

    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
    window.__cityTL = tl;

    // OUT
    tl.to("#bottom-row p", { opacity: 0, y: 10, duration: 0.35, stagger: -0.08, ease: "power2.in" }, 0)
      .to([".weather-temp", ".weather-type", ".weather-location"],
         { opacity: 0, y: -20, duration: 0.4, stagger: 0.05, ease: "power2.in" }, 0.05)
      .to(".weather-icon", { opacity: 0, scale: 0.7, duration: 0.35, ease: "back.in(1.3)" }, 0.05)
      .to("#weather", { opacity: 0, duration: 0.35, ease: "power2.in" }, 0.1)
      .to(".cityscape", { opacity: 0, scale: 10, y: 16, duration: 0.4, ease: "power3.inOut" }, 0.1)

      .add(() => {
        if (runId !== seqRef.current) return;
        if (typeof onSelect === "function") onSelect(nextIndex);
      })

      .add(() => {
        if (runId !== seqRef.current) return;
        const city = cities[nextIndex];
        if (!window.updateWeather) return;

        if (city.id === "amsterdam") {
          window.updateWeather({
            colors: ["#bd57d175", "#0a6dd175", "#30e0f975"],
            width: 2,
            height: innerHeight / 10,
            rotation: "16deg",
          });
        } else if (city.id === "berlin") {
          window.updateWeather({
            colors: ["#88cedd75", "#c4d1db75", "#ffffff75"],
            width: 6,
            height: 6,
            rotation: "-16deg",
          });
        } else if (city.id === "athens") {
          window.updateWeather({
            colors: ["#ff029675", "#7255a475", "#c4d1db75"],
            width: 4,
            height: 4,
            rotation: "-45deg",
          });
        }
      })

      .add(() => new Promise((r) => {
        if (runId !== seqRef.current) return;
        requestAnimationFrame(r);
      }))
      .add(async () => {
        if (runId !== seqRef.current) return;
        const city = cities[nextIndex];
        const newSrc = `img/${city.id}-01.png`;
        await preloadSrc(newSrc);
        if (runId !== seqRef.current) return;
        const imgEl = document.querySelector(".cityscape");
        if (imgEl) imgEl.src = newSrc; 
      })

      .add(() => {
        if (runId !== seqRef.current) return;
        const inTl = gsap.timeline();
        window.__cityTL = inTl;

        inTl
          .fromTo('.weather-icon', 
            {opacity: 0, scale: 2}, 
            {opacity: 1, scale: 1, duration: 2, ease: 'bounce.out'}, 
            '-=.5')
          .fromTo('.weather-location', 
            {opacity: 0, y: 25}, 
            {opacity: 1, y: 0, duration: 2, ease: 'expo.out'}, 
            '-=1')
          .fromTo('.weather-type', 
            {opacity: 0, y: 25}, 
            {opacity: 1, y: 0, duration: 2, ease: 'expo.out'}, 
            '-=1.5')
          .fromTo('.weather-temp', 
            {opacity: 0, y: 25}, 
            {opacity: 1, y: 0, duration: 2, ease: 'expo.out'}, 
            '-=1.5')
          .fromTo('#bottom-row p',
            {opacity: 0},
            {opacity: 1, duration: 2, ease: 'circ.in', stagger: 0.25},
            '-=1')
          .fromTo('#weather', 
            {opacity: 0},
            {duration: 3, opacity: 1, delay: 1, ease: 'expo.in'},
            0)
          .fromTo('.cityscape', 
            { y: 100, scale: 3},
            {duration: 20, scale: 1,  y: 0, ease: 'expo.out'},
            0)
            .fromTo('.cityscape', 
            {opacity: 0,},
            {duration: 18, opacity: 1, delay: 2, ease: 'expo.out'},
            0);
      });

    return tl;
  };


  if (!cities.length) return null;

  return (
    <div id="weather-controls">
      {cities.map((c, i) => (
        <button
          key={c.id || c.name || i}
          className={`weather-btn${i === currentIndex ? " active" : ""}`}
          onClick={() => runTransition(i)}
          title={c.name}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
};

window.Controls = Controls;