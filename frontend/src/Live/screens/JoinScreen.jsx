import { Spinner, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

function JoinScreen({ role, getMeetingAndToken, setMode }) {
  const [meetingId, setMeetingId] = useState(null);
  const [liveList, setLiveList] = useState();
  const [loading, setLoading] = useState(true);
  // console.log(liveList);
  const onClick = async (mode) => {
    setMode(mode);
    await getMeetingAndToken(meetingId);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'https://ruhunasports.onrender.com/api/live/getlive'
        );
        setLiveList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching live list', error);
      }
    }
    fetchData();
  }, [liveList]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert('Copied to clipboard');
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
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
            {loading ? (
              <div className="flex justify-center">
                <Spinner className="h-16 w-16 text-white" />
              </div>
            ) : (
              <div>
                {liveList.map((live, index) => (
                  <div key={index} className="mb-4 p-4 border rounded shadow">
                    <>
                      <p className="text-lg font-semibold">{live.name}</p>
                      <p className="text-sm text-gray-600">
                        Meeting ID: {live.meetingId}
                      </p>
                      <button
                        onClick={() => copyToClipboard(live.meetingId)}
                        className="mt-2 py-1 px-2 bg-green-500 text-white rounded hover:bg-green-700"
                      >
                        Copy Meeting ID
                      </button>
                    </>
                  </div>
                ))}
                {liveList && (
                  <Typography
                    color="red"
                    variant="h3"
                    className="text-center my-2"
                  >
                    No Live Availables
                  </Typography>
                )}
              </div>
            )}
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
