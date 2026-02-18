"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

const steps = [
  { label: "Type", title: "What type of solar system do you need?" },
  { label: "Details", title: "Tell us about your property" },
  { label: "Energy", title: "Your energy consumption" },
  { label: "Contact", title: "How can we reach you?" },
];

const propertyTypes = [
  { value: "residential", label: "Residential", icon: "🏠", description: "Home or apartment building" },
  { value: "commercial", label: "Commercial", icon: "🏢", description: "Office, mall, or retail" },
  { value: "industrial", label: "Industrial", icon: "🏭", description: "Factory or warehouse" },
  { value: "agricultural", label: "Agricultural", icon: "🌾", description: "Farm or agri-business" },
];

const roofTypes = [
  { value: "rcc", label: "RCC / Flat Roof" },
  { value: "metal", label: "Metal Sheet" },
  { value: "tiles", label: "Tile Roof" },
  { value: "ground", label: "Ground Mount" },
  { value: "unsure", label: "Not Sure" },
];

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    propertyType: "",
    roofType: "",
    roofArea: "",
    floors: "",
    monthlyBill: "",
    currentSource: "",
    backupNeeded: false,
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.propertyType !== "";
      case 1: return formData.roofType !== "";
      case 2: return formData.monthlyBill !== "";
      case 3: return formData.name !== "" && formData.email !== "" && formData.phone !== "";
      default: return false;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto px-6 text-center"
        >
          {/* Success animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-amber/10 flex items-center justify-center mx-auto mb-8 glow-amber-strong"
          >
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F7A600"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <motion.polyline points="22 4 12 14.01 9 11.01" />
            </motion.svg>
          </motion.div>

          <h2 className="font-display font-bold text-3xl text-foreground mb-4">
            Quote Request Submitted!
          </h2>
          <p className="text-text-secondary text-lg mb-3">
            Thank you, {formData.name}! Our solar consultant will contact you within 24 hours
            with a customized proposal.
          </p>
          <p className="text-text-muted text-sm mb-8">
            We&apos;ll send a confirmation email to {formData.email}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/">Back to Home</Button>
            <Button href="/calculator" variant="outline">
              Try Calculator
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      {/* Progress */}
      <section className="max-w-3xl mx-auto px-6 mb-12">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <motion.div
                animate={{
                  backgroundColor: i <= currentStep ? "#F7A600" : "#1E1E1E",
                  scale: i === currentStep ? 1.1 : 1,
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm transition-all duration-300"
                style={{ color: i <= currentStep ? "#050505" : "#555555" }}
              >
                {i < currentStep ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  i + 1
                )}
              </motion.div>
              {i < steps.length - 1 && (
                <div className="w-12 sm:w-24 h-px mx-2">
                  <motion.div
                    animate={{ backgroundColor: i < currentStep ? "#F7A600" : "#1E1E1E" }}
                    className="h-full transition-all duration-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {steps.map((step, i) => (
            <span
              key={step.label}
              className={`text-xs font-display ${
                i <= currentStep ? "text-amber" : "text-text-muted"
              }`}
            >
              {step.label}
            </span>
          ))}
        </div>
      </section>

      {/* Form Content */}
      <section className="max-w-3xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8">
              {steps[currentStep].title}
            </h2>

            {/* Step 0: Property Type */}
            {currentStep === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {propertyTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => update("propertyType", type.value)}
                    className={`p-6 rounded-2xl border text-left transition-all duration-300 ${
                      formData.propertyType === type.value
                        ? "border-amber bg-amber/5 glow-amber"
                        : "border-border bg-elevated hover:border-amber/30"
                    }`}
                  >
                    <span className="text-3xl mb-3 block">{type.icon}</span>
                    <h3 className="font-display font-semibold text-foreground mb-1">{type.label}</h3>
                    <p className="text-text-secondary text-sm">{type.description}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Step 1: Property Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="text-text-secondary text-sm block mb-3">Roof Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {roofTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => update("roofType", type.value)}
                        className={`p-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                          formData.roofType === type.value
                            ? "bg-amber text-background"
                            : "bg-elevated border border-border text-text-secondary hover:border-amber/30"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-text-secondary text-sm block mb-2">
                      Available Roof Area (sq ft)
                    </label>
                    <input
                      type="number"
                      value={formData.roofArea}
                      onChange={(e) => update("roofArea", e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-background border border-border text-foreground text-sm focus:border-amber/50 focus:outline-none transition-colors placeholder:text-text-muted"
                      placeholder="e.g., 500"
                    />
                  </div>
                  <div>
                    <label className="text-text-secondary text-sm block mb-2">Number of Floors</label>
                    <select
                      value={formData.floors}
                      onChange={(e) => update("floors", e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-background border border-border text-foreground text-sm focus:border-amber/50 focus:outline-none transition-colors"
                    >
                      <option value="">Select</option>
                      <option value="1">1 Floor</option>
                      <option value="2">2 Floors</option>
                      <option value="3">3 Floors</option>
                      <option value="4">4+ Floors</option>
                      <option value="ground">Ground Mount</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Energy */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="text-text-secondary text-sm block mb-2">
                    Monthly Electricity Bill (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyBill}
                    onChange={(e) => update("monthlyBill", e.target.value)}
                    className="w-full p-4 rounded-xl bg-background border border-border text-foreground text-lg font-display focus:border-amber/50 focus:outline-none transition-colors placeholder:text-text-muted"
                    placeholder="e.g., 5000"
                  />
                </div>

                <div>
                  <label className="text-text-secondary text-sm block mb-3">
                    Current Electricity Source
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Grid Only", "Diesel + Grid", "Off-Grid"].map((source) => (
                      <button
                        key={source}
                        onClick={() => update("currentSource", source)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          formData.currentSource === source
                            ? "bg-amber text-background"
                            : "bg-elevated border border-border text-text-secondary hover:border-amber/30"
                        }`}
                      >
                        {source}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                        formData.backupNeeded
                          ? "bg-amber border-amber"
                          : "border-border group-hover:border-amber/50"
                      }`}
                      onClick={() => update("backupNeeded", !formData.backupNeeded)}
                    >
                      {formData.backupNeeded && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#050505" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span className="text-text-secondary text-sm">
                      I need battery backup for power outages
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-text-secondary text-sm block mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-background border border-border text-foreground text-sm focus:border-amber/50 focus:outline-none transition-colors placeholder:text-text-muted"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="text-text-secondary text-sm block mb-2">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-background border border-border text-foreground text-sm focus:border-amber/50 focus:outline-none transition-colors placeholder:text-text-muted"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-text-secondary text-sm block mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-background border border-border text-foreground text-sm focus:border-amber/50 focus:outline-none transition-colors placeholder:text-text-muted"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-text-secondary text-sm block mb-2">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => update("city", e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-background border border-border text-foreground text-sm focus:border-amber/50 focus:outline-none transition-colors placeholder:text-text-muted"
                      placeholder="Your city"
                    />
                  </div>
                  <div>
                    <label className="text-text-secondary text-sm block mb-2">State</label>
                    <select
                      value={formData.state}
                      onChange={(e) => update("state", e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-background border border-border text-foreground text-sm focus:border-amber/50 focus:outline-none transition-colors"
                    >
                      <option value="">Select State</option>
                      {["Rajasthan", "Gujarat", "Maharashtra", "Karnataka", "Tamil Nadu", "Telangana", "Delhi", "Uttar Pradesh", "Madhya Pradesh", "Other"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-text-secondary text-sm block mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-background border border-border text-foreground text-sm focus:border-amber/50 focus:outline-none transition-colors resize-none placeholder:text-text-muted"
                    placeholder="Any specific requirements or questions..."
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            className={`flex items-center gap-2 text-text-secondary hover:text-foreground transition-colors font-display font-medium ${
              currentStep === 0 ? "invisible" : ""
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5m7 7-7-7 7-7" />
            </svg>
            Back
          </button>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              disabled={!canProceed()}
            >
              Continue
              <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
            >
              Submit Quote Request
              <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
