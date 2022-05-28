import React, { useEffect, useRef } from 'react';
import './index.scss';
import { throttle } from 'lodash';
export const Page: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const barBoxRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const scrollWith = contentRef.current.offsetWidth - wrapperRef.current.clientWidth;
    const scrollLeft = wrapperRef.current.scrollLeft;
    const scrollPercent = scrollLeft / scrollWith;

    const barBoxScrollWith = barBoxRef.current.offsetWidth - barRef.current.offsetWidth;
    const transformWidth = `${scrollPercent * barBoxScrollWith}px`;
    barRef.current.style.transform = `translateX(${transformWidth})`;
  };

  useEffect(() => {
    const handleThrottleScroll = throttle(handleScroll, 100);
    wrapperRef.current.addEventListener('scroll', handleThrottleScroll);
    return () => window.removeEventListener('scroll', handleThrottleScroll);
  }, []);
  return (
    <>
      <div className={'wrapper'} ref={wrapperRef}>
        <div className={'content'} ref={contentRef} />
      </div>

      <div className={'scrollBox'} ref={barBoxRef}>
        <div className={'scrollBox-bar'} ref={barRef} />
      </div>
    </>
  );
};

export default Page;
