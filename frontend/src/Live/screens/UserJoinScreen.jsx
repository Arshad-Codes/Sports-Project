import { useState } from 'react';

function UserJoinScreen({ getMeetingAndToken, setMode }) {
  const [meetingId, setMeetingId] = useState(null);
  //Set the mode of joining participant and set the meeting id or generate new one
  const onClick = async (mode) => {
    setMode(mode);
    await getMeetingAndToken(meetingId);
  };
  return (
    <div className="container">
      {/* <button onClick={() => onClick('CONFERENCE')}>Create Meeting</button>
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
      <br /> */}
      <button onClick={() => onClick('CONFERENCE')}>Join as Host</button>
      {' | '}
      <button onClick={() => onClick('VIEWER')}>Join as Viewer</button>
    </div>
  );
}

export default UserJoinScreen;
