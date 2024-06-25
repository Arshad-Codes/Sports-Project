import { Constants, useMeeting } from '@videosdk.live/react-sdk';
import { useEffect, useRef, useState } from 'react';
import ViewerView from './screens/ViewerView';
import SpeakerView from './screens/SpeakerView';

function Container(props) {
  const [joined, setJoined] = useState(null);
  const { join } = useMeeting();
  const role = props.role;
  const mMeeting = useMeeting({
    onMeetingJoined: () => {
      if (mMeetingRef.current.localParticipant.mode === 'CONFERENCE') {
        mMeetingRef.current.localParticipant.pin();
      }
      setJoined('JOINED');
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const mMeetingRef = useRef(mMeeting);
  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  const joinMeeting = () => {
    setJoined('JOINING');
    join();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 md:p-8 lg:p-10 shadow-lg w-11/12 max-w-md">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Meeting Id: {props.meetingId}
        </h3>
        {joined && joined === 'JOINED' ? (
          mMeeting.localParticipant.mode === Constants.modes.CONFERENCE ? (
            <SpeakerView />
          ) : mMeeting.localParticipant.mode === Constants.modes.VIEWER ? (
            <ViewerView />
          ) : null
        ) : joined && joined === 'JOINING' ? (
          <p className="text-center">Joining the meeting...</p>
        ) : (
          <button
            onClick={joinMeeting}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Join
          </button>
        )}
      </div>
    </div>
  );
}

export default Container;

// import { Constants, useMeeting } from '@videosdk.live/react-sdk';
// import { useEffect, useRef, useState } from 'react';
// import ViewerView from './screens/ViewerView';
// import SpeakerView from './screens/SpeakerView';
// import axios from 'axios';

// function Container(props) {
//   const [joined, setJoined] = useState(null);
//   const { join } = useMeeting();
//   const role = props.role;
//   const meetingId = props.meetingId;

//   const mMeeting = useMeeting({
//     onMeetingJoined: () => {
//       if (mMeetingRef.current.localParticipant.mode === 'CONFERENCE') {
//         mMeetingRef.current.localParticipant.pin();
//       }
//       setJoined('JOINED');
//     },
//     onMeetingLeft: () => {
//       props.onMeetingLeave();
//     },
//     onError: (error) => {
//       alert(error.message);
//     },
//   });

//   const mMeetingRef = useRef(mMeeting);

//   useEffect(() => {
//     mMeetingRef.current = mMeeting;
//   }, [mMeeting]);

//   const joinMeeting = () => {
//     setJoined('JOINING');
//     join();
//   };

//   const handleSubmit = async () => {
//     console.log(props.meetingId);
//     try {
//       await axios.post('http://localhost:8800/api/live/createlive', {
//         meetingId,
//       });
//       joinMeeting();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="container">
//       <h3>Meeting Id: {props.meetingId}</h3>
//       {joined && joined === 'JOINED' ? (
//         mMeeting.localParticipant.mode === Constants.modes.CONFERENCE ? (
//           <SpeakerView />
//         ) : mMeeting.localParticipant.mode === Constants.modes.VIEWER ? (
//           <ViewerView />
//         ) : null
//       ) : joined && joined === 'JOINING' ? (
//         <p>Joining the meeting...</p>
//       ) : role === 'host' ? (
//         <button onClick={handleSubmit}>Join</button>
//       ) : role === 'user' ? (
//         <button onClick={joinMeeting}>Join</button>
//       ) : null}
//     </div>
//   );
// }

// export default Container;
