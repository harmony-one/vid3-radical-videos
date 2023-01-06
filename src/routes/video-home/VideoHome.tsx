import React, { useEffect, useState } from "react";
import VideoFeature from "../../components/video-feature/VideoFeature";
import VideoGallery from "../../components/video-gallery/VideoGallery";
import VideoThumbnail from "../../components/video-thumbnail/VideoThumbnail";
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
        {featureVideo && <>
          <h3>Feature video</h3>
          <VideoFeature feature={featureVideo} />
        </>}
        <h3>Video Gallery</h3>
        <VideoGallery videos={videos} />
        {/* <div className="video-grid">
          {videos.length > 1 &&
            videos.map((video, index) => (
              <VideoThumbnail video={video} key={index}/>
            ))}
        </div> */}
      </div>
    </>
  );
};

export default VideoHome;

