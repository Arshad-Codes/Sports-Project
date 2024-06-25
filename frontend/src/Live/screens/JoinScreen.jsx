import { useState } from 'react';

function JoinScreen({ role, getMeetingAndToken, setMode }) {
  const [meetingId, setMeetingId] = useState(null);
  const onClick = async (mode) => {
    setMode(mode);
    await getMeetingAndToken(meetingId);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 md:p-8 lg:p-10 shadow-lg w-11/12 max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {role === 'host' ? 'Create or Join a Meeting' : 'Join a Meeting'}
        </h2>
        {role === 'host' && (
          <button
            onClick={() => onClick('CONFERENCE')}
            className="w-full py-2 px-4 mb-4 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create Meeting
          </button>
        )}
        {role === 'user' && (
          <>
            <input
              type="text"
              placeholder="Enter Meeting Id"
              onChange={(e) => setMeetingId(e.target.value)}
              className="w-full py-2 px-4 mb-4 border rounded"
            />
            <button
              onClick={() => onClick('VIEWER')}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Join
            </button>
          </>
        )}
      </div>
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
