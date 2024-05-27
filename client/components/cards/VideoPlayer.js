import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  //video path
  let videosrc = "https://techshila.s3.eu-west-1.amazonaws.com/6644a83327283f5fdccd9e74/l7f7rge69ZvONX3scskPq.mp4";

  return (
    <div>
      <h1>my doctor player</h1>
      <ReactPlayer
        width="500px"
        height="400px"
        url={videosrc}
        controls={true}
        // light is usefull incase of dark mode
        light={false}
        // picture in picture
        pip={true}
      />
      <source src={videosrc} type="video/mp4" />
    </div>
  );
};

export default VideoPlayer;