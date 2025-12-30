import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 text-slate-800 pt-24 md:pt-28">
      {/* Hero (same style as Service/About) */}
      <section className="relative bg-blue-900 text-white mx-5 sm:mx-8 lg:mx-12 mt-6 sm:mt-8 rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] overflow-hidden px-4 pt-20 pb-20 min-h-[75vh] flex items-center">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">Shop</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto">
            Browse our products and place your order.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-10 py-14">
        <div className="mx-auto max-w-6xl">
          {/* ...existing / upcoming shop content... */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg">
            <p className="text-base sm:text-lg text-slate-700 font-medium">Shop page</p>
          </div>
        </div>
      </section>

      {/* Modern CTA (match Services/About sizing) */}
      <section className="px-4 sm:px-6 lg:px-10 pb-14">
        <div className="mx-auto max-w-[110rem]">
          <div className="relative bg-blue-900 text-white rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] overflow-hidden px-10 sm:px-14 py-14 sm:py-16 md:py-20 shadow-xl ring-1 ring-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  Want something customized?
                </h3>
                <p className="mt-3 text-lg sm:text-xl md:text-2xl text-blue-100/90 font-medium max-w-2xl">
                  If you don’t see your exact product here, send details and we’ll guide you with options and pricing.
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
                  href="/service"
                  className="inline-flex items-center justify-center rounded-full bg-white/10 px-10 py-5 text-lg sm:text-xl font-semibold text-white hover:bg-white/15 ring-1 ring-white/25 transition-all"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
