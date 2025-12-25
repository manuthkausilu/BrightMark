'use client'

import { useMemo, useState } from 'react'

export default function Page() {
  const [query, setQuery] = useState('')

  const categories = [
    {
      id: 'graphic',
      title: '🎨 Graphic Works',
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
      title: '🖨️ Offset Works',
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
      title: '💻 Digital Works',
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
      title: '🔥 Sublimation Works',
      items: ['Mug Printing', 'T-Shirt Printing', 'Customized Gift Items', 'Personalized Products', 'Promotional Items'],
    },
    {
      id: 'photo',
      title: '🖼️ Photo & Frame Works',
      items: ['Photo Printing', 'Photo Framing', 'Custom Frame Designs', 'Photo Editing & Restoration'],
    },
  ]

  const normalizedQuery = query.trim().toLowerCase()
  const filtered = useMemo(() => {
    if (!normalizedQuery) return categories
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((i) => i.toLowerCase().includes(normalizedQuery)),
      }))
      .filter((cat) => cat.items.length > 0)
  }, [normalizedQuery])

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <header className="bg-gradient-to-r from-red-50 via-white to-white border-b border-zinc-100">
        <div className="mx-auto max-w-screen-2xl px-6 py-14">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">Our Services</h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl">
            Professional print, design, photo and customization services. Explore our categories or search to find what you need.
          </p>

          <div className="mt-6 max-w-lg">
            <label htmlFor="service-search" className="sr-only">Search services</label>
            <div className="relative">
              <input
                id="service-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services (e.g. 'Logo', 'Mug')"
                className="w-full rounded-lg border border-zinc-200 px-4 py-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 text-base"
                aria-label="Search services"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base text-slate-500 hover:text-slate-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-screen-2xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length === 0 ? (
            <div className="col-span-full rounded-lg border border-zinc-100 bg-red-50 p-8 text-center">
              <p className="text-2xl font-semibold">No services found for "{query}".</p>
              <p className="mt-3 text-base text-slate-600">Try a different keyword or clear the search.</p>
            </div>
          ) : (
            filtered.map((cat) => (
              <article key={cat.id} className="rounded-lg border border-zinc-100 bg-white p-8 shadow-sm hover:shadow-md transition">
                <h2 className="text-[20px] md:text-2xl font-semibold mb-4">{cat.title}</h2>
                <ul className="space-y-3 text-[16px] md:text-[18px] text-slate-700">
                  {cat.items.map((it) => (
                    <li key={it} className="flex items-start gap-3">
                      <span className="mt-0.5 text-red-500 text-[18px]">▸</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))
          )}
        </div>

        <div className="mt-12 text-center text-base text-slate-500">
          <p>Need a custom quote or have a large order? <a href="/contact" className="text-red-600 underline">Contact us</a>.</p>
        </div>
      </section>
    </main>
  )
}
