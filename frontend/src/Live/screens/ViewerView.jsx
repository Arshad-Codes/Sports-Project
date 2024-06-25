import { useMeeting } from '@videosdk.live/react-sdk';
import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

function ViewerView() {
  const playerRef = useRef(null);
  const { hlsUrls, hlsState } = useMeeting();

  useEffect(() => {
    if (hlsUrls.playbackHlsUrl && hlsState === 'HLS_PLAYABLE') {
      if (Hls.isSupported()) {
        const hls = new Hls();
        const player = document.querySelector('#hlsPlayer');
        hls.loadSource(hlsUrls.playbackHlsUrl);
        hls.attachMedia(player);
      } else {
        if (typeof playerRef.current?.play === 'function') {
          playerRef.current.src = hlsUrls.playbackHlsUrl;
          playerRef.current.play();
        }
      }
    }
  }, [hlsUrls, hlsState]);

  return (
    <div className="p-4">
      {hlsState !== 'HLS_PLAYABLE' ? (
        <p className="text-center text-gray-500">
          HLS has not started yet or is stopped
        </p>
      ) : (
        hlsState === 'HLS_PLAYABLE' && (
          <div className="w-full h-full">
            <video
              ref={playerRef}
              id="hlsPlayer"
              autoPlay={true}
              controls
              className="w-full h-auto"
              muted={true}
              onError={(err) => {
                console.log(err, 'hls video error');
              }}
            ></video>
          </div>
        )
      )}
    </div>
  );
}

export default ViewerView;
