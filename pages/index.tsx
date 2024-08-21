import { useState, useRef } from 'react';

const Home: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      alert(`navigator.mediaDevices.getUserMedia: ${navigator.mediaDevices.getUserMedia({audio: true})}`)
      
      // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // const mediaRecorder = new MediaRecorder(stream);

      // mediaRecorderRef.current = mediaRecorder;
      // mediaRecorderRef.current.start();
      // setIsRecording(true);

      // mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
      //   audioChunks.current.push(event.data);
      // };

      // mediaRecorderRef.current.onstop = () => {
      //   const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      //   const audioUrl = URL.createObjectURL(audioBlob);
      //   setAudioURL(audioUrl);
      //   audioChunks.current = [];
      // };
    } catch (error) {
      alert(`Error accessing microphone: ${error}`);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Audio Recorder</h1>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioURL && (
        <div style={{ marginTop: '20px' }}>
          <audio controls src={audioURL}></audio>
          <a href={audioURL} download="recording.wav">
            <button>Download Recording</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
