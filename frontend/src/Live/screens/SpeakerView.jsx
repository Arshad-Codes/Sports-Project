import { Constants, useMeeting } from '@videosdk.live/react-sdk';
import { useMemo } from 'react';
import Controls from '../Controls';
import ParticipantView from './ParticipantView';

function SpeakerView() {
  const { participants, hlsState } = useMeeting();

  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()].filter(
      (participant) => {
        return participant.mode === Constants.modes.CONFERENCE;
      }
    );

    return speakerParticipants;
  }, [participants]);
  return (
    <div>
      <p>Current HLS State: {hlsState}</p>
      <Controls />

      {speakers.map((participant) => (
        <ParticipantView participantId={participant.id} key={participant.id} />
      ))}
    </div>
  );
}

export default SpeakerView;
