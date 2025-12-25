'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/service', label: 'Service' },
    { href: '/shop', label: 'Shop' },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      setIsVisible(true);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      const currentY = window.scrollY;

      if (currentY <= 0) {
        setIsVisible(true);
        lastScrollY.current = 0;
        return;
      }

      const delta = Math.abs(currentY - lastScrollY.current);
      if (delta < 10) return;

      if (currentY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full bg-white transform transition-transform duration-300 ease-in-out`}
      style={{
        fontFamily: "var(--font-poppins), 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <div className={isVisible ? 'translate-y-0' : '-translate-y-full'}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex h-20 md:h-24 items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/websiteLogo.png"
                  alt="Bright Mark Logo"
                  width={180}
                  height={74}
                  className="h-14 md:h-18 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Center: Navigation links (centered) */}
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-gray-800 hover:text-red-500 transition-colors duration-300 px-2 py-1"
                  style={{
                    fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                    fontSize: '22px',
                    fontWeight: 550,
                    letterSpacing: '0.01em',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right: CTA + mobile menu button */}
            <div className="flex items-center gap-4">
              {/* CTA button visible only on lg+ */}
              <div className="hidden lg:block">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 text-white bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-full"
                  style={{
                    fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                    fontSize: '22px',
                    fontWeight: 550,
                    letterSpacing: '0.01em',
                  }}
                >
                  Talk to Us
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                type="button"
                className="lg:hidden inline-flex items-center justify-center p-2 text-[#1a1a1a] hover:text-[#333] focus:outline-none transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-2 py-3 text-gray-800 hover:text-red-500 transition-colors"
                  style={{
                    fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                    fontSize: '20px',
                    fontWeight: 550,
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile CTA */}
              <Link
                href="/contact"
                className="block w-full text-center px-6 py-3 mt-4 text-white bg-red-600 hover:bg-red-700 transition-colors rounded-full"
                style={{
                  fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                  fontSize: '20px',
                    fontWeight: 500,
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

