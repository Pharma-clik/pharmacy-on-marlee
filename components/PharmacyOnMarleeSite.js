import React, { useMemo, useState } from "react";

/**
 * Pharmacy on Marlee – Single-file site component
 * - Title in red (slightly larger)
 * - Hero with licensed free image (Unsplash)
 * - Badges: Free delivery + Seniors’ discount
 * - Booking (Mapflow-ready)
 * - SIMPLE Refill form (emails to pharmacyonmarlee@gmail.com via FormSubmit)
 * - Hours, Services, Contact + Map
 *
 * To enable live booking: set BOOKING_IFRAME_SRC to your Mapflow embed URL.
 */

// --- Easy-to-edit settings ---------------------------------------------------
const ADDRESS = "558 Marlee Ave, North York, Ontario";
const PHONE = "437-917-9282";
const FAX = "437-917-9288";

// If you get a MAPflow EMBED link, paste it here (keep "" to show the call/visit card)
const BOOKING_IFRAME_SRC = "";

// Business hours (displayed in the Hours section)
const BUSINESS_HOURS = {
  Monday: "9:00 AM – 6:00 PM",
  Tuesday: "9:00 AM – 6:00 PM",
  Wednesday: "9:00 AM – 6:00 PM",
  Thursday: "9:00 AM – 6:00 PM",
  Friday: "9:00 AM – 6:00 PM",
  Saturday: "10:00 AM – 2:00 PM",
  Sunday: "10:00 AM – 2:00 PM (tentative)",
};
// -----------------------------------------------------------------------------

export default function PharmacyOnMarleeSite() {
  const [filter, setFilter] = useState("");

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
            {/* Title: slightly larger + red */}
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-red-600">
              Pharmacy on Marlee
            </h1>
            <p className="text-xs text-slate-600">
              Minor Ailments • Vaccinations • Prescriptions
            </p>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:underline" href="#book">Book</a>
            <a className="hover:underline" href="#refill">Refill</a>
            <a className="hover:underline" href="#services">Services</a>
            <a className="hover:underline" href="#hours">Hours</a>
            <a className="hover:underline" href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero with background image + badges */}
      <section className="relative text-white">
        {/* Background image (Unsplash – free for commercial use). 
            Optional: upload /public/hero.jpg and use backgroundImage: "url('/hero.jpg')" */}
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
                  href="#book"
                  className="px-5 py-3 font-semibold rounded-xl bg-white/10 ring-1 ring-white/60 hover:bg-white/20 transition"
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
                  MAPflow embed not connected yet. Once you share your MAPflow link, we’ll drop it in so
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

      {/* Refill (simplified form to email the pharmacy) */}
      <section id="refill" className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h3 className="text-2xl font-extrabold">Refill Prescriptions</h3>
          <p className="text-sm text-slate-600 mt-2">
            Submit your refill request below. We’ll call you when it’s ready. (No automatic patient emails.)
          </p>

          <div className="mt-6 rounded-2xl bg-white border p-5">
            <form
              action="https://formsubmit.co/pharmacyonmarlee@gmail.com"
              method="POST"
              className="grid md:grid-cols-2 gap-4"
            >
              {/* FormSubmit settings */}
              <input type="hidden" name="_subject" value="Refill Request - Pharmacy on Marlee" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              {/* Redirect back to homepage after submit */}
              <input type="hidden" name="_next" value="https://pharmacy-on-marlee.vercel.app/?refill=sent" />
              {/* Honeypot (spam trap) */}
              <input type="text" name="_honey" className="hidden" aria-hidden="true" />

              <div>
                <label className="block text-sm font-semibold mb-1">Full Name</label>
                <input name="Patient Name" required className="w-full rounded-lg border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Date of Birth (YYYY-MM-DD)</label>
                <input name="Date of Birth" placeholder="2000-01-31" required className="w-full rounded-lg border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Phone Number</label>
                <input name="Phone" required className="w-full rounded-lg border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Refill Details (Rx # / Medication)</label>
                <textarea name="Refill Details" rows={3} required className="w-full rounded-lg border px-3 py-2" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">Notes (optional)</label>
                <textarea name="Notes" rows={2} className="w-full rounded-lg border px-3 py-2" />
              </div>

              <div className="md:col-span-2 flex flex-wrap items-center gap-4">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="radio" name="Pickup/Delivery" value="Pickup" defaultChecked />
                  <span>Pickup</span>
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="radio" name="Pickup/Delivery" value="Delivery" />
                  <span>Delivery</span>
                </label>
                <span className="text-xs text-slate-500">We offer free delivery.</span>
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
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg ring-1 ring-slate-300 hover:bg-slate-50 transition"
                >
                  Open in Google Maps
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
