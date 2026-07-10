import {
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react"

function AnomalyDetectionPanel({ anomalyData, reversalSignals }) {
  if (!anomalyData) {
    return null
  }

  const { anomalies = [], riskScore = 0, hasAnomalies = false } = anomalyData
  const { signals = [], avgConfidence = 0 } = reversalSignals || {}

  const riskLevel =
    riskScore > 75 ? "critical" : riskScore > 50 ? "high" : riskScore > 25 ? "medium" : "low"
  const riskColor =
    riskLevel === "critical"
      ? "text-rose-400 bg-rose-500/10"
      : riskLevel === "high"
        ? "text-orange-400 bg-orange-500/10"
        : riskLevel === "medium"
          ? "text-amber-400 bg-amber-500/10"
          : "text-cyan-400 bg-cyan-500/10"

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        {/* Anomaly Detection */}
        <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-400" />
            <h3 className="font-semibold">Anomaly detection</h3>
          </div>

          {hasAnomalies ? (
            <div>
              <div className="mb-3 space-y-2">
                {anomalies.slice(0, 3).map((anomaly, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg border-l-4 bg-slate-900/50 p-3 text-sm ${
                      anomaly.severity === "high"
                        ? "border-rose-500 text-rose-200"
                        : "border-amber-500 text-amber-200"
                    }`}
                  >
                    <div className="font-medium capitalize">{anomaly.type.replaceAll("-", " ")}</div>
                    <div className="mt-1 text-xs opacity-80">{anomaly.description}</div>
                    <div className="mt-1 text-xs font-semibold">{anomaly.value}</div>
                  </div>
                ))}
              </div>
              {anomalies.length > 3 && (
                <p className="text-xs text-slate-500">+{anomalies.length - 3} more detected</p>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <CheckCircle2 size={16} className="text-cyan-400" />
              <span>No anomalies detected</span>
            </div>
          )}

          <div className="mt-4 rounded-lg bg-slate-950/50 p-3">
            <div className="text-xs uppercase tracking-wide text-slate-500">Risk score</div>
            <div className="mt-2 flex items-center gap-3">
              <div className={`rounded-lg px-3 py-2 font-semibold ${riskColor}`}>
                {riskScore}%
              </div>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full ${
                    riskLevel === "critical"
                      ? "bg-rose-500"
                      : riskLevel === "high"
                        ? "bg-orange-500"
                        : riskLevel === "medium"
                          ? "bg-amber-500"
                          : "bg-cyan-500"
                  }`}
                  style={{ width: `${riskScore}%` }}
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-400">Risk level: {riskLevel}</p>
          </div>
        </div>

        {/* Reversal Signals */}
        <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Zap size={18} className="text-cyan-400" />
            <h3 className="font-semibold">Reversal signals</h3>
          </div>

          {signals.length > 0 ? (
            <div>
              <div className="mb-3 space-y-2">
                {signals.slice(0, 3).map((signal, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg border-l-4 bg-slate-900/50 p-3 text-sm ${
                      signal.bullish
                        ? "border-cyan-500 text-cyan-200"
                        : "border-rose-500 text-rose-200"
                    }`}
                  >
                    <div className="font-medium capitalize">
                      {signal.pattern.replaceAll("-", " ")}
                    </div>
                    <div className="mt-1 text-xs opacity-80">{signal.description}</div>
                    <div className="mt-2 inline-flex rounded-full bg-black/30 px-2 py-1 text-xs font-semibold">
                      {signal.confidence}% confidence
                    </div>
                  </div>
                ))}
              </div>
              {signals.length > 3 && (
                <p className="text-xs text-slate-500">+{signals.length - 3} more signals</p>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <CheckCircle2 size={16} className="text-cyan-400" />
              <span>No signals detected</span>
            </div>
          )}

          <div className="mt-4 rounded-lg bg-slate-950/50 p-3">
            <div className="text-xs uppercase tracking-wide text-slate-500">Signal confidence</div>
            <div className="mt-2 flex items-center gap-3">
              <div className="rounded-lg bg-cyan-500/20 px-3 py-2 font-semibold text-cyan-300">
                {avgConfidence}%
              </div>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-cyan-500"
                  style={{ width: `${avgConfidence}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-slate-950 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-slate-400" />
          <div className="text-sm text-slate-400">
            <p>
              Anomalies and reversal signals are detected using statistical models and price patterns. Use these alerts
              alongside fundamental analysis and your risk tolerance. Not financial advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnomalyDetectionPanel
