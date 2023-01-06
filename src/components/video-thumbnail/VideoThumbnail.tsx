import { useNavigate } from "react-router";
import { VideoType } from "../../util/api/video-api";

type VideoThumbnailProps = {
  video : VideoType
}

const VideoThumbnail = ({ video } : VideoThumbnailProps) => {
  const navigate = useNavigate();
  
  const watchVideo = (vanityUrl: string) => {
    navigate(`${vanityUrl}`);
  };

  return (
    <div>
       <video
        playsInline
        muted
        autoPlay
        loop
        onClick={() => watchVideo(video.vanityUrl)}
      >
        <source type="video/mp4" src={video.url} />
      </video>
    </div>
  )
}

export default VideoThumbnail;