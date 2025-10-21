const { useEffect } = React;
const Main = () => {
  useEffect(() => {
    function weatherTransition() {
        const weatherTransition = gsap.timeline();
        weatherTransition
            .to('#weather-graphics', {
            background: 'linear-gradient(180deg, #030124 0%, #00092b 10%, #001f4f 25%, #023365 40%)',
            duration: 1,
            ease: 'circ.inOut'
            })
            .fromTo('.weather-icon', 
            {opacity: 0, scale: 2}, 
            {opacity: 1, scale: 1, duration: 2, ease: 'bounce.out'}, 
            '-=.5')
            .fromTo('.weather-location', 
            {opacity: 0, y: 25}, 
            {opacity: 1, y: 0, duration: 2, ease: 'expo.out'}, 
            '-=1'
            )
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
            {
                opacity: 1,
                duration: 2,
                ease: 'circ.in',
                stagger: 0.25
            },'-=1')
            .fromTo('#weather', 
            {opacity: 0},
            {duration: 3, opacity: 1, delay: 1, ease: 'expo.in'},
            0)
            .fromTo('.cityscape', 
                {opacity: 0, y: 100, scale: 3},
                {duration: 20, scale: 1, opacity: 1, y: 0, ease: 'expo.out'},
            0)
        weatherTransition.play();
        }
        weatherTransition();

  }, []);
  return null;
};
window.Main = Main;
