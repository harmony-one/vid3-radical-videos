import { useRef } from "react";

type VideoThumbnailProps = {
  url : string
}

const VideoThumbnail = ({ url } : VideoThumbnailProps) => {
  const videoRef = useRef(null);
  return (
    <div>
      {/* <video
        src={url}
        ref={player}
        paused={true}
        style={styles.backgroundVideo}
        onLoad={() => {
          player.current.seek(0); // this will set first frame of video as thumbnail
        }}
      /> */}
    </div>
  )
}

export default VideoThumbnail;