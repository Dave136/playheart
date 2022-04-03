import { useRef, useState } from 'react';
import ControlPanel from './controls/ControlPanel';
import Slider from './slider/Slider';
import './player.css';

const song = '../../files/Attention - Charlie Puth.MP3';

export default function Player() {
  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>();

  const onChange = (e: any) => {
    const audio = audioRef.current;

    if (audio) audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  const play = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = 0.1;
    }

    if (!isPlaying) {
      setIsPlaying(true);
      audio?.play();
    }

    if (isPlaying) {
      setIsPlaying(false);
      audio?.pause();
    }
  };

  const getCurrentDuration = (e: any) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));
  };

  return (
    <div className='app-container'>
      <h1>Audio Player</h1>
      <Slider percentage={percentage} onChange={onChange} />
      <audio
        ref={(el) => (audioRef.current = el)}
        onTimeUpdate={getCurrentDuration}
        onLoadedData={(e) => {
          setDuration(+e.currentTarget.duration.toFixed(2));
        }}
        src={song}
      ></audio>
      <ControlPanel
        play={play}
        isPlaying={isPlaying}
        duration={duration}
        currentTime={currentTime}
      />
    </div>
  );
}
