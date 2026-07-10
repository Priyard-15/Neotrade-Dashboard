import {
  BarChart3,
  CheckCircle2,
  Gauge,
  Target,
} from "lucide-react"
import { formatCurrency } from "../../utils/marketMetrics"

function BacktestPanel({ metrics }) {
  return(
    <section id="backtesting" className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5 flex items-center gap-3">
        <BarChart3 size={21} className="text-cyan-200" />

        <h2 className="text-xl font-semibold">
          Backtesting + Accuracy
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-950 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <CheckCircle2 size={15} />
            Signal accuracy
          </div>

          <p className="mt-2 text-2xl font-bold text-emerald-300">
            {metrics.accuracy}%
          </p>

          <p className="mt-1 text-sm text-slate-400">
            {metrics.winningDays}/{metrics.totalSignals} winning sessions
          </p>
        </div>

        <div className="rounded-lg bg-slate-950 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Gauge size={15} />
            Recent return
          </div>

          <p className={`mt-2 text-2xl font-bold ${metrics.returnPercent >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
            {metrics.returnPercent >= 0 ? "+" : ""}{metrics.returnPercent}%
          </p>
        </div>

        <div className="rounded-lg bg-slate-950 p-4">
          <p className="text-sm text-slate-400">
            AI-weighted strategy
          </p>

          <p className="mt-2 text-lg font-semibold">
            {formatCurrency(metrics.strategyValue)}
          </p>
        </div>

        <div className="rounded-lg bg-slate-950 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Target size={15} />
            Benchmark value
          </div>

          <p className="mt-2 text-lg font-semibold">
            {formatCurrency(metrics.buyAndHoldValue)}
          </p>
        </div>
      </div>

      <p className="mt-4 rounded-lg bg-cyan-300/10 p-4 text-sm font-semibold text-cyan-100">
        {metrics.signal}
      </p>
    </section>
  )
}

export default BacktestPanel
