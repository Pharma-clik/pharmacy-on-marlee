import React, { useMemo, useState } from "react";

// --- Editable settings -------------------------------------------------------
const ADDRESS = "558 Marlee Ave, North York, Ontario";
const PHONE = "437-917-9282";
const FAX = "437-917-9288";

// If you get a MAPflow EMBED link, paste it here (leave "" to keep the info card)
const BOOKING_IFRAME_SRC = "";

// Displayed business hours
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
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(null); // null | "ok" | "err"
  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    rxNumber: "",
    drugName: "",
    quantity: "",
    notes: "",
    delivery: "Pickup", // Pickup | Delivery
  });

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

  function update(k, v) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function submitRefill(e) {
    e.preventDefault();
    setSending(true);
    setSent(null);
    try {
      const r = await fetch("/api/refill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });
      if (!r.ok) throw new Error("Request failed");
      setSent("ok");
      setForm({
        fullName: "",
        dateOfBirth: "",
        phone: "",
        email: "",
        rxNumber: "",
        drugName: "",
        quantity: "",
        notes: "",
        delivery: "Pickup",
      });
    } catch (err) {
      setSent("err");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-red-700"> {/* title bigger + red */}
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

      {/* Hero with background + badges */}
      <section className="relative text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1600&auto=format&fit=crop')",
          }}
          aria-hidden="true"
        />
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
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-white/90 text-blue-900 px-3 py-1 text-xs font-semibold ring-1 ring-white/70">
                  Free delivery
                </span>
                <span className="inline-flex items-center rounded-full bg-white/90 text-blue-900 px-3 py-1 text-xs font-semibold ring-1 ring-white/70">
                  Seniors’ discount
                </span>
              </div>
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

            <div className="rounded-2xl p-6 bg-white/10 ring-1 ring-white/30 backdrop-blur">
              <h3 className="font-semibold text-lg mb-2">Address</h3>
              <p className="text-white/90">{ADDRESS}</p>
              <h3 className="font-semibold text-lg mt-4 mb-2">Contact</h3>
              <p className="text-white/90">
                Tel: <a className="underline" href={`tel:${PHONE.replace(/[^0-9+]/g, "")}`}>{PHONE}</a><br />
                Fax: {FAX}
              </p>
              <p className="text-xs mt-4 text-white/80">We offer free delivery and a seniors’ discount.</p>
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
                  MAPflow embed not connected yet. Once you share your MAPflow link, we’ll add it here so
                  patients can book directly on this page.
                </p>
                <p className="text-sm mt-3">
                  Until then: call{" "}
                  <a className="font-semibold text-blue-700" href={`tel:${PHONE.replace(/[^0-9+]/g, "")}`}>
                    {PHONE}
                  </a>{" "}
                  or visit us during business hours.
                </p>
              </div>

              <MinorAilmentsQuickList filter={filter} setFilter={setFilter} items={minorAilments} />
            </div>
          )}
        </div>
      </section>

      {/* Refill */}
      <section id="refill" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h3 className="text-2xl font-extrabold">Prescription Refill</h3>
          <p className="text-sm text-slate-600 mt-2">
            Submit a refill request and we’ll confirm by phone/email. For urgent needs, please call {PHONE}.
          </p>

          <form onSubmit={submitRefill} className="mt-6 grid gap-4 md:grid-cols-2">
            <TextInput label="Full Name" value={form.fullName} onChange={(v) => update("fullName", v)} required />
            <TextInput label="Date of Birth (YYYY-MM-DD)" value={form.dateOfBirth} onChange={(v) => update("dateOfBirth", v)} required />
            <TextInput label="Phone" value={form.phone} onChange={(v) => update("phone", v)} required />
            <TextInput label="Email (optional)" value={form.email} onChange={(v) => update("email", v)} type="email" />
            <TextInput label="Prescription / Rx Number (if known)" value={form.rxNumber} onChange={(v) => update("rxNumber", v)} />
            <TextInput label="Drug Name / Strength" value={form.drugName} onChange={(v) => update("drugName", v)} required />
            <TextInput label="Quantity (optional)" value={form.quantity} onChange={(v) => update("quantity", v)} />
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">Pickup or Delivery</label>
              <select
                className="w-full rounded-lg border px-3 py-2"
                value={form.delivery}
                onChange={(e) => update("delivery", e.target.value)}
              >
                <option>Pickup</option>
                <option>Delivery (Free)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">Notes (allergies, changes, insurance, etc.)</label>
              <textarea
                className="w-full rounded-lg border px-3 py-2 min-h-[100px]"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Anything else we should know?"
              />
            </div>

            <div className="md:col-span-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={sending}
                className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold ring-1 ring-blue-700/40 hover:bg-blue-700 transition disabled:opacity-60"
              >
                {sending ? "Sending…" : "Submit Refill Request"}
              </button>
              {sent === "ok" && <span className="text-green-700 text-sm">Sent! We’ll contact you soon.</span>}
              {sent === "err" && <span className="text-red-700 text-sm">Could not send. Please call {PHONE}.</span>}
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
          <p className="text-xs text-slate-500 mt-2">Sunday hours are tentative; please call ahead.</p>
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
                  onClick={(e) => { e.currentTarget.href = `tel:${PHONE.replace(/[^0-9+]/g, "")}`; }}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold ring-1 ring-blue-700/40 hover:bg-blue-700 transition"
                >
                  Call now
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
                  target="_blank" rel="noreferrer"
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
                src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
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

// --- small components --------------------------------------------------------
function TextInput({ label, value, onChange, required, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        className="w-full rounded-lg border px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}

function MinorAilmentsQuickList({ filter, setFilter, items }) {
  return (
    <div className="rounded-2xl bg-white text-slate-900 p-5 overflow-auto">
      <label className="block text-sm font-semibold mb-2">Quick search: Minor Ailments</label>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Type e.g. allergies, pink eye, UTI…"
        className="w-full rounded-lg border px-3 py-2"
      />
      <ul className="mt-3 space-y-1 max-h-56 overflow-auto text-sm">
        {items.map((a) => (
          <li key={a} className="px-2 py-1 rounded hover:bg-slate-100">{a}</li>
        ))}
      </ul>
    </div>
  );
}
