'use client'

import { useMemo } from 'react'

export default function Page() {
  const categories = useMemo(
    () => [
      {
        id: 'graphic',
        title: 'Graphic Works',
        items: [
          'Logo & Branding Design',
          'Posters, Banners & Flyers',
          'Visiting Card & Invitation Design',
          'Certificate & ID Card Design',
          'Photo Editing & Retouching',
        ],
      },
      {
        id: 'offset',
        title: 'Offset Works',
        items: [
          'Book Printing',
          'Wedding Card Printing',
          'Invitation Card Printing',
          'Certificate Printing',
          'Letterhead Printing',
          'Bulk Printing Solutions',
        ],
      },
      {
        id: 'digital',
        title: 'Digital Works',
        items: [
          'Sticker Printing',
          'Visiting Card Printing',
          'ID Card (Plastic) Printing',
          'Color & Black & White Printing (All Sizes)',
          'Quick Print Services',
        ],
      },
      {
        id: 'sublimation',
        title: 'Sublimation Works',
        items: ['Mug Printing', 'T-Shirt Printing', 'Customized Gift Items', 'Personalized Products', 'Promotional Items'],
      },
      {
        id: 'photo',
        title: 'Photo & Frame Works',
        items: ['Photo Printing', 'Photo Framing', 'Custom Frame Designs', 'Photo Editing & Restoration'],
      },
    ],
    []
  )

  return (
    <main className="min-h-screen bg-gray-50 text-slate-800 pt-24 md:pt-28">
      {/* Hero (match Contact hero sizing) */}
      <section className="relative bg-blue-900 text-white mx-5 sm:mx-8 lg:mx-12 mt-6 sm:mt-8 rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] overflow-hidden px-4 pt-20 pb-20 min-h-[75vh] flex items-center">
        <div className="max-w-[110rem] mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">Our Services</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto">
            Explore our design, printing, photo and customization services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-10 py-14">
        <div className="mx-auto max-w-[110rem]">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <article
                key={cat.id}
                className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">{cat.title}</h2>

                <ul className="space-y-3 text-base sm:text-lg md:text-xl text-slate-700 font-medium">
                  {cat.items.map((it) => (
                    <li key={it} className="flex items-start gap-3">
                      <span className="mt-1 text-red-500 font-bold">▸</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* Modern CTA (hero-like) */}
          <section className="mt-14">
            <div className="relative bg-blue-900 text-white rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] overflow-hidden px-10 sm:px-14 py-14 sm:py-16 md:py-20 shadow-xl ring-1 ring-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />
              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="text-center lg:text-left">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    Need a custom quote or a large order?
                  </h3>
                  <p className="mt-3 text-lg sm:text-xl md:text-2xl text-blue-100/90 font-medium max-w-2xl">
                    Share quantity, size, material and finish — we’ll reply with pricing and timelines.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-white px-10 py-5 text-lg sm:text-xl font-semibold text-blue-900 hover:bg-blue-50 shadow-lg transition-all"
                  >
                    Contact us
                  </a>
                  <a
                    href="/shop"
                    className="inline-flex items-center justify-center rounded-full bg-white/10 px-10 py-5 text-lg sm:text-xl font-semibold text-white hover:bg-white/15 ring-1 ring-white/25 transition-all"
                  >
                    Browse Shop
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
