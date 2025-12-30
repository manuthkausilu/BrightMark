"use client";

import { motion } from 'framer-motion';
import { FaPaintBrush, FaPrint, FaGift, FaClock, FaHandshake } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-28">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white mx-5 sm:mx-8 lg:mx-12 mt-6 sm:mt-8 rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] overflow-hidden px-4 pt-20 pb-20 min-h-[75vh] flex items-center">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Crafting Visual Excellence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
          >
            Where creativity meets precision in design, printing, and gifting.
          </motion.p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6">Who We Are</h2>
            <p className="text-gray-600 font-medium text-lg sm:text-xl md:text-2xl leading-relaxed mb-6">
              At our company, we deliver complete graphic design, premium printing, and creative gift item solutions under one roof. Our excellent workmanship reflects precision, innovation, and quality in every project.
            </p>
            <p className="text-gray-600 font-medium text-lg sm:text-xl md:text-2xl leading-relaxed">
              With efficient workflows, timely delivery, and friendly, professional service, we turn ideas into impactful results, building lasting relationships through reliability, creativity, and customer-focused care that inspire trust and satisfaction for clients.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FaPaintBrush className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 text-lg sm:text-xl md:text-2xl">Graphic Design</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center mt-8">
              <FaPrint className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 text-lg sm:text-xl md:text-2xl">Premium Printing</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FaGift className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 text-lg sm:text-xl md:text-2xl">Creative Gifts</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center mt-8">
              <FaHandshake className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 text-lg sm:text-xl md:text-2xl">Professional Care</h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-gray-800 mb-12">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaClock />,
                title: "Timely Delivery",
                desc: "Efficient workflows ensuring your projects are delivered on schedule."
              },
              {
                icon: <FaHandshake />,
                title: "Customer Focus",
                desc: "Building lasting relationships through reliability and care."
              },
              {
                icon: <FaPaintBrush />,
                title: "Innovation",
                desc: "Turning your unique ideas into impactful, creative results."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition-all"
              >
                <div className="text-4xl text-blue-600 mb-4">{item.icon}</div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 font-medium text-base sm:text-lg md:text-xl">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA (match Services page sizing) */}
      <section className="px-4 sm:px-6 lg:px-10 py-14">
        <div className="mx-auto max-w-[110rem]">
          <div className="relative bg-blue-900 text-white rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] overflow-hidden px-10 sm:px-14 py-14 sm:py-16 md:py-20 shadow-xl ring-1 ring-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  Ready to bring your idea to life?
                </h3>
                <p className="mt-3 text-lg sm:text-xl md:text-2xl text-blue-100/90 font-medium max-w-2xl">
                  Tell us what you need — design, printing, framing, or custom gifts — and we’ll share the best options, pricing, and timelines.
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
                  href="/service"
                  className="inline-flex items-center justify-center rounded-full bg-white/10 px-10 py-5 text-lg sm:text-xl font-semibold text-white hover:bg-white/15 ring-1 ring-white/25 transition-all"
                >
                  View Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
