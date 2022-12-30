import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router'
import VideoImageThumbnail from 'react-video-thumbnail-image';
import { getOwnerVideos, VideoType } from '../../api/video-api';

import './video-home.scss';

const VideoHome = () => {
  const [videos, setVideos] = useState<VideoType[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const videos = getOwnerVideos('test');
    setVideos(videos)
  }, [])

  const watchVideo = (vanityUrl: string) => {
    navigate(`/${vanityUrl}`)
  }
  
  return (
    <div className='video-home'>
      <h1>My Videos</h1>
      <div className='video-grid'>
        {videos.length > 1 && videos.map((video, index) =>
          <div onClick={(e) => {
            e.stopPropagation();
            watchVideo(video.vanityUrl)
          }}
            // dangerouslySetInnerHTML={{
            //   __html: `<video 
            //     key=${index} 
            //     playsInline 
            //     muted 
            //     autoPlay 
            //     loop
            //     type='video/mp4'
            //     src="${video.url}"
            // </video>`
            // }}  
          ><h1>{index}</h1></div>
        )}
      </div>
    </div>
  )
}

export default VideoHome;

// onClick={() => watchVideo(video.vanityUrl)}