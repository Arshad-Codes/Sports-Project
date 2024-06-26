import { Constants, useMeeting } from '@videosdk.live/react-sdk';
import { useMemo } from 'react';
import Controls from '../Controls';
import ParticipantView from './ParticipantView';

function SpeakerView(props) {
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
    <div className="space-y-4 p-4 w-full">
      <p className="text-gray-700">Current HLS State: {hlsState}</p>
      <Controls onDeleteMeeting={props.onDeleteMeeting} />
      <div>
        {speakers.map((participant) => (
          <ParticipantView
            participantId={participant.id}
            key={participant.id}
          />
        ))}
      </div>
    </div>
  );
}

export default SpeakerView;
