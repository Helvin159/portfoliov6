// Types
import type { SiteSettings } from '@/modules/site/types/content';
// Assets
import aboutImage from '@/assets/img/IMG_0815.jpg';

type AboutContentProps = {
  siteSettings: SiteSettings | null;
};

export function AboutContent({ siteSettings }: AboutContentProps) {
  const title =
    siteSettings?.aboutHeadlines?.[0]?.copy ??
    siteSettings?.name ??
    'About Helvin Rymer';
  const copy =
    siteSettings?.aboutCopy?.[1]?.copy ?? siteSettings?.aboutCopy?.[0]?.copy;
  const skills = siteSettings?.skills?.slice(0, 8) ?? [];

  return (
    <section className='about__hero'>
      <div className='about__hero__profile'>
        <div className='about__hero__profile__bio'>
          <h1>{title}</h1>
          {copy ? <p>{copy}</p> : null}
        </div>
        {skills.length > 0 ? (
          <div className='about__hero__profile__skills'>
            <p>// Key Skills</p>
            {skills.map((skill) => (
              <span
                className='about__hero__profile__skill'
                key={skill.id ?? skill.name}
              >
                {skill.name}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      {aboutImage.src ? (
        <div className='about__hero__profile__img'>
          <img
            src={aboutImage.src}
            alt={`${siteSettings?.name ?? 'Helvin Rymer'} portrait`}
          />
        </div>
      ) : null}
    </section>
  );
}
