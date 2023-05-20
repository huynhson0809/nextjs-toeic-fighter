import {
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./Audio.module.scss";

export interface AudioProps {
  source?: string
}

const Audio: FC<AudioProps> = ({ ...props }) => {
  const {
    source = "https://study4.com/media/tez_media1/sound/ets_toeic_2022_test_2_32_34.mp3",
  } = props;
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [showPause, setShowPause] = useState(false);
  const [showMute, setShowMute] = useState(false);
  const volumeRef = useRef<any>();
  const audioRef = useRef<any>();
  const intervalRef = useRef<any>();

  const handleChangeProgress = (e: any) => {
    const progressPercent = +e.target.value;
    setProgress(progressPercent);
    audioRef.current.currentTime =
      (audioRef.current.duration / 100) * progressPercent;
  };
  const handleChangeVolume = (e: any) => {
    const valueVol = e.target.value;
    if (valueVol === "0") {
      setShowMute(true);
    } else {
      setShowMute(false);
    }
    setVolume(valueVol);
    audioRef.current.volume = valueVol / 100;
    volumeRef.current = valueVol;
  };
  const handleClickMute = () => {
    setVolume(volumeRef.current);
    setShowMute(false);
    audioRef.current.muted = false;
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.volume = volume / 100;

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
      } else {
        const percent =
          (+audioRef.current.currentTime / +audioRef.current.duration) * 100;
        if (percent > 99) {
          setProgress(100);
          setShowPause(false);
        } else {
          setProgress(percent);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    if (showPause === true) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPause]);

  useEffect(() => { }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {showPause ? (
          <div
            className={styles.icon}
            onClick={() => {
              setShowPause(false);
            }}
          >
            <FontAwesomeIcon icon={faPause} />
          </div>
        ) : (
          <div
            className={styles.icon}
            onClick={() => {
              if (progress === 100) {
                setProgress(0);
                clearInterval(intervalRef.current);
                audioRef.current.currentTime = 0;
              }
              setShowPause(true);
            }}
          >
            <FontAwesomeIcon icon={faPlay} />
          </div>
        )}
        <div className={styles.progressContainer}>
          <div className={styles.progress}>
            <input
              type="range"
              min={0}
              max={100}
              step={0.01}
              value={progress}
              onChange={handleChangeProgress}
            />
          </div>
        </div>
        {showMute ? (
          <div className={styles.icon} onClick={handleClickMute}>
            <FontAwesomeIcon icon={faVolumeXmark} />
          </div>
        ) : (
          <div
            className={styles.icon}
            onClick={() => {
              setShowMute(true);
              setVolume(0);
              audioRef.current.muted = true;
            }}
          >
            <FontAwesomeIcon icon={faVolumeHigh} />
          </div>
        )}
        <div className={styles.volumeContainer}>
          <div className={styles.volume}>
            <input
              type="range"
              min={0}
              max={100}
              step={0.05}
              value={volume}
              onChange={handleChangeVolume}
              ref={volumeRef}
            />
          </div>
        </div>
      </div>
      <audio src={source} preload="metadata" ref={audioRef}></audio>
    </div>
  );
};
export default Audio;
