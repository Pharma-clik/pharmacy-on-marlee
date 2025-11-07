import React, { useMemo, useState } from "react";

/**
 * Pharmacy on Marlee – single-file website
 * - Red/blue/white colour theme
 * - Editable business hours
 * - “Book now” area with optional MAPflow iframe
 * - Contact + map, services, footer
 *
 * To update hours: change BUSINESS_HOURS below.
 * To enable booking: paste your MAPflow iframe URL into BOOKING_IFRAME_SRC.
 
const BOOKING_IFRAME_SRC = ""; // e.g. "https://mapflow.app/embed/your-widget" (leave "" for now)

// Easy to edit business hours
const BUSINESS_HOURS = {
  Monday: "9:00 AM – 6:00 PM",
  Tuesday: "9:00 AM – 6:00 PM",
  Wednesday: "9:00 AM – 6:00 PM",
  Thursday: "9:00 AM – 6:00 PM",
  Friday: "9:00 AM – 6:00 PM",
  Saturday: "10:00 AM – 2:00 PM",
  Sunday: "10:00 AM – 2:00 PM (tentative)",
};

const ADDRESS = "558 Marlee Ave, North York, Ontario";
const PHONE = "437-917-9282";
const FAX = "437-917-9288";

export default function PharmacyOnMarleeSite() {
  const [filter, setFilter] = useState("");

  const minorAilments = useMemo(
    () => [
      "Allergic Rhinitis (Seasonal Allergies)",
      "Canker Sores / Oral Thrush",
      "Conjunctivitis (Pink Eye)",
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
          

              alt="Pharmacy on Marlee"
              className="h-10 w-10 rounded-lg object-cover ring-1 ring-slate-200"
            />
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                Pharmacy on Marlee
              </h1>
              <p className="text-xs text-slate-600">
                Minor Ailments • Vaccinations • Prescriptions
              </p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:underline" href="#book">Book</a>
            <a className="hover:underline" href="#services">Services</a>
            <a className="hover:underline" href="#hours">Hours</a>
            <a className="hover:underline" href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[rgb(214,54,44)] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="uppercase tracking-widest text-white/80 text-xs mb-2">
                North York • Ontario
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Fast, expert care for <span className="underline decoration-white/70">Minor Ailments</span>
              </h2>
              <p className="mt-3 text-white/90">
                Same-day assessments by our pharmacist. Walk-ins welcome or book online in seconds.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#book"
                  className="px-5 py-3 font-semibold rounded-xl bg-white text-[rgb(214,54,44)] hover:bg-white/90 transition"
                >
                  Book an Assessment
                </a>
                <a
                  href="tel:4379179282"
                  className="px-5 py-3 font-semibold rounded-xl ring-1 ring-white/60 hover:bg-white/10 transition"
                >
                  Call {PHONE}
                </a>
              </div>
            </div>
            <div className="rounded-2xl p-6 bg-white/10 ring-1 ring-white/30">
              <h3 className="font-semibold text-lg mb-2">Address</h3>
              <p className="text-white/90">{ADDRESS}</p>
              <h3 className="font-semibold text-lg mt-4 mb-2">Contact</h3>
              <p className="text-white/90">
                Tel: <a className="underline" href={`tel:${PHONE}`}>{PHONE}</a><br/>
                Fax: {FAX}
              </p>
              <p className="text-xs mt-4 text-white/80">
                Colours: red • blue • white — matching your brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="bg-blue-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h3 className="text-2xl font-extrabold">Book an Appointment</h3>
          <p className="mt-2 text-white/90">
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
                <p className="text-sm text-slate-600">
                  MAPflow embed not connected yet. Once you share your MAPflow
                  link, I’ll drop it in so patients can book directly here.
                </p>
                <p className="text-sm mt-3">
                  Until then: call{" "}
                  <a className="font-semibold text-blue-700" href={`tel:${PHONE}`}>
                    {PHONE}
                  </a>{" "}
                  or visit us during business hours.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 text-slate-900">
                <label className="block text-sm font-semibold mb-2">
                  Quick search: Minor Ailments
                </label>
                <input
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Type e.g. allergies, pink eye, UTI..."
                  className="w-full rounded-lg border px-3 py-2"
                />
                <ul className="mt-3 space-y-1 max-h-56 overflow-auto text-sm">
                  {filteredAilments.map((a) => (
                    <li key={a} className="px-2 py-1 rounded hover:bg-slate-100">
                      {a}
                    </li>
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
          <p className="text-xs text-slate-500 mt-2">
            Sunday hours are tentative; please call ahead.
          </p>
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
                Tel: <a className="text-blue-700 font-semibold" href={`tel:${PHONE}`}>{PHONE}</a><br />
                Fax: {FAX}
              </p>
              <div className="mt-4 flex gap-3">
                <a href="#book" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold">
                  Book now
                </a>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
                   target="_blank" rel="noreferrer"
                   className="px-4 py-2 rounded-lg ring-1 ring-slate-300 font-semibold">
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
    <div className="flex items-center gap-2">
      <span className="font-semibold">Pharmacy on Marlee</span>
    </div>

    <div className="text-sm">
      <p>{ADDRESS} • Tel {PHONE} • Fax {FAX}</p>
      <p className="text-slate-400 mt-1">
        © {new Date().getFullYear()} Pharmacy on Marlee. All rights reserved.
      </p>
      <p className="text-slate-400 mt-1">
        Minor ailments program available in Ontario. Eligibility applies.
      </p>
    </div>
  </div>
</footer>

    </div>
  );
}
