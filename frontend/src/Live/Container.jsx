import { Constants, useMeeting } from '@videosdk.live/react-sdk';
import { useEffect, useRef, useState } from 'react';
import ViewerView from './screens/ViewerView';
import SpeakerView from './screens/SpeakerView';

function Container(props) {
  const [joined, setJoined] = useState(null);
  const { join } = useMeeting();
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
    <div className="container">
      <h3>Meeting Id: {props.meetingId}</h3>
      {joined && joined === 'JOINED' ? (
        mMeeting.localParticipant.mode === Constants.modes.CONFERENCE ? (
          <SpeakerView />
        ) : mMeeting.localParticipant.mode === Constants.modes.VIEWER ? (
          <ViewerView />
        ) : null
      ) : joined && joined === 'JOINING' ? (
        <p>Joining the meeting...</p>
      ) : (
        <button onClick={joinMeeting}>Join</button>
      )}
    </div>
  );
}

export default Container;
