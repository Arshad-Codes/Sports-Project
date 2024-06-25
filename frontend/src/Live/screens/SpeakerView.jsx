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
    <div className="p-6 md:p-8 lg:p-10 bg-gray-100 rounded-lg shadow-lg">
      <p className="text-lg font-semibold mb-4 text-center text-gray-800">
        Current HLS State: {hlsState}
      </p>
      <div className="mb-4">
        <Controls />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {speakers.map((participant) => (
          <div
            key={participant.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <ParticipantView participantId={participant.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpeakerView;
