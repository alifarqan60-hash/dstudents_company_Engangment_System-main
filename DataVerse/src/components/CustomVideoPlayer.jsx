// CustomVideoPlayer.js
import React, { useRef } from 'react';
import ReactPlayer from 'react-player';

const CustomVideoPlayer = ({ videoSrc }) => {
  const playerRef = useRef(null);

  return (
    <div className="relative w-[768px] h-[450px] bg-black">
      <ReactPlayer
        ref={playerRef}
        url={videoSrc}
        controls={true} 
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default CustomVideoPlayer;
