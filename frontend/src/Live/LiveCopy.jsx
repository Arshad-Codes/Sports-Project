import { useState } from 'react';
import { authToken, createLiveStreaming } from './api.js';
import { MeetingConsumer, MeetingProvider } from '@videosdk.live/react-sdk';
import JoinScreen from './screens/JoinScreen';
import Container from './Container';
import UserJoinScreen from './screens/UserJoinScreen.jsx';

function LiveCopy() {
  const [meetingId, setMeetingId] = useState(null);

  //State to handle the mode of the participant i.e. CONFERENCE or VIEWER
  const [mode, setMode] = useState('CONFERENCE');

  const onClick = async (mode) => {
    setMode(mode);
    await getMeetingAndToken(meetingId);
  };
  //You have to get the MeetingId from the API created earlier
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createLiveStreaming({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: 'infas_nm',
        //This will be the mode of the participant CONFERENCE or VIEWER
        mode: mode,
      }}
      token={authToken}
    >
      <MeetingConsumer>
        {() => (
          <Container meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        )}
      </MeetingConsumer>
    </MeetingProvider>
  ) : (
    <UserJoinScreen getMeetingAndToken={getMeetingAndToken} setMode={setMode} />
    
  );
}

export default LiveCopy;