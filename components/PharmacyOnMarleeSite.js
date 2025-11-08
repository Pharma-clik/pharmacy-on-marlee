import React, { useMemo, useState, useEffect } from "react";

/**
 * Pharmacy on Marlee – site with simple Refill form
 * - Title in red, slightly larger
 * - Hero with pharmacy-related background (free Unsplash image)
 * - "Free delivery" + "Seniors’ discount" badges
 * - Refill form emails pharmacyonmarlee@gmail.com using FormSubmit
 *   (no patient confirmation is sent)
 * - Booking placeholder (MAPflow ready)
 * - Hours, Services, Contact, Google Map
 *
 * If you later want the booking widget live, set BOOKING_IFRAME_SRC below.
 */

// --- Easy-to-edit settings ---------------------------------------------------
const ADDRESS = "558 Marlee Ave, North York, Ontario";
const PHONE = "437-917-9282";
const FAX = "437-917-9288";
const BOOKING_IFRAME_SRC = ""; // paste your MAPflow EMBED url when ready
const FORM_EMAIL = "pharmacyonmarlee@gmail.com"; // refill destination
// -----------------------------------------------------------------------------

export default function PharmacyOnMarleeSite() {
  const [filter, setFilter] = useState("");
  const [showThanks, setShowThanks] = useState(false);

  // Show a small thank-you banner if redirected back after form submit
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash || "";
      if (hash.includes("refill-thanks")) {
        setShowThanks(true);
        // hide after 8s
        const t = setTimeout(() => setShowThanks(false), 8000);
        return () => clearTimeout(t);
      }
    }
  }, []);

  const minorAilments = useMemo(
    () => [
      "Allergic Rhinitis (Seasonal Allergies)",
      "Canker Sores / Oral Thrush",
      "Conjunctivitis (Pink eye)",
      "Dermatitis / Eczema",
      "Diaper Rash",
      "Dysmenorrhea (Menstrual Cramps)",
      "GERD / Heartburn",
      "Hemorrhoids",
      "Insect Bites & Stings",
      "Cold Sores (Oral HSV)",
      "Nausea & Vomiting in Pregnancy",
      "Musculoskeletal Pain",
      "Urinary Tract Infection (uncomplicated, women)",
      "Impetigo (minor skin infection)",
      "Tick Bites (assessment / prophylaxis eligibility)",
    ],
    []
  );

  const filteredAilments = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return minorAilments;
    return minorAilments.filter((x) => x.toLowerCase().includes(q));
  }, [filter, minorAilments]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-red-600">
              Pharmacy on Marlee
            </h1>
            <p className="text-xs text-slate-600">
              Minor Ailments • Vaccinations • Prescriptions
            </p>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:underline" href="#refill">Refill</a>
            <a className="hover:underline" href="#book">Book</a>
            <a className="hover:underline" href="#services">Services</a>
            <a className="hover:underline" href="#hours">Hours</a>
            <a className="hover:underline" href="#contact">Contact</a>
          </nav>
        </div>

        {/* transient thanks banner */}
        {showThanks && (
          <div className="bg-green-600 text-white text-sm text-center py-2">
            Thank you — your refill request was sent. We’ll call when it’s ready.
          </div>
        )}
      </header>

      {/* Hero (with licensed, free background image + badges) */}
      <section className="relative text-white">
        {/* Background image (Unsplash – free for commercial use).
            Optional: upload /public/hero.jpg and change to backgroundImage: "url('/hero.jpg')" */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1600&auto=format&fit=crop')",
          }}
          aria-hidden="true"
        />
        {/* Overlay tint for readability */}
        <div className="absolute inset-0 bg-blue-900/60" aria-hidden="true" />

        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="uppercase tracking-widest text-white/80 text-xs mb-2">
                North York · Ontario
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Fast, expert care for <span className="underline decoration-white/70">Minor Ailments</span>
              </h2>
              <p className="mt-3 text-white/90">
                Same-day assessments by our pharmacist. Walk-ins welcome or book online.
              </p>

              {/* Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-white/90 text-blue-900 px-3 py-1 text-xs font-semibold ring-1 ring-white/70">
                  Free delivery
                </span>
                <span className="inline-flex items-center rounded-full bg-white/90 text-blue-900 px-3 py-1 text-xs font-semibold ring-1 ring-white/70">
                  Seniors’ discount
                </span>
              </div>

              {/* Primary actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#refill"
                  className="px-5 py-3 font-semibold rounded-xl bg-white/10 ring-1 ring-white/60 hover:bg-white/20 transition"
                >
                  Request a Refill
                </a>
                <a
                  href="#book"
                  className="px-5 py-3 font-semibold rounded-xl ring-1 ring-white/60 hover:bg-white/10 transition"
                >
                  Book an Appointment
                </a>
                <a
                  href={`tel:${PHONE.replace(/[^0-9+]/g, "")}`}
                  className="px-5 py-3 font-semibold rounded-xl ring-1 ring-white/60 hover:bg-white/10 transition"
                >
                  Call {PHONE}
                </a>
              </div>
            </div>

            {/* Quick contact card on image */}
            <div className="rounded-2xl p-6 bg-white/10 ring-1 ring-white/30 backdrop-blur">
              <h3 className="font-semibold text-lg mb-2">Address</h3>
              <p className="text-white/90">{ADDRESS}</p>
              <h3 className="font-semibold text-lg mt-4 mb-2">Contact</h3>
              <p className="text-white/90">
                Tel: <a className="underline" href={`tel:${PHONE.replace(/[^0-9+]/g, "")}`}>{PHONE}</a><br />
                Fax: {FAX}
              </p>
              <p className="text-xs mt-4 text-white/80">
                We offer free delivery and a seniors’ discount. Ask us in-store.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Refill (simple form that emails the pharmacy) */}
      <section id="refill" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h3 className="text-2xl font-extrabold">Refill a Prescription</h3>
          <p className="text-sm text-slate-600 mt-2">
            Use this form to request a refill. We’ll call you when it’s ready. (No email confirmation is sent.)
          </p>

          <div className="mt-6 rounded-2xl border bg-white p-5">
            {/* Using FormSubmit to send an email to the pharmacy without a backend */}
            <form
              action={`https://formsubmit.co/${encodeURIComponent(FORM_EMAIL)}`}
              method="POST"
              className="grid md:grid-cols-2 gap-4"
            >
              {/* Required hidden fields */}
              <input type="hidden" name="_subject" value="New Refill Request - Pharmacy on Marlee" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              {/* Redirect back to site with a #refill-thanks hash to show a banner */}
              <input
                type="hidden"
                name="_next"
                value={`${typeof window !== "undefined" ? window.location.origin : ""}/#refill-thanks`}
              />

              <div>
                <label className="block text-sm font-semibold mb-1">Patient Full Name *</label>
                <input
                  name="Patient Name"
                  required
                  className="w-full rounded-lg border px-3 py-2"
                  placeholder="First and last name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Date of Birth *</label>
                <input
                  name="Date of Birth"
                  type="date"
                  required
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Phone Number *</label>
                <input
                  name="Phone"
                  required
                  className="w-full rounded-lg border px-3 py-2"
                  placeholder="e.g., 416-555-1234"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Pickup or Delivery *</label>
                <select name="Pickup or Delivery" required className="w-full rounded-lg border px-3 py-2">
                  <option value="Pickup">Pickup</option>
                  <option value="Delivery">Delivery (Free)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">Prescription(s) *</label>
                <textarea
                  name="Prescription(s)"
                  required
                  className="w-full rounded-lg border px-3 py-2"
                  placeholder="Rx number(s) or medication name(s)"
                  rows={3}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">Delivery Address (if applicable)</label>
                <input
                  name="Delivery Address"
                  className="w-full rounded-lg border px-3 py-2"
                  placeholder="Street, City, Postal Code"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">Notes (optional)</label>
                <textarea
                  name="Notes"
                  className="w-full rounded-lg border px-3 py-2"
                  placeholder="Anything else we should know?"
                  rows={2}
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-2 text-xs text-slate-600">
                <input id="consent" type="checkbox" name="Consent to Contact" className="h-4 w-4" />
                <label htmlFor="consent">
                  I consent to the pharmacy contacting me about this request.
                </label>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold ring-1 ring-blue-700/40 hover:bg-blue-700 transition"
                >
                  Submit Refill Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="bg-blue-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h3 className="text-2xl font-extrabold">Book an Appointment</h3>
          <p className="text-sm text-white/90 mt-2">
            Choose a minor ailment, pick a time, and we’ll confirm right away.
          </p>

          {BOOKING_IFRAME_SRC ? (
            <div className="mt-6 rounded-2xl overflow-hidden ring-2 ring-white/60">
              <iframe
                src={BOOKING_IFRAME_SRC}
                title="Booking"
                className="w-full h-[720px] bg-white"
              />
            </div>
          ) : (
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white text-slate-900 p-5">
                <p className="text-sm">
                  MAPflow embed not connected yet. Once you share your Mapflow link, we’ll drop it in so
                  patients can book directly here.
                </p>
                <p className="text-sm mt-3">
                  Until then: call{" "}
                  <a className="font-semibold text-blue-700" href={`tel:${PHONE.replace(/[^0-9+]/g, "")}`}>
                    {PHONE}
                  </a>{" "}
                  or visit us during business hours.
                </p>
              </div>

              <div className="rounded-2xl bg-white text-slate-900 p-5 overflow-auto">
                <label className="block text-sm font-semibold mb-2">Quick search: Minor Ailments</label>
                <input
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Type e.g. allergies, pink eye, UTI…"
                  className="w-full rounded-lg border px-3 py-2"
                />
                <ul className="mt-3 space-y-1 max-h-56 overflow-auto text-sm">
                  {filteredAilments.map((a) => (
                    <li key={a} className="px-2 py-1 rounded hover:bg-slate-100">{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h3 className="text-2xl font-extrabold">Our Services</h3>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ["Minor Ailments", "Assessment & prescribing for eligible conditions."],
              ["Vaccinations", "Flu, COVID-19, travel vaccines, and routine shots."],
              ["Prescription Transfers", "Bring your prescriptions to Pharmacy on Marlee."],
              ["MedsCheck", "Medication reviews, adherence, and education."],
              ["Blister Packs", "Convenient weekly compliance packaging."],
              ["Compounding (Level B)", "Select non-sterile compounds."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border p-5">
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm text-slate-600 mt-1">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours */}
      <section id="hours" className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h3 className="text-2xl font-extrabold">Business Hours</h3>
        <div className="mt-6 overflow-hidden rounded-2xl border bg-white">
            <table className="w-full text-left text-sm">
              <tbody>
                {Object.entries(BUSINESS_HOURS).map(([day, hours]) => (
                  <tr key={day} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium">{day}</td>
                    <td className="px-4 py-3 text-slate-700">{hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-2">Sundays hours are tentative; please call ahead.</p>
        </div>
      </section>

      {/* Contact + Map */}
      <section id="contact" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h3 className="text-2xl font-extrabold">Contact</h3>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border p-5">
              <h4 className="font-semibold">Pharmacy on Marlee</h4>
              <p className="mt-1 text-slate-700">{ADDRESS}</p>
              <p className="mt-2 text-slate-700">
                Tel:{" "}
                <a className="underline text-blue-700" href={`tel:${PHONE.replace(/[^0-9+]/g, "")}`}>
                  {PHONE}
                </a>{" "}
                · Fax: {FAX}
              </p>

              <div className="mt-4 flex gap-3">
                <a
                  href="tel:${PHONE}"
                  onClick={(e) => {
                    e.currentTarget.href = `tel:${PHONE.replace(/[^0-9+]/g, "")}`;
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold ring-1 ring-blue-700/40 hover:bg-blue-700 transition"
                >
                  Call now
                </a>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg ring-1 ring-slate-300 hover:bg-slate-50 transition"
                >
                  Get Directions
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200">
              <iframe
                title="Google Map"
                className="w-full h-[320px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  ADDRESS
                )}&output=embed`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-6">
          <div>
            <span className="font-semibold text-lg">Pharmacy on Marlee</span>
            <p className="text-sm text-slate-400 mt-2">
              {ADDRESS} • Tel {PHONE} • Fax {FAX}
            </p>
          </div>
          <div className="text-sm text-slate-400">
            <p>© {new Date().getFullYear()} Pharmacy on Marlee. All rights reserved.</p>
            <p className="mt-1">Minor ailments program available in Ontario. Eligibility applies.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
