// import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
// import axios from 'axios';
// import { useEffect } from 'react';

// const Mic = () => {
//   const recorderControls = useAudioRecorder()
//   const addAudioElement = async (blob) => {
//     const url = URL.createObjectURL(blob);
//     console.log(url);
//     const formData = new FormData();
//     formData.append('audio', blob, 'audio.wav');
//     formData.set('Content-Type', 'audio/wav');

//     const response = await fetch('http://localhost:5000/listen', {
//         method: 'POST',
//         body: formData,
//     });

//     console.log(response);

//     if (!response.ok) {
//         console.log('Failed to send audio data');
//         return;
//     }

//     const result = await response.json();
//     console.log('Recognized audio text:', result.audioText);
//     };

//     return (
//         <div>
//         <AudioRecorder 
//             onRecordingComplete={(blob) => addAudioElement(blob)}
//             recorderControls={recorderControls}
//         />
//         <button onClick={recorderControls.stopRecording}>Stop recording</button>
//         </div>
//     )
// }

// export default Mic;

import React, { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

const Mic = () => {
  const recorderControls = useAudioRecorder();
  const [audioBlob, setAudioBlob] = useState(null);

  const addAudioElement = async (blob) => {
    setAudioBlob(blob);
  };

  const handleSaveAudio = async () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'audio.webm');
    //   formData.set('Content-Type', 'audio/wav;');

      try {
        const response = await fetch('http://localhost:5000/listen', {
            method: 'POST',
            body: formData,
        });
        console.log('Audio saved successfully:', response.data);
      } catch (error) {
        console.error('Failed to save audio:', error);
      }
    }
  };

  return (
    <div>
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      <button onClick={recorderControls.stopRecording}>Stop recording</button>
      <button onClick={handleSaveAudio}>Save Audio</button>
    </div>
  );
};

export default Mic;

