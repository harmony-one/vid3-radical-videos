import React, { useEffect, useState } from "react";
import VideoGallery from "../../components/video-gallery/VideoGallery";
import { getOwnerVideos, VideoType } from "../../util/api/video-api";

import "./VideoHome.styles.scss";

const VideoHome = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [featureVideo, setFeatureVideo] = useState<VideoType>();

  useEffect(() => {
    const videos = getOwnerVideos("test");
    setVideos(videos);
    setFeatureVideo(videos[0]);
  }, []);

  return (
    <>
      <div className="video-home">
        <VideoGallery videos={videos} />
      </div>
    </>
  );
};

export default VideoHome;