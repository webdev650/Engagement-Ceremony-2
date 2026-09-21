"use client";

import { useState } from "react";
import { useScrollStore } from "@/store/useScrollStore";
import { Check, Send, Sparkles } from "lucide-react";

export function Section6RSVP() {
  const isRsvpSubmitted = useScrollStore((state) => state.isRsvpSubmitted);
  const setRsvpSubmitted = useScrollStore((state) => state.setRsvpSubmitted);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState("2");
  const [dietary, setDietary] = useState("Vegetarian / Jain");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitted(true);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-24 pointer-events-none">
      <div className="max-w-2xl w-full mx-auto pointer-events-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.35em] text-gold-400 font-sans block mb-2">
            Chapter VI • Response Requested
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-ivory-100">
            Kindly RSVP
          </h2>
          <p className="font-sans text-blush text-sm sm:text-base mt-2">
            Please respond by October 1st, 2026 to grace our celebration.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="bg-maroon-800/85 backdrop-blur-xl border border-gold-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl">
          {isRsvpSubmitted ? (
            <div className="text-center py-10 space-y-4 animate-float-gentle">
              <div className="w-16 h-16 mx-auto rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-300">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl text-ivory-100 font-light">
                Thank You, {name || "Dear Guest"}!
              </h3>
              <p className="text-blush text-sm max-w-md mx-auto leading-relaxed">
                Your response has been joyfully recorded. We look forward to celebrating this sacred union with you!
              </p>
              <button
                onClick={() => setRsvpSubmitted(false)}
                className="text-xs uppercase tracking-widest text-gold-400 underline mt-4 hover:text-gold-300"
              >
                Edit Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Attendance Toggle */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAttending("yes")}
                  className={`py-3.5 px-4 rounded-xl border text-xs tracking-wider uppercase font-semibold font-sans transition-all ${
                    attending === "yes"
                      ? "bg-gold-gradient text-maroon-950 border-gold-400 shadow-lg"
                      : "bg-maroon-900/60 text-ivory-200 border-gold-500/20 hover:border-gold-500/40"
                  }`}
                >
                  Joyfully Accepts
                </button>
                <button
                  type="button"
                  onClick={() => setAttending("no")}
                  className={`py-3.5 px-4 rounded-xl border text-xs tracking-wider uppercase font-semibold font-sans transition-all ${
                    attending === "no"
                      ? "bg-gold-gradient text-maroon-950 border-gold-400 shadow-lg"
                      : "bg-maroon-900/60 text-ivory-200 border-gold-500/20 hover:border-gold-500/40"
                  }`}
                >
                  Regretfully Declines
                </button>
              </div>

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-blush mb-2 font-sans">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Royal Guest"
                    className="w-full bg-maroon-900/70 border border-gold-500/30 rounded-xl px-4 py-3 text-ivory-100 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-blush mb-2 font-sans">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="guest@domain.com"
                    className="w-full bg-maroon-900/70 border border-gold-500/30 rounded-xl px-4 py-3 text-ivory-100 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
              </div>

              {attending === "yes" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-blush mb-2 font-sans">
                      Number of Guests
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full bg-maroon-900/70 border border-gold-500/30 rounded-xl px-4 py-3 text-ivory-100 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5+ Guests</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-blush mb-2 font-sans">
                      Dietary Preferences
                    </label>
                    <select
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      className="w-full bg-maroon-900/70 border border-gold-500/30 rounded-xl px-4 py-3 text-ivory-100 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                    >
                      <option value="Vegetarian / Jain">Vegetarian / Jain</option>
                      <option value="Vegan">Vegan</option>
                      <option value="No Restrictions">No Restrictions</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Message Field */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-blush mb-2 font-sans">
                  Blessing / Note for Couple
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your warm wishes..."
                  className="w-full bg-maroon-900/70 border border-gold-500/30 rounded-xl px-4 py-3 text-ivory-100 text-sm focus:outline-none focus:border-gold-400 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gold-gradient text-maroon-950 font-sans font-semibold text-xs tracking-[0.2em] uppercase rounded-xl shadow-xl hover:shadow-gold-500/40 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit RSVP Confirmation
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
