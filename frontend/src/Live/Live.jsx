import { useState } from 'react';
import { authToken, createLiveStreaming } from './api.js';
import { MeetingConsumer, MeetingProvider } from '@videosdk.live/react-sdk';
import JoinScreen from './screens/JoinScreen';
import Container from './Container';
import { useLocation } from 'react-router-dom';

function Live() {
  const [meetingId, setMeetingId] = useState(null);
  // console.log(meetingId);
  // State to handle the mode of the participant i.e. CONFERENCE or VIEWER
  const [mode, setMode] = useState('CONFERENCE');
  const location = useLocation();
  const role = location.state?.role || '';
  // console.log(role);
  // we have to get the MeetingId from the API created earlier
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
        mode: mode, // This will be the mode of the participant CONFERENCE or VIEWER
      }}
      token={authToken}
    >
      <MeetingConsumer>
        {() => (
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <Container meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
          </div>
        )}
      </MeetingConsumer>
    </MeetingProvider>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <JoinScreen getMeetingAndToken={getMeetingAndToken} setMode={setMode} />
    </div>
  );
}

export default Live;

// import React, { useState, useEffect } from 'react';
// import { authToken, createLiveStreaming } from './api.js';
// import { MeetingConsumer, MeetingProvider } from '@videosdk.live/react-sdk';
// import JoinScreen from './screens/JoinScreen';
// import Container from './Container';
// import { useLocation } from 'react-router-dom';

// function Live() {
//   const [meetingId, setMeetingId] = useState(null);
//   const [mode, setMode] = useState('CONFERENCE');
//   const location = useLocation();
//   const role = location.state?.role || '';
//   const meetingID = location.state?.meetingID || '';
//   console.log(meetingID);
//   console.log(role);
//   const meetingIdFromState = location.state?.meetingId || '';

//   useEffect(() => {
//     if (role === 'host' && meetingIdFromState) {
//       setMeetingId(meetingIdFromState);
//     }
//   }, [role, meetingIdFromState]);

//   const getMeetingAndToken = async (id) => {
//     const meetingId = id == null ? await createLiveStreaming() : id;
//     setMeetingId(meetingId);
//   };

//   const onMeetingLeave = () => {
//     setMeetingId(null);
//   };

//   return authToken && meetingId ? (
//     <MeetingProvider
//       config={{
//         meetingId,
//         micEnabled: true,
//         webcamEnabled: true,
//         name: 'infas_nm',
//         mode: mode,
//       }}
//       token={authToken}
//     >
//       <MeetingConsumer>
//         {() => (
//           <div className="flex flex-col items-center justify-center min-h-screen p-4">
//             <Container
//               role={role}
//               meetingId={meetingId}
//               onMeetingLeave={onMeetingLeave}
//             />
//           </div>
//         )}
//       </MeetingConsumer>
//     </MeetingProvider>
//   ) : (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4">
//       <JoinScreen
//         meetingID={meetingID}
//         getMeetingAndToken={getMeetingAndToken}
//         setMode={setMode}
//       />
//     </div>
//   );
// }

// export default Live;
