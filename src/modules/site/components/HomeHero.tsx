// Components
import Image from 'next/image';

// Types
import type { SiteSettings } from '@/modules/site/types/content';

import mapIcon from '@/assets/svg/icon-map.svg';
import homeImage from '@/assets/img/IMG_20160902_144507.jpg';

type HomeHeroProps = {
  siteSettings: SiteSettings | null;
};

export function HomeHero({ siteSettings }: HomeHeroProps) {
  const headline = siteSettings?.headlines?.[0]?.copy ?? 'Helvin Rymer';
  const description =
    siteSettings?.headlines?.[1]?.copy ??
    'Front-end developer building polished, content-managed web experiences.';
  const stats = siteSettings?.stats ?? [];
  const location = siteSettings?.contactInfo?.location;

  return (
    <section className='hero__container'>
      <div className='hero__container__location'>
        <p>
          <span>
            <Image src={mapIcon.src} width={20} height={20} alt='Location' />
          </span>
          {location}
        </p>
      </div>
      <div className='hero__container__main'>
        <div className='hero__container__main__header'>
          <h1>{headline}</h1>
          <p>{description}</p>
        </div>
        {homeImage.src ? (
          <div className='hero__container__main__img'>
            <img
              src={homeImage.src}
              alt={`${siteSettings?.name ?? 'Helvin Rymer'} portrait`}
            />
          </div>
        ) : null}
      </div>
      {stats.length > 0 ? (
        <div className='hero__container__main__stats'>
          {stats.map((stat) => (
            <div className='stat' key={stat.id ?? stat.label}>
              <div className='stat__copy'>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
