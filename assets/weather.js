const { useEffect, useRef } = React;

const Weather = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const settingsRef = useRef({
    colors: ["#bd57d175", "#0a6dd175", "#30e0f975"],
    width: 2,
    height: window.innerHeight / 10,
    rotation: "16deg",
    spacing: 5,
    speedMax: 5,
    dx: 0
  });

  const linesRef = useRef([]);
  const countRef = useRef(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const ctx = c.getContext("2d", { alpha: true });

    const drawRoundedRect = (ctx, x, y, w, h, r, color) => {
      const rr = Math.min(r, w * 0.5, h * 0.5);
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.lineTo(x + w - rr, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
      ctx.lineTo(x + w, y + h - rr);
      ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
      ctx.lineTo(x + rr, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
      ctx.lineTo(x, y + rr);
      ctx.quadraticCurveTo(x, y, x + rr, y);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const sizeToParent = () => {
      const parent = c.parentElement || document.body;
      c.width = parent.clientWidth || window.innerWidth;
      c.height = parent.clientHeight || window.innerHeight;
    };

    const initLines = () => {
      const S = settingsRef.current;
      linesRef.current = [];
      const n = Math.ceil(c.width / S.spacing);
      countRef.current = n;
      let x = 0;
      for (let i = 0; i < n; i++) {
        x += S.spacing;
        linesRef.current.push({
          x,
          y: Math.random() * c.height,
          w: S.width,
          h: Math.max(2, Math.random() * S.height),
          vy: Math.random() * S.speedMax + 1,
          vx: S.dx,
          color: S.colors[Math.floor(Math.random() * S.colors.length)],
        });
      }
    };

    const draw = () => {
      const S = settingsRef.current;
      ctx.clearRect(0, 0, c.width, c.height);
      const lines = linesRef.current;

      for (let i = 0; i < lines.length; i++) {
        const L = lines[i];
        drawRoundedRect(ctx, L.x, L.y, S.width, L.h, S.width / 2, L.color);

        L.y += L.vy;
        L.x += L.vx;

        if (L.y > c.height) L.y = -L.h;
        if (L.x > c.width) L.x = 0;
        if (L.x < 0) L.x = c.width;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    sizeToParent();
    c.style.position = "absolute";
    c.style.top = "50%";
    c.style.left = "50%";
    c.style.transformOrigin = "center center";
    c.style.pointerEvents = "none";
    c.style.backgroundColor = "transparent";
    c.style.transform = `translate(-50%, -50%) rotate(${settingsRef.current.rotation})`;

    initLines();
    draw();

    window.updateWeather = (opts = {}) => {
      settingsRef.current = { ...settingsRef.current, ...opts };
      if (opts.rotation) {
        c.style.transform = `translate(-50%, -50%) rotate(${settingsRef.current.rotation})`;
      }
      initLines();
    };

    const onResize = () => {
      sizeToParent();
      initLines();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas id="weather" ref={canvasRef} />;
};

window.Weather = Weather;