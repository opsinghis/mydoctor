import React, { useRef } from 'react';

const VideoPlayer = ({ videoUrl }) => {
    const videoRef = useRef(null);
    videoUrl = "https://techshila.s3.eu-west-1.amazonaws.com/6644a83327283f5fdccd9e74/l7f7rge69ZvONX3scskPq.mp4";

    const playVideo = () => {
        videoRef.current.play();
    };

    const pauseVideo = () => {
        videoRef.current.pause();
    };

    return (
      <div>
       <video width="410" height="240" controls autoPlay> 
           <source src={videoUrl} type="video/mp4"/>
       </video>

      </div>
    );
};

export default VideoPlayer;

