import { useEffect, useRef } from 'react';
import { useSpring, animated, to } from '@react-spring/web';
import { BASE_URL } from './constants/constants';
import Lottie from 'lottie-react';

const MouseFollower = () => {
  const animationRef = useRef(null);

  const [spring, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 1, tension: 170, friction: 26 }
  }));

  useEffect(() => {
    const handleMouseMove = (e) => {
      api.start({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [api]);

  return (
    <animated.div
      style={{
        transform: to(
          [spring.x, spring.y],
          (x, y) => `translate(${x}px, ${y}px) translate(-15%, -15%)`
        )
      }}
      className="fixed top-0 left-0 pointer-events-none z-[99999] w-[150px] h-[150px] mix-blend-difference"
    >
      <Lottie
        lottieRef={animationRef}
        path={`${BASE_URL}/animations/cursor.json`}
        loop
        autoplay
        style={{ width: '100%', height: '100%' }}
      />
    </animated.div>
  );
};

export default MouseFollower;
