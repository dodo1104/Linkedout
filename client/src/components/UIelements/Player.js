import React, { useState, useEffect, useRef } from 'react';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { FaPlay } from 'react-icons/fa';

import './Player.css';

const Player = ({ file }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0); //0 <= volume <= 1
  const [currentTime, setCurrentTime] = useState(0); //in secs
  const [duration, setDuration] = useState(-1);
  const [isVolumeHover, setIsVolumeHover] = useState(false);
  const playerRef = useRef();

  useEffect(() => {
    const { current = null } = playerRef;
    if (current) {
      isPlaying ? current.play() : current.pause();
    }
  }, [isPlaying, playerRef.current]);

  useEffect(() => {
    const { current = null } = playerRef;
    if (current) {
      current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const { current = null } = playerRef;
    if (current) {
      current.currentTime = currentTime;
    }
  }, [currentTime]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentTime(() => currentTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, currentTime]);

  useEffect(() => {
    const { current = null } = playerRef;
    if (current && current.currentTime !== currentTime) {
      setCurrentTime(parseInt(current.currentTime));
    }
  }, [playerRef.current, currentTime]);

  useEffect(() => {
    if (!duration || !currentTime) return;

    currentTime === duration && setIsPlaying(false);
  }, [currentTime, duration]);

  const convertSecondsToTimeFormat = (val) => {
    //video duration max = 30 mins

    const mins = Math.floor(val / 60);
    const secs = Math.floor(val % 60);
    const timeFormatFixedMins = mins < 10 ? '0' : '';
    const timeFormatFixedSecs = secs < 10 ? '0' : '';
    const timeFormat = `${timeFormatFixedMins}${mins}:${timeFormatFixedSecs}${secs}`;

    return timeFormat;
  };

  return (
    <div className="player">
      <div className={`player__cover ${isPlaying ? 'player--hide-icon' : ''}`}>
        <FaPlay className="player__cover__run-arrow" />
      </div>
      <video
        onClick={(e) => {
          if (!isPlaying) {
            setIsPlaying(true);
            currentTime === duration && setCurrentTime(0);
          } else setIsPlaying(false);
        }}
        ref={playerRef}
        width="100%"
        height="100%"
        onDurationChangeCapture={(e) =>
          setDuration(parseInt(e.target.duration))
        }
      >
        <source
          // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          src={URL.createObjectURL(file)}
          // type="video/mp4"
        />
      </video>
      <div className="player__controls">
        <div className="player__controls__bottom">
          <span
            className="player__icon"
            onClick={(e) => {
              if (!isPlaying) {
                setIsPlaying(true);
                currentTime === duration && setCurrentTime(0);
              } else setIsPlaying(false);
            }}
          >
            {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
          </span>

          <div
            className="player__controls__volume"
            onMouseEnter={() => setIsVolumeHover(true)}
            onMouseLeave={() => setIsVolumeHover(false)}
          >
            <label
              className="player__icon"
              htmlFor="volume"
              onClick={() => {
                volume > 0 ? setVolume(0) : setVolume(0.5);
              }}
            >
              {volume > 0 ? <HiVolumeUp /> : <HiVolumeOff />}
            </label>
            <input
              className={`player__controls__volume__input ${
                !isVolumeHover ? 'player--hide-icon' : ''
              }`}
              type="range"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              min={0}
              max={1}
              step={0.1}
              name="volume"
              id="volume"
            />
          </div>
          <label
            className="player__icon"
            htmlFor="currentTime"
            id="label-currentTime"
          >
            {currentTime >= 0 && convertSecondsToTimeFormat(currentTime)}/
            {duration > 0 && convertSecondsToTimeFormat(duration)}
          </label>
          <input
            type="range"
            value={currentTime}
            onChange={(e) => {
              setCurrentTime(e.target.value);
            }}
            min={0}
            max={parseInt(duration) ? parseInt(duration) : 0}
            step={1}
            name="currentTime"
            id="currentTime"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
