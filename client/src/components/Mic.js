import React, { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import './Mic.css';

const Mic = () => {
  const recorderControls = useAudioRecorder();

  const [audioBlob, setAudioBlob] = useState(null);
  const [prompt, setPrompt] = useState('');

  const addAudioElement = async (blob) => {
    setAudioBlob(blob);
  };

  const handleSaveAudio = async () => {
    recorderControls.stopRecording();
    if (audioBlob) {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'audio.webm');

      try {
        const response = await fetch('http://localhost:5000/search', {
            method: 'POST',
            body: formData,
        });
        console.log('Audio saved successfully:', response.data);
      } catch (error) {
        console.error('Failed to save audio:', error);
      }
    }
  };

  const handleSubmit = async () => {
      try {
          const response = await fetch('http://localhost:5000/search', {
              method: 'POST',
              body: JSON.stringify({
                  prompt: prompt
              }),
              contentType: "application/json",
          });
          console.log('Audio saved successfully:', response.data);
      } catch (error) {
          console.error('Failed to save audio:', error);
      }
  }

  return (
      <div>
          <AudioRecorder
              onRecordingComplete={(blob) => addAudioElement(blob)}
              recorderControls={recorderControls}
          />
          <form onSubmit={handleSubmit}>
              <div className="top-bar">
                  <div>
                      <button
                          type="submit"
                          className="submit-btn">
                          Done
                      </button>
                  </div>
              </div>

              <div className="fields-top">
                  <input
                      type="text"
                      placeholder="Search..."
                      name="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                  />
              </div>
          </form>
          <button onClick={recorderControls.stopRecording}>Stop recording</button>
          <button onClick={handleSaveAudio}>Save Audio</button>
      </div>
  );
};

export default Mic;

