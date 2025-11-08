import React, { useMemo, useState } from "react";

/**
 * Pharmacy on Marlee — single-file website
 * - Red/blue/white colour theme
 * - Editable business hours (BUSINESS_HOURS)
 * - MAPflow iframe placeholder (BOOKING_IFRAME_SRC)
 * - Refill form that emails pharmacyonmarlee@gmail.com via FormSubmit
 */

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
            <h1 className="text-xl font-extrabold tracking-tight">
              <span className="text-red-600">Pharmacy on Marlee</span>
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

      {/* Hero */}
      <section
        className="text-white"
        style={{
          backgroundImage: "linear-gradient(rgba(15,23,42,.85), rgba(15,23,42,.85)), url('/pharm.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-6">
          <div>
            <p className="uppercase tracking-widest text-white/80 text-xs mb-2">
              North York • Ontario
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Fast, expert care for <span className="underline decoration-white/70">Minor Ailments</span>
            </h2>
            <p className="mt-3 text-white/90">
              Same-day assessments by our pharmacist. Walk-ins welcome or book online.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm ring-1 ring-white/20">
                Free delivery
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm ring-1 ring-white/20">
                Seniors’ discount
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#book"
                className="px-5 py-3 font-semibold rounded-xl bg-white text-slate-900 ring-1 ring-white/60 hover:bg-white/90 transition"
              >
                Book an Appointment
              </a>
              <a
                href={`tel:${PHONE.replace(/[^0-9+]/g, "")}`}
                className="px-5 py-3 font-semibold rounded-xl ring-1 ring-white/50 hover:bg-white/10 transition"
              >
                Call {PHONE}
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 ring-1 ring-white/20 p-5">
            <h3 className="font-semibold text-white/90">Address</h3>
            <p className="text-sm text-white/80">{ADDRESS}</p>
            <h3 className="mt-4 font-semibold text-white/90">Contact</h3>
            <p className="text-sm text-white/80">
              Tel: <a className="underline" href={`tel:${PHONE.replace(/[^0-9+]/g, "")}`}>{PHONE}</a><br />
              Fax: {FAX}
            </p>
            <p className="mt-3 text-xs text-white/70">
              We offer free delivery and a seniors’ discount. Ask us in-store.
            </p>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="bg-blue-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h3 className="text-2xl font-extrabold">Book an Appointment</h3>
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
                  MAPflow embed not connected yet. Once you share your MAPflow link,
                  I’ll drop it in so patients can book directly here.
                </p>
                <p className="text-sm mt-3">
                  Until then: call <a className="font-semibold text-blue-700 underline" href={`tel:${PHONE.replace(/[^0-9+]/g, "")}`}>{PHONE}</a> or visit us during business hours.
                </p>
              </div>
              <div className="rounded-2xl bg-white text-slate-900 p-5">
                <label className="block text-sm font-semibold mb-2">Quick search: Minor Ailments</label>
                <input
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Type e.g. allergies, pink eye, UTI..."
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

      {/* Refill */}
      <section id="refill" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h3 className="text-2xl font-extrabold">Refill a Prescription</h3>
          <p className="text-slate-600 mt-1">
            Send us your refill request and we’ll contact you when it’s ready. No automatic
            patient email is sent.
          </p>

          <form
            className="mt-6 grid md:grid-cols-2 gap-6"
            method="POST"
            action="https://formsubmit.co/pharmacyonmarlee@gmail.com"
          >
            {/* FormSubmit config */}
            <input type="hidden" name="_captcha" value="false" />
            {/* Optional redirect after submit:
            <input type="hidden" name="_next" value="https://pharmacy-on-marlee.vercel.app/#refill" />
            */}

            <div className="rounded-2xl border p-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium">Full name*</span>
                  <input name="Name" required className="mt-1 w-full rounded-lg border px-3 py-2" />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Date of birth*</span>
                  <input name="DOB" type="date" required className="mt-1 w-full rounded-lg border px-3 py-2" />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Phone*</span>
                  <input name="Phone" required className="mt-1 w-full rounded-lg border px-3 py-2" />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Email (optional)</span>
                  <input name="Email" type="email" className="mt-1 w-full rounded-lg border px-3 py-2" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium">Address (for delivery)</span>
                  <input name="Address" className="mt-1 w-full rounded-lg border px-3 py-2" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium">Insurance / ODB # (optional)</span>
                  <input name="Insurance" className="mt-1 w-full rounded-lg border px-3 py-2" />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border p-5">
              <div className="grid gap-4">
                <label className="block">
                  <span className="text-sm font-medium">Prescription / Rx # or Medication name*</span>
                  <input name="Prescription" required className="mt-1 w-full rounded-lg border px-3 py-2" />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Doctor (optional)</span>
                  <input name="Doctor" className="mt-1 w-full rounded-lg border px-3 py-2" />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Notes to pharmacist</span>
                  <textarea name="Notes" rows={4} className="mt-1 w-full rounded-lg border px-3 py-2" />
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="Pickup_or_Delivery" value="Pickup" defaultChecked />
                    Pickup
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="Pickup_or_Delivery" value="Delivery" />
                    Delivery
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full sm:w-auto px-5 py-3 font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                >
                  Submit Refill Request
                </button>

                <p className="text-xs text-slate-500">
                  By submitting, you consent to us contacting you about this request.
                </p>
              </div>
            </div>
          </form>
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
                Tel: <a className="text-blue-700 font-semibold underline" href={`tel:${PHONE.replace(/[^0-9+]/g, "")}`}>{PHONE}</a><br />
                Fax: {FAX}
              </p>
              <div className="mt-4 flex gap-3">
                <a href="#book" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Book now</a>
                <a href="#refill" className="px-4 py-2 rounded-lg ring-1 ring-slate-300 hover:bg-slate-50">Refill</a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200">
              <iframe
                title="Google Map"
                className="w-full h-[320px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
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
          </div>
        </div>
        <div className="px-4 pb-8 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Pharmacy on Marlee. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
