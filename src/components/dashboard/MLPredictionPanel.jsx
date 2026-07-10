import {
  TrendingUp,
  TrendingDown,
  Eye,
} from "lucide-react"

function MLPredictionPanel({ prediction, stock }) {
  if (!prediction) {
    return null
  }

  const {
    prediction: predictionValue,
    confidence,
    direction,
    method,
  } = prediction

  const isPositive = predictionValue > 0.5
  const isBearish = direction === "bearish"
  const isNeutral = direction === "neutral"

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20">
          {isPositive ? (
            <TrendingUp size={20} className="text-cyan-300" />
          ) : (
            <TrendingDown size={20} className="text-rose-300" />
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold">ML prediction</h2>
          <p className="text-sm text-slate-400">Next day trend forecast</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-lg bg-slate-950 p-4">
          <div className="text-sm uppercase tracking-wide text-slate-500">
            Predicted change
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className={`text-3xl font-bold ${
                isPositive ? "text-cyan-300" : "text-rose-300"
              }`}
            >
              {isPositive ? "+" : ""}
              {Math.round(predictionValue * 100) / 100}%
            </span>
            <span className="text-sm text-slate-400">
              {stock?.price ? `($${stock.price})` : ""}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                isBearish
                  ? "bg-rose-400/20 text-rose-200"
                  : isNeutral
                    ? "bg-slate-500/20 text-slate-200"
                    : "bg-cyan-400/20 text-cyan-200"
              }`}
            >
              {direction.charAt(0).toUpperCase() + direction.slice(1)}
            </div>
          </div>
        </article>

        <article className="rounded-lg bg-slate-950 p-4">
          <div className="text-sm uppercase tracking-wide text-slate-500">
            Model confidence
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-cyan-300">{confidence}%</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full ${
                  confidence > 75
                    ? "bg-cyan-500"
                    : confidence > 50
                      ? "bg-amber-500"
                      : "bg-slate-600"
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">
              {confidence > 75
                ? "High confidence"
                : confidence > 50
                  ? "Moderate confidence"
                  : "Low confidence"}
            </p>
          </div>
        </article>
      </div>

      <div className="mt-4 rounded-lg bg-cyan-500/5 p-4">
        <div className="flex items-start gap-3">
          <Eye size={18} className="mt-0.5 shrink-0 text-cyan-300" />
          <div className="text-sm text-slate-300">
            <p>
              <span className="font-semibold">
                {method.split("-").join(" ").charAt(0).toUpperCase() +
                  method.split("-").join(" ").slice(1)}
              </span>{" "}
              model used. Predictions are based on historical price patterns and should not be treated as investment advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MLPredictionPanel
