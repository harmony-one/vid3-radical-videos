import { VideoType } from "../../util/api/video-api";
import VideoThumbnail from "../video-thumbnail/VideoThumbnail";
import "./VideoGallery.styles.scss";

type VideoGalleryProps = {
  videos: VideoType[]
}
const VideoGallery = ({ videos } : VideoGalleryProps) => {
  return (
    <div className="video-gallery">
      {videos.length > 1 &&
        videos.map((video, index) => (
          <VideoThumbnail video={video} key={index} />
        ))}
    </div>
  );
};

export default VideoGallery;
