import {
  GitCompareArrows,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import { formatCurrency } from "../../utils/marketMetrics"

function ComparePanel({
  compareSymbol,
  selectedStock,
  stocks,
  onCompareSymbolChange,
}) {
  const compareStock = stocks.find((stock) => stock.symbol === compareSymbol) || stocks[0]
  const priceGap = selectedStock.price - compareStock.price
  const scoreGap = selectedStock.aiScore - compareStock.aiScore
  const changeGap = Number((selectedStock.change - compareStock.change).toFixed(2))

  return(
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <GitCompareArrows size={21} className="text-cyan-200" />

          <h2 className="text-xl font-semibold">
            Stock Compare
          </h2>
        </div>

        <select
          value={compareSymbol}
          onChange={(event) => onCompareSymbolChange(event.target.value)}
          className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none transition focus:border-cyan-300"
        >
          {
            stocks.map((stock) => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.symbol}
              </option>
            ))
          }
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-slate-950 p-4">
          <p className="text-sm text-slate-400">
            Price gap
          </p>

          <p className="mt-2 text-lg font-semibold">
            {formatCurrency(Math.abs(priceGap), { maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="rounded-lg bg-slate-950 p-4">
          <p className="text-sm text-slate-400">
            AI score gap
          </p>

          <p className={scoreGap >= 0 ? "mt-2 text-lg font-semibold text-emerald-300" : "mt-2 text-lg font-semibold text-rose-300"}>
            {scoreGap >= 0 ? "+" : ""}{scoreGap}
          </p>
        </div>

        <div className="rounded-lg bg-slate-950 p-4">
          <p className="text-sm text-slate-400">
            Change gap
          </p>

          <p className={`mt-2 flex items-center gap-1 text-lg font-semibold ${
            changeGap >= 0 ? "text-emerald-300" : "text-rose-300"
          }`}>
            {changeGap >= 0 ? <TrendingUp size={17} /> : <TrendingDown size={17} />}
            {changeGap >= 0 ? "+" : ""}{changeGap}%
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-400">
        Comparing {selectedStock.symbol} against {compareStock.symbol} using price, AI score, and current change.
      </p>
    </section>
  )
}

export default ComparePanel
