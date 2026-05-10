// BackgroundAnimation.js
import { useEffect, useRef } from 'react';
import anime from 'animejs';

const BackgroundAnimation = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const createGrid = () => {
      const gridContainer = gridRef.current;
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const gridItem = document.createElement('div');
          gridItem.className = 'grid-item';
          gridItem.style.width = '116px';
          gridItem.style.height = '116px';
          gridItem.style.backgroundColor = '#020617';
          gridItem.style.margin = '';
          gridContainer.appendChild(gridItem);
        }
      }
    };

    createGrid();

    anime({
      targets: '.grid-item',
      loop: false,
      scale: [
        { value: .1, easing: 'easeOutSine', duration: 1200 },
        { value: 1, easing: 'easeInOutQuad', duration: 1200 }
      ],
      delay: anime.stagger(200, { grid: [14, 5], from: 'center' })
    });
  }, []);

  return <div ref={gridRef} className="grid-container h-screen overflow-hidden flex flex-wrap" />;
};

export default BackgroundAnimation;
