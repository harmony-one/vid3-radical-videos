import React, { useState, RefObject, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useInView } from 'react-intersection-observer';

import { VideoType } from '../../api/video-api'
import { BsVolumeMuteFill, BsVolumeDownFill } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'
import ApplePayLogo from '../../assets/images/logos/Apple Pay Logo White 2.png'

import './video-player.scss'

type VideoPlayerProps = {
  video : VideoType
}

const VideoPlayer = ({ video } : VideoPlayerProps) => {
  const [muted, setMuted] = useState(true)
  const [isPlayed, setIsPlayed] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { ref, inView } = useInView({
    /* Optional options */
    rootMargin : "0px",
    root: null,
    threshold: 0.1,
  });

  const navigate = useNavigate()
  const muteVideo = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setMuted(current => !current)
  }

  const close = () => {
    navigate(-1); // history.goBack()
  }

  const pauseVideo = (e: any) => {
    const video = videoRef.current
    if (isPlayed && video)  {
      video.pause()
      setIsPlayed(false)
    } else {
      video && video.play()
      setIsPlayed(true)
    }
  }

  const purchaseButton = (e: any) => {
    console.log(e);
  }
  // useEffect(() => {
  //   if (!isVisible && muted) {
  //     // const v = videoRef.current
  //     console.log(video.url, isVisible)
  //     setMuted(current => !current)
  //     setIsPlayed(false)
  //   } 
  //   // else {
  //   //   v && v.play()
  //   //   setIsPlayed(true)
  //   //   setMuted(current => !current)
  //   // }

  // }, [isVisible])

  useEffect(() => {
    if (!inView) {
      setMuted(true)
    }
  }, [inView])
  
  // const onLoadedVideo = () => {
  //   setIsVideoLoaded(true);
  // };

  // to allow autoplay with video unmuted
  // const videoLoaded = (e: any) => {
  //   const video = videoRef.current;
  //   video?.requestFullscreen();

  //   // if (video) {
  //   //   video.play()
  //   //   setIsPlayed(true)
  //   // }
  // }
 
  return (
    <div className='video-player' ref={ref}>
      <video
        ref={videoRef}
        src={video.url}
        playsInline
        autoPlay
        preload={inView ? 'auto' : 'none'}
        loop
        muted={muted}
        // muted={isVisible && muted}
        // hidden={!isVideoLoaded}
        // onLoad={() => console.log('load', video.url)}
        // onLoadedData={() => console.log('loaded', video.url)}
        // on
      />
      <div className='videoPlayer-content' onClick={pauseVideo}>
        <div className='videoPlayer-top'>
          <div className='videoPlayer-top-close' onClick={close}>
            <AiFillCloseCircle />
          </div>
          { video.merchandiseId && (
            <div className='videoPlayer-pay-icon' onClick={purchaseButton}>
            <img src={ApplePayLogo} alt='Apple Pay' />
          </div>
          )}
        </div>
        <div className='videoPlayer-bottom'>
          <div className='videoPlayer-mute-icon' onClick={muteVideo}>
            {muted ? <BsVolumeMuteFill /> : <BsVolumeDownFill />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
