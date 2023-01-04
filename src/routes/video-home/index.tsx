import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import VideoThumbnail from "../../components/video-thumbnail";
import { getOwnerVideos, VideoType } from "../../util/api/video-api";

import "./video-home.scss";

const VideoHome = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [name, setName] = useState('');

  const tld = process.env.REACT_APP_TLD;

  useEffect(() => {
    const getSubdomain = () => {
      if (!window) {
        return null
      }
      console.log('getSubDomain()', window.location.host)
      const host = window.location.host
      const parts = host.split('.')
      console.log(host, parts, parts.length)
      if (parts.length <= 2) {
        return ''
      }
      if (parts.length <= 4) { // 3 CHANGE FOR PRODUCTION
        return parts[0]
      }
      return parts.slice(0, parts.length - 2).join('.')
    }
    const name = getSubdomain(); 
    setName(name ?  name : '')
    // const web3 = new Web3(config.defaultRPC)
    // const api = apis({ web3, address })
    // setClient(api)
    // // init()
  }, [])

  useEffect(() => {
    const videos = getOwnerVideos("test");
    setVideos(videos);
  }, []);

  return (
    <>
      <div className="video-home">
        <div className='title'>{`${name}${tld}`}</div>
        <div className="video-grid">
          {videos.length > 1 &&
            videos.map((video, index) => (
              <VideoThumbnail video={video} key={index}/>
            ))}
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default VideoHome;

