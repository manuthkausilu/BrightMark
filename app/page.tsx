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
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect desktop screen size
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // GSAP / ScrollTrigger animations for hero content & container - DESKTOP ONLY
  useEffect(() => {
    if (typeof window === 'undefined' || !isDesktop) return;
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
  }, [isDesktop]);

  // Animate left content on mount - DESKTOP ONLY
  useEffect(() => {
    if (isDesktop && isScrolled && leftContentRef.current) {
      gsap.fromTo(leftContentRef.current, { x: -120, opacity: 0 }, { x: 0, opacity: 1, duration: 2.8, ease: 'expo.inOut' });
    }
  }, [isScrolled, isDesktop]);

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
      if (typeof window === 'undefined' || !isDesktop) return;
      setIsScrolled(window.scrollY > 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDesktop]);
 
   return (
     <div className="flex flex-col bg-white" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
       {/* Hero Section with Video Background - Below Navbar */}
       <section
         ref={heroRef}
         className="relative w-full overflow-hidden m-0 p-0 pt-21 md:pt-25 bg-white"
       >
         <div className="w-full m-0 p-0 px-4 sm:px-6 lg:px-8">
           <div className={`relative min-h-[70vh] sm:min-h-[80vh] md:min-h-screen flex flex-col lg:flex-row ${
             isDesktop && isScrolled ? 'gap-0 transition-all duration-700 ease-in-out' : 'gap-0'
           }`}>
             {/* Video Container - First on mobile, right side on desktop */}
             <div
               ref={containerRef}
               className={`relative box-border transform h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden rounded-3xl sm:rounded-[3rem] md:rounded-[4rem] w-full ${
                 isDesktop && isScrolled
                   ? 'lg:w-1/2 lg:order-2 lg:ml-auto border-transparent shadow-none mx-0 translate-y-0 transition-all duration-700 ease-in-out'
                   : 'lg:w-full lg:order-2 lg:ml-auto border-2 border-gray-200 shadow-xl mx-0 lg:mx-6 translate-y-0 lg:translate-y-2'
               } ${!isDesktop ? 'order-1 border-2 border-gray-200 shadow-xl mx-0 mb-8' : ''}`}
               style={{
                 backgroundColor: '#ffffff',
                 overflow: 'hidden',
                 outline: 'none',
                 ...(isDesktop && {
                   WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                   WebkitBackfaceVisibility: 'hidden',
                   backfaceVisibility: 'hidden',
                   transform: 'translateZ(0)',
                   willChange: 'width, margin-left, transform'
                 })
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
                 className="absolute inset-0 w-full h-full object-cover outline-none focus:outline-none border-none"
                 style={{
                   borderRadius: 'inherit',
                   display: 'block',
                   ...(isDesktop && {
                     WebkitBackfaceVisibility: 'hidden',
                     backfaceVisibility: 'hidden',
                   })
                 }}
               >
                 <source src="/bg.mp4" type="video/mp4" />
                 Your browser does not support the video tag.
               </video>

               {/* Light Overlay */}
               <div
                 className="absolute inset-0 bg-black/10 pointer-events-none"
                 style={{ borderRadius: 'inherit' }}
               ></div>

               {/* Gradient Overlay */}
               <div
                 ref={gradientRef}
                 className={`absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20 pointer-events-none ${isDesktop ? 'transition-all duration-700' : ''}`}
                 style={{
                   borderRadius: 'inherit',
                   opacity: isDesktop && isScrolled ? 0.5 : 1
                 }}
               ></div>

               {/* Centered Overlay Title */}
               <div ref={contentRef} className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                 <div className="mx-auto max-w-4xl text-center px-4">
                   <h1
                     className="font-bold tracking-tight text-white mb-2 leading-tight"
                     style={{ fontFamily: "Myriad Pro, 'Segoe UI', Roboto, sans-serif", lineHeight: 0.95 }}
                   >
                     <div className="inline-block text-left">
                      <span className={`block text-[3.6rem] sm:text-[4.6rem] md:text-[6rem] lg:text-[7rem] ${isDesktop ? 'hero-line' : ''}`}>Bright Mark</span>
                      <span className={`block text-right text-base sm:text-lg md:text-3xl font-medium text-white/90 mt-3 ${isDesktop ? 'hero-line' : ''}`}>Creative Graphic Design Center</span>
                     </div>
                   </h1>
                 </div>
               </div>
             </div>

             {/* Left Side: Content - Second on mobile, left side on desktop */}
             {(isDesktop ? isScrolled : true) && (
             <div
               ref={leftContentRef}
               className={`flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-12 lg:py-20 bg-white w-full lg:w-1/2 ${
                 !isDesktop ? 'order-2' : 'lg:order-1'
               }`}
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
           </div>
         </div>
       </section>

       {/* Modern CTA */}
       <section className="px-4 sm:px-6 lg:px-10 py-14 bg-white">
         <div className="mx-auto max-w-[110rem]">
           <div className="relative bg-blue-900 text-white rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] overflow-hidden px-10 sm:px-14 py-14 sm:py-16 md:py-20 shadow-xl ring-1 ring-white/10">
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />
             <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">
               <div className="text-center lg:text-left">
                 <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                   Need design or printing today?
                 </h3>
                 <p className="mt-3 text-lg sm:text-xl md:text-2xl text-blue-100/90 font-medium max-w-2xl">
                   Share your requirements (size, quantity, material, finish) and we’ll respond with pricing and timelines.
                 </p>
               </div>

               <div className="flex flex-col sm:flex-row gap-4">
                 <Link
                   href="/contact"
                   className="inline-flex items-center justify-center rounded-full bg-white px-10 py-5 text-lg sm:text-xl font-semibold text-blue-900 hover:bg-blue-50 shadow-lg transition-all"
                 >
                   Contact us
                 </Link>
                 <Link
                   href="/shop"
                   className="inline-flex items-center justify-center rounded-full bg-white/10 px-10 py-5 text-lg sm:text-xl font-semibold text-white hover:bg-white/15 ring-1 ring-white/25 transition-all"
                 >
                   Browse Shop
                 </Link>
               </div>
             </div>
           </div>
         </div>
       </section>
     </div>
   );
}
