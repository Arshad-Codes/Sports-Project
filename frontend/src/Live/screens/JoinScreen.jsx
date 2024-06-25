import { useState } from 'react';

function JoinScreen({ getMeetingAndToken, setMode }) {
  const [meetingId, setMeetingId] = useState(null);
  const onClick = async (mode) => {
    setMode(mode);
    await getMeetingAndToken(meetingId);
  };
  return (
    <div className="container">
      <button onClick={() => onClick('CONFERENCE')}>Create Meeting</button>
      <br />
      <br />
      {' or '}
      <br />
      <br />
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <br />
      <br />
      <button onClick={() => onClick('CONFERENCE')}>Join as Host</button>
      {' | '}
      <button onClick={() => onClick('VIEWER')}>Join as Viewer</button>
    </div>
  );
}

export default JoinScreen;

// import { useState } from 'react';

// function JoinScreen({ meetingID, getMeetingAndToken, setMode }) {
//   console.log(meetingID);
//   const [meetingId, setMeetingId] = useState(null);
//   const onClick = async (mode) => {
//     setMode(mode);
//     await getMeetingAndToken(meetingID);
//   };
//   return (
//     <div className="container">
//       <button onClick={() => onClick('CONFERENCE')}>Create Meeting</button>
//       <br />
//       <br />
//       {' or '}
//       <br />
//       <br />
//       <input type="text" placeholder="Enter Meeting Id" />
//       <br />
//       <br />
//       <button onClick={() => onClick('CONFERENCE')}>Join as Host</button>
//       {' | '}
//       <button onClick={() => onClick('VIEWER')}>Join as Viewer</button>
//     </div>
//   );
// }

// export default JoinScreen;
