//Auth token we will use to generate a meeting and connect to it
export const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJhOGQ4NTg2Mi0wZGRmLTQ4YWUtODc2MC0wYWRmMTJhMWUzY2YiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxOTEzMjQ3OSwiZXhwIjoxNzIxNzI0NDc5fQ.ERpxDv5OPp9gta9ap28ING6kTisR6XjaSko5IJRPVVw';

// API call to create meeting
export const createLiveStreaming = async () => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: `${authToken}`,
      'Content-Type': 'application/json',
    },
  });

  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  // console.log(roomId);
  return roomId;
};
