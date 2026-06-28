'use client';

// React
import { useRef, useState } from 'react';
// Components
import Image from 'next/image';
// Types
import type { SiteProject } from '@/modules/site/types/content';

// Constants
import playIcon from '@/assets/svg/icon-play-arrow.svg';
import pauseIcon from '@/assets/svg/icon-pause-presentation.svg';

type ProjectVideoProps = {
  posterUrl?: string;
  project: SiteProject;
};

export function ProjectVideo({ posterUrl, project }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoUrl = project.video?.url;

  if (!videoUrl) {
    return null;
  }

  const togglePlayback = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      void video.play();
      return;
    }

    video.pause();
  };

  return (
    <section className='project__video'>
      <div className='project__video__header'>
        <h3>{project.video?.caption ?? 'Video presentation'}</h3>
      </div>
      <div className='project__video__player'>
        <video
          loop
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          poster={posterUrl}
          ref={videoRef}
        >
          <source
            src={videoUrl}
            type={project.video?.contentType ?? 'video/mp4'}
          />
        </video>
        <div className='project__video__play__pause__container'>
          <button
            className='project__video__play__pause__container__playBtn'
            onClick={togglePlayback}
            type='button'
          >
            {isPlaying ? (
              <Image
                src={pauseIcon.src}
                width={96}
                height={96}
                alt='Pause video'
              />
            ) : (
              <Image
                src={playIcon.src}
                width={96}
                height={96}
                alt='Play video'
              />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
