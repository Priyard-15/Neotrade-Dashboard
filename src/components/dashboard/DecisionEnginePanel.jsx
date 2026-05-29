import {
  BadgeCheck,
  LineChart,
  ListChecks,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react"

function MetricTile({
  icon: Icon,
  label,
  value,
  tone = "text-white",
}) {
  return(
    <div className="rounded-lg bg-slate-950 p-4">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Icon size={15} />
        {label}
      </div>

      <p className={`mt-2 text-lg font-semibold ${tone}`}>
        {value}
      </p>
    </div>
  )
}

function DecisionEnginePanel({
  portfolioDiagnostics,
  technicalSignal,
}) {
  const actionTone = technicalSignal.action === "Accumulate"
    ? "text-emerald-300"
    : technicalSignal.action === "Protect capital"
      ? "text-rose-300"
      : "text-amber-200"

  return(
    <section id="decision-engine" className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-cyan-300/10 p-3 text-cyan-200">
            <SlidersHorizontal size={21} />
          </span>

          <div>
            <p className="text-sm text-slate-400">
              Explainable decision engine
            </p>

            <h2 className={`text-2xl font-semibold ${actionTone}`}>
              {technicalSignal.action}
            </h2>
          </div>
        </div>

        <span className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-cyan-100">
          {technicalSignal.confidence}% confidence
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricTile
          icon={LineChart}
          label="Momentum"
          value={`${technicalSignal.momentum >= 0 ? "+" : ""}${technicalSignal.momentum}%`}
          tone={technicalSignal.momentum >= 0 ? "text-emerald-300" : "text-rose-300"}
        />

        <MetricTile
          icon={BadgeCheck}
          label="RS strength"
          value={technicalSignal.relativeStrength}
        />

        <MetricTile
          icon={ShieldCheck}
          label="Portfolio health"
          value={`${portfolioDiagnostics.diversificationScore}/100`}
          tone={portfolioDiagnostics.diversificationScore >= 70 ? "text-emerald-300" : "text-amber-200"}
        />

        <MetricTile
          icon={ListChecks}
          label="Concentration"
          value={portfolioDiagnostics.concentrationRisk}
          tone={portfolioDiagnostics.concentrationRisk === "High" ? "text-rose-300" : "text-cyan-100"}
        />
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg bg-slate-950 p-4">
          <p className="text-sm text-slate-400">
            Weighted AI score
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {portfolioDiagnostics.weightedAiScore || "--"}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Combines watchlist exposure with each stock score so the portfolio can be judged as a system.
          </p>
        </div>

        <div className="rounded-lg bg-slate-950 p-4">
          <p className="text-sm font-semibold text-slate-200">
            Rebalance playbook
          </p>

          <div className="mt-3 space-y-3">
            {
              portfolioDiagnostics.rebalanceActions.map((action) => (
                <div key={action} className="flex gap-3 text-sm leading-6 text-slate-300">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                  <p>{action}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default DecisionEnginePanel
