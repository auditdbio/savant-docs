import React, { useState } from 'react';
import { PRICING_PLANS, HUMAN_AUDIT_RATE, SPEED_ADVANTAGE } from '../../config/pricing';

export default function PricingCalculator() {
  const [linesOfCode, setLinesOfCode] = useState(1000);
  const [selectedPlan, setSelectedPlan] = useState('advanced');

  const selectedPlanData = PRICING_PLANS.find(plan => plan.id === selectedPlan);
  const savantChatCostRaw = linesOfCode * (selectedPlanData?.price || 0);
  const savantChatCost = Math.round(savantChatCostRaw);
  const humanAuditCost = linesOfCode * HUMAN_AUDIT_RATE;
  const savings = Math.round(humanAuditCost - savantChatCostRaw);
  const costMultiplier = Math.round(humanAuditCost / savantChatCostRaw);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Cost Calculator</h2>
          <p className="text-sm text-gray-600">Compare costs and see your savings</p>
        </div>

        <div className="space-y-6">
          {/* Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lines-of-code" className="block text-sm font-medium text-gray-700 mb-2">
                Lines of Code (<a href="https://github.com/AlDanial/cloc" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline">cloc</a>)
              </label>
              <input
                type="number"
                id="lines-of-code"
                min="1"
                value={linesOfCode}
                onChange={(e) => setLinesOfCode(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="1000"
              />
            </div>

            <div>
              <label htmlFor="plan-select" className="block text-sm font-medium text-gray-700 mb-2">
                SavantChat Plan
              </label>
              <select
                id="plan-select"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {PRICING_PLANS.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - ${plan.price}/line
                  </option>
                ))}
              </select>
            </div>
          </div>

                     {/* Results */}
           <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
               <div>
                 <div className="text-lg text-gray-600">SavantChat</div>
                 <div className="text-2xl font-bold text-primary">
                   {savantChatCost < 1 ? '<$1' : `$${savantChatCost.toLocaleString()}`}
                 </div>
               </div>
               <div>
                 <div className="text-lg text-gray-600">Human Audit</div>
                 <div className="text-lg font-bold text-gray-900">${humanAuditCost.toLocaleString()}</div>
               </div>
               <div>
                 <div className="text-lg text-gray-600">You Save</div>
                 <div className="text-xl font-bold text-green-600">${savings.toLocaleString()}</div>
                 <div className="text-xs text-green-600">({costMultiplier}x cheaper + {SPEED_ADVANTAGE}x faster)</div>
               </div>
             </div>
           </div>

          <div className="text-xs text-gray-500 text-center">
            * Approximate pricing based on lines of code. Final pricing calculated by token count.
          </div>
        </div>
      </div>
    </div>
  );
} 