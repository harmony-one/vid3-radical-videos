import React, { useCallback, useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import MuxPlayer from '@mux/mux-player-react';
import {VideoInfo} from "../video-upload/types";
import {client} from "../video-upload/client";
import {BaseLayout} from "../../components/BaseLayout";

const isVideoReady = (video: VideoInfo) => {
  return video.muxAsset.status === 'ready';
}

const getPlaybackId = (video: VideoInfo) => {
  if (!video.muxAsset.playback_ids) {
    return '';
  }

  return video.muxAsset.playback_ids[0].id;
}

const VideoDetailsPage = () => {

  const {videoId} = useParams();
  const [video, setVideo] = useState<VideoInfo>();

  const loadVideo = useCallback(async () => {
    if (!videoId) {
      return;
    }

    const responseData = await client.loadVideoInfo(videoId);

    setVideo(() => responseData);

  }, [videoId]);

  useEffect(() => {
    loadVideo()
  }, [loadVideo]);

  const isVideoExistAndReady = video && isVideoReady(video);
  return (
    <BaseLayout>
      {!isVideoExistAndReady && (
        <div>video preparing...123</div>
      )}
      {isVideoExistAndReady && (
        <MuxPlayer
          streamType="on-demand"
          playbackId={getPlaybackId(video)}
          metadata={{
            video_id: "video-id-54321",
            video_title: "Test video title",
            viewer_user_id: "user-id-007",
          }}
        />
      )}
    </BaseLayout>
  )
}

export default VideoDetailsPage