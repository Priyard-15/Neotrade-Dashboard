import {
  BellRing,
  ShieldAlert,
} from "lucide-react"
import { formatCurrency } from "../../utils/marketMetrics"

function AlertsPanel({
  alertPrice,
  riskProfile,
  stock,
  onAlertPriceChange,
}) {
  const numericAlert = Number(alertPrice)
  const hasAlert = alertPrice !== "" && !Number.isNaN(numericAlert)
  const alertStatus = hasAlert
    ? stock.price >= numericAlert
      ? "Target reached"
      : `${formatCurrency(numericAlert - stock.price, { maximumFractionDigits: 2 })} away`
    : "Set a price target"

  return(
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5 flex items-center gap-3">
        <BellRing size={21} className="text-cyan-200" />

        <h2 className="text-xl font-semibold">
          Smart Alerts
        </h2>
      </div>

      <label className="block">
        <span className="text-sm text-slate-300">
          Alert price for {stock.symbol}
        </span>

        <input
          type="number"
          min="0"
          step="0.01"
          value={alertPrice}
          onChange={(event) => onAlertPriceChange(event.target.value)}
          placeholder={riskProfile.target.toString()}
          className="mt-2 h-12 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
        />
      </label>

      <div className="mt-4 rounded-lg bg-slate-950 p-4">
        <p className="text-sm text-slate-400">
          Alert status
        </p>

        <p className={`mt-2 text-lg font-semibold ${
          hasAlert && stock.price >= numericAlert ? "text-emerald-300" : "text-cyan-100"
        }`}>
          {alertStatus}
        </p>
      </div>

      <div className="mt-3 rounded-lg bg-slate-950 p-4">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <ShieldAlert size={15} />
          Stop-loss idea
        </div>

        <p className="mt-2 text-lg font-semibold">
          {formatCurrency(riskProfile.stopLoss, { maximumFractionDigits: 2 })}
        </p>
      </div>
    </section>
  )
}

export default AlertsPanel
