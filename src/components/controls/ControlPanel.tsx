import { secondsToHms } from '../../utils';
import Button from './Button';

type Props = {
  play: () => void;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
};

export default function ControlPanel({
  play,
  isPlaying,
  duration,
  currentTime,
}: Props): JSX.Element {
  return (
    <div className='px-0 py-15px flex justify-between'>
      <div className='text-sm font-extralight text-light-800'>
        {secondsToHms(currentTime)}
      </div>
      <Button play={play} isPlaying={isPlaying} />
      <div className='text-sm font-extralight text-light-800'>
        {secondsToHms(duration)}
      </div>
    </div>
  );
}
