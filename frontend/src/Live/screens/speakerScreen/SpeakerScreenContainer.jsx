import { MeetingProvider } from '@videosdk.live/react-sdk';
import React from 'react';
import MediaControlsContainer from './MediaControlsContainer';
import ParticipantsGridContainer from './ParticipantsGridContainer';

import { authToken } from '../../api';

const SpeakerScreenContainer = ({ meetingId }) => {
  return (
    <MeetingProvider
      token={authToken}
      config={{
        meetingId,
        name: "infas1002's Org",
        micEnabled: true,
        webcamEnabled: true,
      }}
      joinWithoutUserInteraction
    >
      <MediaControlsContainer meetingId={meetingId} />
      <ParticipantsGridContainer />
    </MeetingProvider>
  );
};

export default SpeakerScreenContainer;
