import { Constants, useMeeting } from '@videosdk.live/react-sdk';
import { useEffect, useRef, useState } from 'react';
import ViewerView from './screens/ViewerView';
import SpeakerView from './screens/SpeakerView';
import axios from 'axios';
import { Input, Typography } from '@material-tailwind/react';

function Container(props) {
  const [joined, setJoined] = useState(null);
  const [name, setName] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const { join } = useMeeting();
  const role = props.role;
  const meetingId = props.meetingId;
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
  function handleChange(e) {
    setName(e.target.value);
    if (validationMessage) {
      setValidationMessage('');
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setValidationMessage('Please enter a name');
      return;
    }
    try {
      await axios.post('http://localhost:8800/api/live/createlive', {
        meetingId,
        name,
      });
      joinMeeting();
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteMeeting = async () => {
    try {
      await axios.delete(
        `http://localhost:8800/api/live/deletelive/${meetingId}`
      );
    } catch (err) {
      console.error('Error deleting the meeting:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-lg font-semibold mb-4">
        Meeting Id: {props.meetingId}
      </h3>
      {joined && joined === 'JOINED' ? (
        mMeeting.localParticipant.mode === Constants.modes.CONFERENCE ? (
          <SpeakerView onDeleteMeeting={onDeleteMeeting} />
        ) : mMeeting.localParticipant.mode === Constants.modes.VIEWER ? (
          <ViewerView />
        ) : null
      ) : joined && joined === 'JOINING' ? (
        <p className="text-gray-500">Joining the meeting...</p>
      ) : role === 'user' ? (
        <button
          onClick={joinMeeting}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Join
        </button>
      ) : role === 'host' ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Name
              </Typography>
              <Input
                size="lg"
                type="text"
                name="name"
                placeholder="Name of the Match"
                onChange={handleChange}
                id="name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              {validationMessage && (
                <p className="text-red-500">{validationMessage}</p>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Join
            </button>
          </form>
        </>
      ) : (
        <p>Refresh the Page</p>
      )}
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
//       await axios.post('https://ruhunasports.onrender.com/api/live/createlive', {
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
