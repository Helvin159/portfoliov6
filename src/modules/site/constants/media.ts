import aboutImage from '@/assets/img/IMG_0815.jpg';
import homeImage from '@/assets/img/IMG_20160902_144507.jpg';

const homeHeroImageUrl = process.env.NEXT_PUBLIC_HOME_HERO_IMAGE_URL?.trim();
const aboutProfileImageUrl =
  aboutImage?.src || process.env.NEXT_PUBLIC_ABOUT_PROFILE_IMAGE_URL?.trim();

export const HOME_HERO_IMAGE_URL = homeImage.src;

export const ABOUT_PROFILE_IMAGE_URL = aboutImage.src;

export const DEFAULT_LOCATION = 'Methuen, MA USA';
