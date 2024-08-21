import { useState, useRef, useEffect } from 'react';

const Home: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recordedChunks = useRef<Blob[]>([]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    startCamera();
  }, []);

  const startRecording = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const mediaRecorder = new MediaRecorder(videoRef.current.srcObject as MediaStream);

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorderRef.current.start();
      setIsRecording(true);

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        recordedChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const videoBlob = new Blob(recordedChunks.current, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(videoBlob);
        setVideoURL(videoUrl);
        recordedChunks.current = [];
      };
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
      <h1>Video Recorder</h1>
      <video ref={videoRef} style={{ width: '100%', maxWidth: '500px' }} autoPlay muted></video>
      <br />
      <button onClick={isRecording ? stopRecording : startRecording} style={{ marginTop: '20px' }}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {videoURL && (
        <div style={{ marginTop: '20px' }}>
          <video controls src={videoURL} style={{ width: '100%', maxWidth: '500px' }}></video>
          <a href={videoURL} download="recording.webm">
            <button>Download Recording</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
