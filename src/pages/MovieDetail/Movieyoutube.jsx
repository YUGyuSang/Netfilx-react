import React from 'react'
import YouTube from 'react-youtube';
import { useYoutube } from '../../hooks/useYoutube';
import { useParams } from "react-router-dom";
import { Alert } from 'react-bootstrap';

const Movieyoutube = () => {
    const { id } = useParams();
    const opts = {
      height: '300',
      width: '400',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
    }
}

const {
    data: YouTubeData,
    isLoading: isYouTubeLoading,
    isError: isYouTubeError,
    error: YouTubeError,
} = useYoutube(id);

const onReady = (event) => {
    event.target.pauseVideo();
};

if(isYouTubeLoading){
    return <h2>Loding...</h2>
}
if(isYouTubeError){
    return <Alert variant="danger">{YouTubeError.message}</Alert>
}
const youtube = YouTubeData?.data?.results?.[0]?.key;
console.log('youtube',YouTubeData);
  return (
    <div>
      <YouTube videoId= {youtube} opts={opts} onEnd={(e)=>{e.target.stopVideo(0);}} onReady={onReady}  />;
      hi
    </div>
  )
}



export default Movieyoutube
