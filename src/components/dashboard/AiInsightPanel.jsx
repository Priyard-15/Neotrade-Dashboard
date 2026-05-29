import {
  BrainCircuit,
  Gauge,
  Target,
} from "lucide-react"
import { formatCurrency } from "../../utils/marketMetrics"

function AiInsightPanel({
  prediction,
  predictionTone,
  riskProfile,
  stock,
}) {
  return(
    <section id="ai-prediction" className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center gap-3">
        <span className="rounded-lg bg-cyan-300/10 p-3 text-cyan-200">
          <BrainCircuit size={21} />
        </span>

        <div>
          <p className="text-sm text-slate-400">
            AI prediction
          </p>

          <h2 className={`text-2xl font-semibold ${predictionTone}`}>
            {prediction}
          </h2>
        </div>
      </div>

      <p className="mt-5 leading-7 text-slate-300">
        {stock.symbol} is classified from weekly movement, current change, AI score, and volatility. Use the signal as a dashboard insight, not financial advice.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-950 p-4">
          <p className="text-sm text-slate-400">
            Market cap
          </p>

          <p className="mt-2 text-lg font-semibold">
            {stock.marketCap}
          </p>
        </div>

        <div className="rounded-lg bg-slate-950 p-4">
          <p className="text-sm text-slate-400">
            Volume
          </p>

          <p className="mt-2 text-lg font-semibold">
            {stock.volume}
          </p>
        </div>

        <div className="rounded-lg bg-slate-950 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Gauge size={15} />
            Risk
          </div>

          <p className="mt-2 text-lg font-semibold">
            {riskProfile.level} ({riskProfile.volatility}%)
          </p>
        </div>

        <div className="rounded-lg bg-slate-950 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Target size={15} />
            Target
          </div>

          <p className="mt-2 text-lg font-semibold">
            {formatCurrency(riskProfile.target, { maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default AiInsightPanel
