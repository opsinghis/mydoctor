import React, { useRef } from 'react';

const VideoPlayer = ({ videoUrl }) => {
    const videoRef = useRef(null);

    const playVideo = () => {
        videoRef.current.play();
    };

    const pauseVideo = () => {
        videoRef.current.pause();
    };

    return (
        <div>
            <video ref={videoRef} src="https://techshila.s3.eu-west-1.amazonaws.com/6644a83327283f5fdccd9e74/3yKaqNVk_6OL4fKowGJ3I.mp4" controls />
            <button onClick={playVideo}>Play</button>
            <button onClick={pauseVideo}>Pause</button>
        </div>
    );
};

export default VideoPlayer;