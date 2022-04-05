import { useEffect, useState } from 'react';
import { useAudio } from 'react-use';
import { secondsToHms } from '../utils';
import Slider from './slider/Slider';
import type { ChangeEvent } from 'react';

const src = '../../files/Attention - Charlie Puth.MP3';

const PlayerUse = () => {
  const [percentage, setPercentage] = useState(0);
  const [audio, state, controls, ref] = useAudio({
    src,
  });

  useEffect(() => {
    const time = state?.time ?? 0;
    const duration = state?.duration ?? 0;
    const percent = ((time / duration) * 100).toFixed(2);
    setPercentage(+percent ?? 0);
  }, [state.time]);

  const onChangeSlider = ({ target }: ChangeEvent<HTMLInputElement>) => {
    controls.seek((state.duration / 100) * Number(target.value));
    setPercentage(+target.value);
  };

  console.log({
    audio,
    state,
    controls,
    ref,
  });

  return (
    <div className='col-span-2 bg-light-900'>
      {audio}
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
      <Slider percentage={percentage} onChange={onChangeSlider} />
      {state.playing ? (
        <button
          className='px-4 py-2 bg-dark-300 rounded-md text-white mt-2 mr-4'
          onClick={controls.pause}
        >
          Pause
        </button>
      ) : (
        <button
          className='px-4 py-2 bg-dark-300 rounded-md text-white mt-2 mr-4'
          onClick={controls.play}
        >
          Play
        </button>
      )}
      {state.muted ? (
        <button
          className='px-4 py-2 bg-dark-100 rounded-md text-white mt-2 mr-4'
          onClick={controls.unmute}
        >
          Unmute
        </button>
      ) : (
        <button
          className='px-4 py-2 bg-dark-100 rounded-md text-white mt-2 mr-4'
          onClick={controls.mute}
        >
          Mute
        </button>
      )}
      <input
        type='range'
        step='0.01'
        min='0'
        max='1'
        value={state.volume}
        onChange={(e) => controls.volume(+e.target.value)}
      />
      <div>
        <p>current: {secondsToHms(state.time)}</p>
        <p>Total: {secondsToHms(state.duration)}</p>
      </div>
    </div>
  );
};

export default PlayerUse;
