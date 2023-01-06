import { useNavigate } from "react-router-dom";
import { VideoType } from "../../util/api/video-api";

import "./VideoFeature.styles.scss";

type FeatureVideoProps = {
  feature: VideoType;
};

const VideoFeature = ({ feature }: FeatureVideoProps) => {
  console.log("JAJAAAJ", feature);
  const navigate = useNavigate();

  const watchVideo = (vanityUrl: string) => {
    navigate(`${vanityUrl}`);
  };
  return (
    <div className="feature-video">
      <video
        playsInline
        muted
        autoPlay
        loop
        onClick={() => watchVideo(feature.vanityUrl)}
      >
        <source type="video/mp4" src={feature.url} />
      </video>
    </div>
  );
};

export default VideoFeature;
