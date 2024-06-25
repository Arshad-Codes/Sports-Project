import { useParticipant } from '@videosdk.live/react-sdk';
import { useEffect, useMemo, useRef } from 'react';
import ReactPlayer from 'react-player';

function ParticipantView(props) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error('videoElem.current.play() failed', error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <p className="font-semibold text-gray-800 mb-2">
        Participant: {displayName}
      </p>
      <p className="text-sm text-gray-600">
        Webcam: {webcamOn ? 'ON' : 'OFF'} | Mic: {micOn ? 'ON' : 'OFF'}
      </p>
      <audio
        ref={micRef}
        autoPlay
        playsInline
        muted={isLocal}
        className="hidden"
      />
      {webcamOn && (
        <div className="mt-4">
          <ReactPlayer
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            height="300px"
            width="100%"
            className="rounded-lg overflow-hidden"
            onError={(err) => {
              console.log(err, 'participant video error');
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ParticipantView;
