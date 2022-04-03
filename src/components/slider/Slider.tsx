import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import './slider.css';
import './thumb.css';

type Props = {
  percentage: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Slider({
  percentage = 0,
  onChange,
}: Props): JSX.Element {
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(-20);
  const [progressWidth, setProgressWidth] = useState(0);

  let rangeRef = useRef<HTMLInputElement | null>(null);
  let thumbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rangeWidth = rangeRef?.current?.getBoundingClientRect().width ?? 0;
    const thumbWidth = thumbRef?.current?.getBoundingClientRect().width ?? 0;
    const centerThumb = (thumbWidth / 100) * percentage * -1;
    const centerProgressBar =
      (rangeWidth / 100) * percentage - (thumbWidth / 100) * percentage;

    setPosition(percentage);
    setMarginLeft(centerThumb);
    setProgressWidth(centerProgressBar);
  }, [percentage]);

  return (
    <div className='slider-container'>
      <div
        className='progress-bar-cover'
        style={{ width: `${progressWidth}px` }}
      ></div>
      <div
        className='thumb'
        ref={(el) => (thumbRef.current = el)}
        style={{ left: `${position}%`, marginLeft: `${marginLeft}px` }}
      ></div>
      <input
        type='range'
        className='range'
        value={position}
        ref={(el) => (rangeRef.current = el)}
        step='0.01'
        onChange={onChange}
      />
    </div>
  );
}
