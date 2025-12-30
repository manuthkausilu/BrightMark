"use client";

import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { FiSend, FiUser, FiMail, FiMessageCircle, FiBookOpen } from "react-icons/fi";

// Custom Message Box (alert() වෙනුවට)
const showMessageBox = (message, isError = false) => {
  const messageBox = document.createElement('div');
  messageBox.className = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg shadow-lg text-white font-bold z-[9999] transition-opacity duration-300 ${isError ? 'bg-red-600' : 'bg-green-600'}`;
  messageBox.textContent = message;
  document.body.appendChild(messageBox);

  setTimeout(() => {
    messageBox.classList.add('opacity-0');
    messageBox.addEventListener('transitionend', () => messageBox.remove());
  }, 3000); // Message එක තත්පර 3කට පස්සේ අයින් වෙනවා
};

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Environment variables හරියට load වෙලාද කියලා බලන්න
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const secretKey = import.meta.env.VITE_EMAILJS_SECRET_KEY; // මේක තමයි Secret Key එක

    if (!serviceID || !templateID || !secretKey) {
      showMessageBox("Email service not configured. Missing Environment Variables.", true);
      console.error("EmailJS environment variables are not defined. Check your .env file and Vercel settings.");
      return;
    }

    emailjs
      .sendForm(
        serviceID,
        templateID,
        form.current,
        secretKey // මෙතන තමයි secret key එක පාවිච්චි වෙන්නේ
      )
      .then(
        () => {
          showMessageBox("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          showMessageBox("Failed to send message. Please try again later.", true);
          console.error("Email sending failed:", error.text);
        }
      );
  };

  return (
    <main className="min-h-screen bg-gray-50 text-slate-800 pt-24 md:pt-28">
      {/* Hero (same style as Service/About) */}
      <section className="relative bg-blue-900 text-white mx-5 sm:mx-8 lg:mx-12 mt-6 sm:mt-8 rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] overflow-hidden px-4 pt-20 pb-20 min-h-[75vh] flex items-center">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">Contact</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto">
            Let’s connect — send us your details and we’ll get back to you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section id="contact" className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl mx-auto bg-white backdrop-blur-sm rounded-2xl shadow-xl border border-red-100 p-10">
            {/* Modern Title */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent tracking-widest uppercase mb-3">
                Let's Connect & Start a Conversation
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-2">
                Reach out for collaborations, questions, or just to say hello. I'm always open to new opportunities and connections!
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start md:divide-x md:divide-red-50">
              {/* Left Side */}
              <div className="flex-1 flex flex-col items-center md:items-start justify-center gap-3 md:pr-6">
                <h1 className="text-2xl md:text-3xl font-bold text-red-700 mb-2">Let's Start Our Story Together</h1>
                <p className="text-gray-600 text-lg mb-4 text-center md:text-left">
                  Whether you have a question, want to collaborate, or just want to say hi, my inbox is always open!
                </p>
                <div className="flex flex-col gap-2 text-gray-700 text-base">
                  <div className="flex items-center gap-2">
                    <FiMail className="text-xl text-red-600" />
                    <span>manuthkausilu20031018@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiBookOpen className="text-xl text-red-500" />
                    <span>Horana, Sri Lanka</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <form
                ref={form}
                onSubmit={sendEmail}
                className="flex-1 flex flex-col gap-5 bg-white rounded-xl shadow-lg p-8 border border-red-50 md:pl-6"
              >
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="user_name"
                    required
                    placeholder="Your Name"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-200 bg-gray-50 text-gray-800 transition"
                  />
                </div>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="email"
                    name="user_email"
                    required
                    placeholder="Your Email Address"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-200 bg-gray-50 text-gray-800 transition"
                  />
                </div>
                <div className="relative">
                  <FiBookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="Your Subject"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-200 bg-gray-50 text-gray-800 transition"
                  />
                </div>
                <div className="relative">
                  <FiMessageCircle className="absolute left-3 top-4 text-gray-400 text-xl" />
                  <textarea
                    name="message"
                    required
                    placeholder="What can I help for you?"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-200 bg-gray-50 text-gray-800 transition min-h-[120px] resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-3 rounded-full font-semibold shadow transition transform duration-200 text-lg border-2 border-transparent group hover:scale-105 hover:bg-white hover:text-red-600 hover:border-red-600 hover:shadow-2xl active:scale-95"
                >
                  <FiSend className="text-xl group-hover:animate-bounce transition-transform duration-300" />
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;