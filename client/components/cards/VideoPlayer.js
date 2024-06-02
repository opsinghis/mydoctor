import React, { useState } from 'react';

const VideoPlayer  = ({
  videoUrl,
  width,
  height,
  markCompleted,
}) => {

    const [ok, setOk] = useState(false);

    //videoUrl = "https://techshila.s3.eu-west-1.amazonaws.com/6644a83327283f5fdccd9e74/l7f7rge69ZvONX3scskPq.mp4";

    console.log("measurement :props", width, height);

    return (
      <div>
       <video width={width} height={height} controls autoPlay onEnded={markCompleted}> 
           <source src={videoUrl} type="video/mp4"/>
       </video>

      </div>
    );
};

export default VideoPlayer;
