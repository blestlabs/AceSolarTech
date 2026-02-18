"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

export default function CalculatorPage() {
  const [monthlyBill, setMonthlyBill] = useState(5000);
  const [roofArea, setRoofArea] = useState(500);
  const [electricity, setElectricity] = useState("grid");
  const [state, setState] = useState("rajasthan");

  const stateMultipliers: Record<string, number> = {
    rajasthan: 5.5,
    gujarat: 5.3,
    maharashtra: 4.8,
    karnataka: 5.0,
    tamilnadu: 5.2,
    telangana: 5.1,
    delhi: 4.5,
    up: 4.6,
    mp: 5.0,
    other: 4.7,
  };

  const results = useMemo(() => {
    const sunHours = stateMultipliers[state] || 4.7;
    const costPerUnit = electricity === "grid" ? 8 : electricity === "diesel" ? 18 : 10;
    const monthlyUnits = monthlyBill / costPerUnit;
    const dailyUnits = monthlyUnits / 30;
    const systemSizeKW = Math.ceil(dailyUnits / sunHours * 1.2);
    const clampedSize = Math.min(systemSizeKW, Math.floor(roofArea / 60));
    const finalSize = Math.max(clampedSize, 1);

    const systemCost = finalSize * 55000;
    const subsidyPercent = finalSize <= 3 ? 0.4 : finalSize <= 10 ? 0.2 : 0;
    const subsidyAmount = systemCost * subsidyPercent;
    const netCost = systemCost - subsidyAmount;

    const annualGeneration = finalSize * sunHours * 365 * 0.85;
    const annualSavings = annualGeneration * costPerUnit;
    const monthlySavings = annualSavings / 12;
    const paybackYears = netCost / annualSavings;

    const co2Saved = annualGeneration * 0.82;
    const treesEquivalent = Math.round(co2Saved / 21);
    const lifetimeSavings = annualSavings * 25;

    return {
      systemSize: finalSize,
      systemCost,
      subsidyAmount,
      netCost,
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      paybackYears: Math.round(paybackYears * 10) / 10,
      co2Saved: Math.round(co2Saved),
      treesEquivalent,
      lifetimeSavings: Math.round(lifetimeSavings),
      annualGeneration: Math.round(annualGeneration),
    };
  }, [monthlyBill, roofArea, electricity, state]);

  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-amber/5 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 text-xs font-display font-medium tracking-[0.2em] uppercase text-amber border border-amber/20 rounded-full bg-amber/5 mb-6"
          >
            Solar Calculator
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl gradient-text mb-6"
          >
            Calculate Your Savings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            See how much you can save by switching to solar. Adjust the sliders
            below for a personalized estimate.
          </motion.p>
        </div>
      </section>

      {/* Calculator */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="p-8 rounded-2xl bg-elevated border border-border">
              <h3 className="font-display font-semibold text-lg text-foreground mb-6">
                Your Details
              </h3>

              {/* Monthly Bill */}
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <label className="text-text-secondary text-sm">Monthly Electricity Bill</label>
                  <span className="font-display font-bold text-amber">₹{monthlyBill.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={100000}
                  step={500}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-2 rounded-full bg-border appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(247,166,0,0.5)] [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-text-muted text-xs mt-1">
                  <span>₹500</span>
                  <span>₹1,00,000</span>
                </div>
              </div>

              {/* Roof Area */}
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <label className="text-text-secondary text-sm">Available Roof Area</label>
                  <span className="font-display font-bold text-amber">{roofArea} sq ft</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={10000}
                  step={50}
                  value={roofArea}
                  onChange={(e) => setRoofArea(Number(e.target.value))}
                  className="w-full h-2 rounded-full bg-border appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(247,166,0,0.5)] [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-text-muted text-xs mt-1">
                  <span>100 sq ft</span>
                  <span>10,000 sq ft</span>
                </div>
              </div>

              {/* Electricity Source */}
              <div className="mb-8">
                <label className="text-text-secondary text-sm block mb-3">Primary Electricity Source</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "grid", label: "Grid" },
                    { value: "diesel", label: "Diesel" },
                    { value: "mixed", label: "Mixed" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setElectricity(opt.value)}
                      className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                        electricity === opt.value
                          ? "bg-amber text-background"
                          : "bg-background border border-border text-text-secondary hover:border-amber/30"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* State */}
              <div>
                <label className="text-text-secondary text-sm block mb-3">Your State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-3 rounded-xl bg-background border border-border text-foreground text-sm focus:border-amber/50 focus:outline-none transition-colors"
                >
                  <option value="rajasthan">Rajasthan</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="tamilnadu">Tamil Nadu</option>
                  <option value="telangana">Telangana</option>
                  <option value="delhi">Delhi NCR</option>
                  <option value="up">Uttar Pradesh</option>
                  <option value="mp">Madhya Pradesh</option>
                  <option value="other">Other State</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${monthlyBill}-${roofArea}-${electricity}-${state}`}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* System Size */}
                <div className="p-8 rounded-2xl bg-elevated border border-amber/20 glow-amber">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text-secondary text-sm">Recommended System Size</span>
                    <span className="px-3 py-1 rounded-full bg-amber/10 text-amber text-xs font-display font-medium">
                      Optimal
                    </span>
                  </div>
                  <div className="font-display font-bold text-5xl md:text-6xl gradient-text mb-1">
                    {results.systemSize} kW
                  </div>
                  <div className="text-text-muted text-sm">
                    Generating ~{results.annualGeneration.toLocaleString()} kWh/year
                  </div>
                </div>

                {/* Key metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-elevated border border-border">
                    <div className="text-text-secondary text-sm mb-1">Monthly Savings</div>
                    <div className="font-display font-bold text-2xl text-foreground">
                      ₹{results.monthlySavings.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-elevated border border-border">
                    <div className="text-text-secondary text-sm mb-1">Payback Period</div>
                    <div className="font-display font-bold text-2xl text-foreground">
                      {results.paybackYears} years
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-elevated border border-border">
                    <div className="text-text-secondary text-sm mb-1">System Cost</div>
                    <div className="font-display font-bold text-xl text-foreground">
                      ₹{results.systemCost.toLocaleString()}
                    </div>
                    {results.subsidyAmount > 0 && (
                      <div className="text-amber text-xs mt-0.5">
                        -₹{results.subsidyAmount.toLocaleString()} subsidy
                      </div>
                    )}
                  </div>
                  <div className="p-6 rounded-2xl bg-elevated border border-border">
                    <div className="text-text-secondary text-sm mb-1">Net Investment</div>
                    <div className="font-display font-bold text-xl text-amber">
                      ₹{results.netCost.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* 25-year outlook */}
                <div className="p-8 rounded-2xl bg-elevated border border-border">
                  <h4 className="font-display font-semibold text-foreground mb-4">25-Year Outlook</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-xl bg-background/50">
                      <div className="font-display font-bold text-2xl gradient-text">
                        ₹{(results.lifetimeSavings / 100000).toFixed(1)}L
                      </div>
                      <div className="text-text-muted text-xs mt-1">Total Savings</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-background/50">
                      <div className="font-display font-bold text-2xl gradient-text">
                        {(results.co2Saved * 25 / 1000).toFixed(0)}T
                      </div>
                      <div className="text-text-muted text-xs mt-1">CO₂ Prevented</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-background/50">
                      <div className="font-display font-bold text-2xl gradient-text">
                        {results.treesEquivalent * 25}
                      </div>
                      <div className="text-text-muted text-xs mt-1">Trees Equivalent</div>
                    </div>
                  </div>
                </div>

                {/* Savings visualization bar */}
                <div className="p-6 rounded-2xl bg-elevated border border-border">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-text-secondary">Annual Savings vs Investment</span>
                    <span className="text-amber font-display font-medium">
                      {Math.round((results.annualSavings / results.netCost) * 100)}% return/year
                    </span>
                  </div>
                  <div className="h-4 rounded-full bg-background overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((results.annualSavings / results.netCost) * 100 * 3, 100)}%` }}
                      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-amber to-orange"
                    />
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-4">
                  <Button href="/quote" size="lg">
                    Get Exact Quote for {results.systemSize}kW
                    <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </Button>
                  <Button href="/contact" variant="secondary" size="lg">
                    Talk to an Expert
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
