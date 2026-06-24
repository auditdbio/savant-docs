"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Dropdown } from "@/components/ui/Dropdown";
import { PRICING_PLANS, HUMAN_AUDIT_RATE, SPEED_ADVANTAGE } from "@/config/pricing";

export function PricingCalculator() {
  const [linesOfCode, setLinesOfCode] = useState(1000);
  const [selectedPlan, setSelectedPlan] = useState("advanced");

  const plan = PRICING_PLANS.find((p) => p.id === selectedPlan);
  const savantRaw = linesOfCode * (plan?.price ?? 0);
  const savantCost = Math.round(savantRaw);
  const humanCost = linesOfCode * HUMAN_AUDIT_RATE;
  const savings = Math.round(humanCost - savantRaw);
  const multiplier = savantRaw > 0 ? Math.round(humanCost / savantRaw) : 0;

  return (
    <Card variant="elevated" className="mx-auto max-w-4xl">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-text-strong">Cost calculator</h2>
        <p className="mt-1 text-sm text-text-muted">Compare costs and see your savings</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Lines of code (cloc)"
          type="number"
          min={1}
          value={linesOfCode}
          onChange={(e) => setLinesOfCode(Math.max(1, parseInt(e.target.value) || 1))}
          placeholder="1000"
        />
        <Dropdown
          label="SavantChat plan"
          value={selectedPlan}
          onChange={setSelectedPlan}
          options={PRICING_PLANS.map((p) => ({ value: p.id, label: `${p.name} — $${p.price}/line` }))}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 rounded-lg border border-flame-200 bg-flame-50 p-5 text-center sm:grid-cols-3">
        <div>
          <div className="text-md text-text-muted">SavantChat</div>
          <div className="text-2xl font-bold text-flame-600">
            {savantCost < 1 ? "<$1" : `$${savantCost.toLocaleString()}`}
          </div>
        </div>
        <div>
          <div className="text-md text-text-muted">Human audit</div>
          <div className="text-lg font-bold text-text-strong">${humanCost.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-md text-text-muted">You save</div>
          <div className="text-xl font-bold text-flame-600">${savings.toLocaleString()}</div>
          <div className="text-xs text-flame-700">
            ({multiplier}x cheaper + {SPEED_ADVANTAGE}x faster)
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-text-subtle">
        * Approximate pricing based on lines of code. Final pricing calculated by token count.
      </p>
    </Card>
  );
}

export default PricingCalculator;
