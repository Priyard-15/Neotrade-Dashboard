import {
  Activity,
  BrainCircuit,
  BriefcaseBusiness,
  TrendingUp,
} from "lucide-react"
import { formatCurrency } from "../../utils/marketMetrics"

function StatCard({
  icon: Icon,
  label,
  value,
  tone = "text-white",
}) {
  return(
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-400">
          {label}
        </p>

        <Icon size={18} className="text-cyan-200" />
      </div>

      <p className={`mt-2 text-2xl font-bold ${tone}`}>
        {value}
      </p>
    </div>
  )
}

function StatGrid({
  marketMood,
  portfolioValue,
  prediction,
  predictionTone,
  stockCount,
  watchlistCount,
}) {
  return(
    <section className="grid gap-4 py-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        icon={BriefcaseBusiness}
        label="Portfolio value"
        value={formatCurrency(portfolioValue)}
      />

      <StatCard
        icon={Activity}
        label="Stocks tracked"
        value={`${watchlistCount}/${stockCount}`}
      />

      <StatCard
        icon={TrendingUp}
        label="Market mood"
        value={`${marketMood.positiveCount}/${stockCount} positive`}
        tone={marketMood.averageChange >= 0 ? "text-emerald-300" : "text-rose-300"}
      />

      <StatCard
        icon={BrainCircuit}
        label="Active prediction"
        value={prediction}
        tone={predictionTone}
      />
    </section>
  )
}

export default StatGrid
