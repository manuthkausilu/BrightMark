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
 
               {/* Content - Centered, animated by GSAP */}
               <div ref={contentRef} className="relative z-10 h-full flex items-center justify-center transition-all duration-700 ease-in-out">
                 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                   <div className="mx-auto max-w-4xl text-center">
                     <h1
                       className="font-bold tracking-tight text-white mb-6 transition-all duration-700 leading-tight w-full max-w-full text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6.5rem] 2xl:text-[8rem] text-center"
                       style={{ fontFamily: "Myriad Pro, 'Segoe UI', Roboto, sans-serif", lineHeight: 0.95 }}
                     >
                       <span className="block hero-line">Creative Graphic</span>
                       <span className="block hero-line">Desing Center</span>
                     </h1>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>
 
      {/* Features Grid */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2
              className="text-lg font-semibold leading-7 text-red-600"
              style={{ fontFamily: "Myriad Pro, 'Segoe UI', Roboto, sans-serif" }}
            >
              Why Choose Bright Mark
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Everything you need to succeed
            </p>
            <p className="mt-6 text-xl leading-9 text-black">
              We provide comprehensive solutions tailored to your needs, ensuring quality 
              and satisfaction every step of the way.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt
                  className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-black"
                  style={{ fontFamily: "Myriad Pro, 'Segoe UI', Roboto, sans-serif" }}
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-red-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    </svg>
                  </div>
                  Quality Assurance
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-lg leading-8 text-black">
                  <p className="flex-auto">
                    Every product undergoes rigorous quality checks to ensure you receive 
                    only the best. We stand behind everything we sell.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt
                  className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-black"
                  style={{ fontFamily: "Myriad Pro, 'Segoe UI', Roboto, sans-serif" }}
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </div>
                  Wide Selection
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-lg leading-8 text-black">
                  <p className="flex-auto">
                    Browse through our extensive catalog of products designed to meet 
                    your diverse needs. Find exactly what you're looking for.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt
                  className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-black"
                  style={{ fontFamily: "Myriad Pro, 'Segoe UI', Roboto, sans-serif" }}
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-red-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                      />
                    </svg>
                  </div>
                  Fast Delivery
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-lg leading-8 text-black">
                  <p className="flex-auto">
                    Quick and reliable shipping to get your orders to you as fast as possible. 
                    We value your time as much as you do.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt
                  className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-black"
                  style={{ fontFamily: "Myriad Pro, 'Segoe UI', Roboto, sans-serif" }}
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  Expert Support
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-lg leading-8 text-black">
                  <p className="flex-auto">
                    Our dedicated team is here to help you with any questions or concerns. 
                    Your satisfaction is our priority.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt
                  className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-black"
                  style={{ fontFamily: "Myriad Pro, 'Segoe UI', Roboto, sans-serif" }}
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-red-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5z"
                      />
                    </svg>
                  </div>
                  Competitive Prices
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-lg leading-8 text-black">
                  <p className="flex-auto">
                    Get the best value for your money with our competitive pricing. 
                    Quality doesn't have to break the bank.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt
                  className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-black"
                  style={{ fontFamily: "Myriad Pro, 'Segoe UI', Roboto, sans-serif" }}
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    </svg>
                  </div>
                  Secure Shopping
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-lg leading-8 text-black">
                  <p className="flex-auto">
                    Shop with confidence knowing your data is protected. We use the latest 
                    security measures to keep your information safe.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
 
      {/* CTA Section */}
      <section className="bg-gray-50 border-t-4 border-b-4 border-red-600">
        <div className="px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="text-4xl font-bold tracking-tight text-black sm:text-5xl"
              style={{ fontFamily: "Myriad Pro, 'Segoe UI', Roboto, sans-serif" }}
            >
              Ready to experience the difference?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-xl leading-9 text-black">
              Join thousands of satisfied customers who trust Bright Mark for their needs. 
              Start shopping today and discover what sets us apart.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/shop"
                className="rounded-md bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"
              >
                Browse Products
              </Link>
              <Link
                href="/contact"
                className="text-base font-semibold leading-6 text-blue-600 hover:text-blue-700 transition-colors"
              >
                Contact us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
 
      {/* Services Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2
              className="text-lg font-semibold leading-7 text-red-600"
              style={{ fontFamily: "Myriad Pro, 'Segoe UI', Roboto, sans-serif" }}
            >
              Our Services
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Comprehensive solutions for all your needs
            </p>
            <p className="mt-6 text-xl leading-8 text-black">
              From product sales to custom solutions, we've got you covered with 
              exceptional service every step of the way.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt
                  className="text-lg font-semibold leading-7 text-black"
                  style={{ fontFamily: "Myriad Pro, 'Segoe UI', Roboto, sans-serif" }}
                >
                  Product Sales
                </dt>
                <dd className="mt-2 text-lg leading-7 text-black">
                  Browse our extensive catalog of high-quality products. From everyday essentials 
                  to specialized items, we have something for everyone.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt
                  className="text-lg font-semibold leading-7 text-black"
                  style={{ fontFamily: "Myriad Pro, 'Segoe UI', Roboto, sans-serif" }}
                >
                  Customer Support
                </dt>
                <dd className="mt-2 text-lg leading-7 text-black">
                  Get help when you need it with our 24/7 customer support. Our expert team 
                  is always ready to assist you with any questions or concerns.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt
                  className="text-lg font-semibold leading-7 text-black"
                  style={{ fontFamily: "Myriad Pro, 'Segoe UI', Roboto, sans-serif" }}
                >
                  Custom Solutions
                </dt>
                <dd className="mt-2 text-lg leading-7 text-black">
                  Need something specific? We offer tailored solutions to meet your unique 
                  requirements. Let us create the perfect solution for you.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt
                  className="text-lg font-semibold leading-7 text-black"
                  style={{ fontFamily: "Myriad Pro, 'Segoe UI', Roboto, sans-serif" }}
                >
                  Fast Delivery
                </dt>
                <dd className="mt-2 text-lg leading-7 text-black">
                  Quick and reliable shipping options to get your orders delivered on time. 
                  We understand the importance of timely delivery.
                </dd>
              </div>
            </dl>
            <div className="mt-12 text-center">
              <Link
                href="/service"
                className="text-base font-semibold leading-6 text-blue-600 hover:text-blue-700 transition-colors"
              >
                View all services <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
