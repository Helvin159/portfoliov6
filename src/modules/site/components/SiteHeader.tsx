'use client';
import Link from 'next/link';

/**
 * @returns {JSX.Element} The SiteHeader component renders the header section of the site, including the site title and navigation links.
 */
const SiteHeader = () => {
  if (typeof window === 'undefined') {
    return null; // Return null during server-side rendering to avoid window reference errors
  }

  return (
    <header className='site-nav'>
      <Link href='/'>Helvin Rymer</Link>
      <nav className='site-nav__links' aria-label='Primary navigation'>
        <Link href='/about'>About</Link>
        <Link href='/featured'>Projects</Link>
        <Link href='/contact'>Contact</Link>
        {window.location.hostname.includes('dev') && (
          <Link href='/admin'>Admin</Link>
        )}
      </nav>
    </header>
  );
};

export default SiteHeader;
