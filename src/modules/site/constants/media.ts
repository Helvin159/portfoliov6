const FALLBACK_PROFILE_IMAGE_URL = '/images/profile-portrait.png'

const homeHeroImageUrl = process.env.NEXT_PUBLIC_HOME_HERO_IMAGE_URL?.trim()
const aboutProfileImageUrl = process.env.NEXT_PUBLIC_ABOUT_PROFILE_IMAGE_URL?.trim()

export const HOME_HERO_IMAGE_URL = homeHeroImageUrl || FALLBACK_PROFILE_IMAGE_URL

export const ABOUT_PROFILE_IMAGE_URL = aboutProfileImageUrl || FALLBACK_PROFILE_IMAGE_URL

export const DEFAULT_LOCATION = 'Methuen, MA USA'
