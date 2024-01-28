import React, { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import './Mic.css';

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
    <div className='audio-input'>
      <p id="prompt">Ask me to help find a contact!</p>
      <AudioRecorder id='mic-icon'
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      <button onClick={handleSaveAudio}>Enter</button>
    </div>
  );
};

export default Mic;

