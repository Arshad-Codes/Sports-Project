import { useMeeting } from '@videosdk.live/react-sdk';

function Controls() {
  const { leave, toggleMic, toggleWebcam, startHls, stopHls } = useMeeting();

  return (
    <div className="space-x-4 space-y-3">
      <button
        onClick={() => leave()}
        className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Leave
      </button>
      <button
        onClick={() => toggleMic()}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Toggle Mic
      </button>
      <button
        onClick={() => toggleWebcam()}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Toggle Webcam
      </button>
      <button
        onClick={() =>
          startHls({
            layout: {
              type: 'SPOTLIGHT',
              priority: 'PIN',
              gridSize: '20',
            },
            theme: 'LIGHT',
            mode: 'video-and-audio',
            quality: 'high',
            orientation: 'landscape',
          })
        }
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Start HLS
      </button>
      <button
        onClick={() => stopHls()}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Stop HLS
      </button>
    </div>
  );
}

export default Controls;
