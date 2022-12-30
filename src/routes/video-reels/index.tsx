import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom'

import VideoPlayer from '../../components/video-player';
import useScreenOrientation from "../../hooks/screen-orientation";
import { getOwnerVideos, VideoType } from '../../api/video-api'

import './video-reels.scss';
import 'swiper/css';

const VideoReels = () => {
  const [videos, setVideos] = useState<VideoType[]>([])
  const [orientation, isLandscape] = useScreenOrientation();
  const { vanityUrl } = useParams()

  useEffect(() => {
    let videoList = getOwnerVideos('test');
    const index = videoList.findIndex(v => v.vanityUrl === vanityUrl);
    videoList.unshift(videoList.splice(index, 1)[0])
    setVideos(videoList)
    console.log(videoList[0])
  }, [])
  console.log(orientation)
  return (
    <div className='video-reels'>
      <Swiper 
        slidesPerView={1}
        // direction={!isLandscape ? 'vertical' : 'horizontal'} 
        direction={'horizontal'} 
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {videos.map((video: any, index: React.Key | null | undefined) => (
          <SwiperSlide key={index}>
            <VideoPlayer video={video} />
          </SwiperSlide>
      ))}
    </Swiper>
    </div>
  )
}

export default VideoReels