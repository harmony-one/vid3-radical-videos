import video1 from '../../assets/test-videos/h.mov';
import video2 from '../../assets/test-videos/h2.mov'
import video3 from '../../assets/test-videos/Harmony launches on Binance.mov'
import video4 from '../../assets/test-videos/Harmony launches.mov'

export type VideoType = {
  url : string;
  vanityUrl : string;
  merchandiseId : string | undefined
}

export const TEST_VIDEOS = [
  {
    url: video1,
    vanityUrl: '1',
    merchandiseId: undefined,
  },
  
]

export const getOwnerVideos = (name: string) => {
  return TEST_VIDEOS
}

export const getVideo = (vanityUrl: string) => {
  return TEST_VIDEOS.find(v => v.vanityUrl === vanityUrl)
}
