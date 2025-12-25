'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const leftContentRef = useRef<HTMLDivElement | null>(null);
  const gradientRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // GSAP / ScrollTrigger animations for hero content & container
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    const hero = heroRef.current;
    const content = contentRef.current;
    if (!hero || !content || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>('.hero-line');
      gsap.set(content, { opacity: 1 });
      gsap.set(lines, { yPercent: 60, opacity: 0, rotateX: -5, transformOrigin: 'left center' });

      const introTl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      introTl.to(lines, { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.35, stagger: 0.15 })
             .from('.hero-scroll-indicator', { y: 12, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.8');

      gsap.to(content, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.4
        }
      });

      gsap.to(containerRef.current, {
        scale: 1.05,
        yPercent: 4,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  // Animate left content on mount when user used previous isScrolled condition
  useEffect(() => {
    if (isScrolled && leftContentRef.current) {
      gsap.fromTo(leftContentRef.current, { x: -120, opacity: 0 }, { x: 0, opacity: 1, duration: 2.8, ease: 'expo.inOut' }); // slower mount reveal
    }
  }, [isScrolled]);

  useEffect(() => {
    // Ensure video plays with proper attributes
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay prevented:', error);
      });
    }
  }, []);
 
  useEffect(() => {
     const handleScroll = () => {
       if (typeof window === 'undefined') return;
       setIsScrolled(window.scrollY > 1);
     };
 
     window.addEventListener('scroll', handleScroll, { passive: true });
     handleScroll(); // Check initial scroll position
     return () => window.removeEventListener('scroll', handleScroll);
   }, []);
 
   return (
     <div className="flex flex-col bg-white" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
       {/* Hero Section with Video Background - Below Navbar */}
       <section
         ref={heroRef}
         className="relative w-full overflow-hidden m-0 p-0 pt-21 md:pt-25 bg-white"
       >
         <div className="w-full m-0 p-0 px-4 sm:px-6 lg:px-8">
           <div className={`relative min-h-[70vh] sm:min-h-[80vh] md:min-h-screen flex transition-all duration-700 ease-in-out ${
             isScrolled ? 'flex-col lg:flex-row gap-0' : 'flex-col'
           }`}>
             {/* Left Side: Content - Hidden initially, appears on scroll */}
             {isScrolled && (
             <div
               ref={leftContentRef}
               className="flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-12 lg:py-20 bg-white w-full lg:w-1/2 transition-all duration-700 ease-in-out"
             >
               <h1
                 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4 px-6 py-3 md:px-8 md:py-4"
                 style={{ fontFamily: "Myriad Pro, 'Segoe UI', Roboto, sans-serif" }}
               >
                 Welcome to <span className="text-red-600">Excellence</span>
               </h1>
               <p className="text-xl sm:text-2xl text-gray-700 mb-6 leading-relaxed">
                 Experience excellence in every product and service. We deliver innovative solutions 
                 with exceptional customer care that sets us apart.
               </p>
               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                 <p className="text-base text-gray-600 mb-0">
                   Ready to get started?
                 </p>
                 <Link
                   href="/shop"
                   className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-4 text-base font-semibold text-white hover:bg-red-700 shadow-lg transition-all duration-300 transform hover:scale-105"
                 >
                   Shop Now
                 </Link>
               </div>
             </div>
             )}

             {/* Video Container (wrapped to support GSAP scale, rounded radius preserved) */}
             <div
               ref={containerRef}
               // Keep rounding classes consistent; anchor to the right with lg:ml:auto so width transitions shrink/expand from left toward right
               className={`relative box-border transform transition-transform h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden rounded-3xl sm:rounded-[3rem] md:rounded-[4rem] transition-all duration-700 ease-in-out w-full lg:ml-auto ${
                 isScrolled
                   ? 'lg:w-1/2 border-transparent shadow-none mx-0 translate-y-0'
                   : 'lg:w-full border-2 border-gray-200 shadow-xl mx-6 sm:mx-10 lg:mx-16 translate-y-2'
               }`}
               // Make sure it never shows a seam or focus outline
               style={{
                 backgroundColor: '#ffffff',
                 overflow: 'hidden',
                 outline: 'none',
                 WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                 WebkitBackfaceVisibility: 'hidden',
                 backfaceVisibility: 'hidden',
                 transform: 'translateZ(0)',
                 willChange: 'width, margin-left, transform'
               }}
               tabIndex={-1}
             >
               {/* Video Background */}
               <video
                 ref={videoRef}
                 autoPlay
                 loop
                 muted
                 playsInline
                 className="absolute inset-0 w-full h-full object-cover outline-none focus:outline-none border-none ring-0 shadow-none"
                 style={{
                   borderRadius: 'inherit',
                   display: 'block',
                   boxShadow: 'none',
                   outline: 'none',
                   WebkitBackfaceVisibility: 'hidden',
                   backfaceVisibility: 'hidden',
                 }}
               >
                 <source src="/bg.mp4" type="video/mp4" />
                 Your browser does not support the video tag.
               </video>

               {/* Light Overlay for better text readability */}
               <div
                 className={`absolute inset-0 bg-black/10 transition-all duration-700 pointer-events-none`}
                 style={{
                   borderRadius: 'inherit',    // keep exact radius
                   backgroundClip: 'padding-box',
                   boxShadow: 'none',
                   outline: 'none',
                   WebkitBackfaceVisibility: 'hidden',
                   backfaceVisibility: 'hidden',
                 }}
               ></div>

               {/* Gradient Overlay */}
               <div
                 ref={gradientRef}
                 className={`absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20 transition-all duration-700 pointer-events-none`}
                 style={{
                   borderRadius: 'inherit',
                   backgroundClip: 'padding-box',
                   boxShadow: 'none',
                   outline: 'none',
                   WebkitBackfaceVisibility: 'hidden',
                   backfaceVisibility: 'hidden',
                   opacity: isScrolled ? 0.5 : 1
                 }}
               ></div>

               {/* Centered Overlay Title (stays centered across the hero) */}
               <div ref={contentRef} className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                 <div className="mx-auto max-w-4xl text-center px-4">
                   <h1
                     className="font-bold tracking-tight text-white mb-2 leading-tight"
                     style={{ fontFamily: "Myriad Pro, 'Segoe UI', Roboto, sans-serif", lineHeight: 0.95 }}
                   >
                     <div className="inline-block text-left">
                      <span className="block hero-line text-[3.6rem] sm:text-[4.6rem] md:text-[6rem] lg:text-[7rem]">Bright Mark</span>
                      <span className="block hero-line text-right text-base sm:text-lg md:text-3xl font-medium text-white/90 mt-3">Creative Graphic Design Center</span>
                     </div>
                   </h1>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>
     </div>
   );
}
