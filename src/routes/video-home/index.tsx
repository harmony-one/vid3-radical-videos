import React, { useEffect, useState } from "react";
import DomainRecord from "../../components/domain-record";
import Navbar from "../../components/navbar";
import VideoThumbnail from "../../components/video-thumbnail";
import { getOwnerVideos, VideoType } from "../../util/api/video-api";

import "./video-home.scss";

const VideoHome = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);

  useEffect(() => {
    const videos = getOwnerVideos("test");
    setVideos(videos);
  }, []);

  return (
    <>
      <div className="video-home">
        <div className="video-grid">
          {videos.length > 1 &&
            videos.map((video, index) => (
              <VideoThumbnail video={video} key={index}/>
            ))}
        </div>
      </div>
    </>
  );
};

export default VideoHome;

