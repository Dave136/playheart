import './button.css';

type Props = {
  play: () => void;
  isPlaying: boolean;
};

export default function Button({ isPlaying, play }: Props): JSX.Element {
  return (
    <div className='flex content-center justify-center w-50px h-50px flex-grow'>
      <button onClick={play} className={isPlaying ? 'stop' : 'play'}></button>
    </div>
  );
}
