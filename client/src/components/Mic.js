import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import './Mic.css';

const Mic = () => {
  const recorderControls = useAudioRecorder();

  const [audioBlob, setAudioBlob] = useState(null);

  const addAudioElement = async (blob) => {
    setAudioBlob(blob);
  };

  const handleSaveAudio = async () => {
    recorderControls.stopRecording();
    if (audioBlob) {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'audio.webm');

      try {
        fetch('http://localhost:5000/search', {
            method: 'POST',
            body: formData,
        })
        .then((response) => response.json())
        .then((response)=> {
          console.log('Audio saved successfully:', response);
          let url = '/details/' + response['contact_id'];
          <Link to={url}/>

        });
      } catch (error) {
        console.error('Failed to save audio:', error);
      }
    }
  };

  return (
      <div className='audio-input'>
      <p id="prompt">Ask me to help find a contact!</p>
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

