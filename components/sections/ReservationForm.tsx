"use client";

import { useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "motion/react";
import { LanternCTA } from "@/components/primitives/LanternCTA";
import { EASE } from "@/lib/motion";

type Step = "when" | "who" | "where" | "confirm";

const STEPS: { key: Step; label: string; sub: string }[] = [
  { key: "when", label: "When", sub: "Choose a date and time" },
  { key: "who", label: "Who", sub: "How many guests" },
  { key: "where", label: "Where", sub: "Where in the hotel" },
  { key: "confirm", label: "Confirm", sub: "We reply within four hours" },
];

export function ReservationForm() {
  const [step, setStep] = useState<Step>("when");
  const [submitted, setSubmitted] = useState(false);
  const stepIndex = STEPS.findIndex((s) => s.key === step);

  const next = () => {
    if (stepIndex === STEPS.length - 1) {
      setSubmitted(true);
      return;
    }
    setStep(STEPS[stepIndex + 1].key);
  };
  const back = () => {
    if (stepIndex > 0) setStep(STEPS[stepIndex - 1].key);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [...EASE.parchment] }}
        className="rounded-[28px] border border-gold-rule bg-cream-warm p-10 md:p-14 text-center max-w-2xl mx-auto shadow-vanta"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember mb-6">
          Reservation logged
        </p>
        <h3 className="lede-roman text-[clamp(2rem,4vw,3.5rem)] text-ink-soft mb-6">
          The concierge will call within four hours.
        </h3>
        <p className="font-body text-[16px] text-ink-muted max-w-md mx-auto">
          No card taken. The booking holds only when our team confirms on the phone.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <ol className="flex items-center gap-2 mb-12">
        {STEPS.map((s, i) => (
          <li key={s.key} className="flex-1 flex items-center gap-2">
            <button
              type="button"
              onClick={() => i <= stepIndex && setStep(s.key)}
              disabled={i > stepIndex}
              className={clsx(
                "shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] transition-all duration-300 border",
                i === stepIndex && "bg-ember border-ember text-cream",
                i < stepIndex && "bg-gold/30 border-gold text-ink-soft cursor-pointer hover:bg-gold/55",
                i > stepIndex && "border-gold-hairline text-ink-muted"
              )}
              aria-current={i === stepIndex ? "step" : undefined}
            >
              {i < stepIndex ? "✓" : i + 1}
            </button>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted hidden md:block">
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <span className="flex-1 h-px bg-gold-hairline ml-2" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>

      <div className="rounded-[28px] border border-gold-rule bg-cream-warm p-8 md:p-12 min-h-[320px] shadow-warm">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5, ease: [...EASE.parchment] }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember mb-4">
              {STEPS[stepIndex].sub}
            </p>

            {step === "when" && <WhenStep />}
            {step === "who" && <WhoStep />}
            {step === "where" && <WhereStep />}
            {step === "confirm" && <ConfirmStep />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={back}
          disabled={stepIndex === 0}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted disabled:opacity-30 hover:text-ink-soft transition-colors"
        >
          ← Back
        </button>
        <LanternCTA onClick={next} label={stepIndex === STEPS.length - 1 ? "Send to concierge" : "Continue"} trailingArrow={stepIndex !== STEPS.length - 1} />
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full bg-cream border border-gold-rule rounded-2xl px-4 py-3 font-display-serif text-lg text-ink-soft placeholder:text-ink-faint focus:border-ember focus:outline-none transition-colors"
    />
  );
}

function WhenStep() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label="Arrival">
        <Input type="date" />
      </Field>
      <Field label="Departure">
        <Input type="date" />
      </Field>
    </div>
  );
}
function WhoStep() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label="Adults">
        <Input type="number" min={1} placeholder="2" />
      </Field>
      <Field label="Children">
        <Input type="number" min={0} placeholder="0" />
      </Field>
    </div>
  );
}
function WhereStep() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {["Top floor · Heritage Suite", "Pool-side · Executive Room", "Garden side · Deluxe Room", "Family wing · Family Suite"].map((p) => (
        <button
          key={p}
          type="button"
          className="rounded-2xl border border-gold-rule px-4 py-4 font-display-serif text-base text-ink-soft hover:border-ember hover:bg-gold/10 transition-colors text-left"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep mb-2">
            Position
          </p>
          {p}
        </button>
      ))}
    </div>
  );
}
function ConfirmStep() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label="Full name">
        <Input placeholder="As on your passport" />
      </Field>
      <Field label="Phone">
        <Input type="tel" placeholder="+91" />
      </Field>
      <div className="md:col-span-2">
        <Field label="Anything else we should know">
          <textarea
            rows={4}
            className="w-full bg-cream border border-gold-rule rounded-2xl px-4 py-3 font-body text-base text-ink-soft placeholder:text-ink-faint focus:border-ember focus:outline-none transition-colors resize-none"
            placeholder="Dietary notes, accessibility, arrival time..."
          />
        </Field>
      </div>
    </div>
  );
}
