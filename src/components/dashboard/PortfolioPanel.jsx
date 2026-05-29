import {
  BriefcaseBusiness,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import { formatCurrency } from "../../utils/marketMetrics"

function PortfolioPanel({ stocks }) {
  return(
    <section id="portfolio" className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5 flex items-center gap-3">
        <BriefcaseBusiness size={21} className="text-cyan-200" />

        <h2 className="text-xl font-semibold">
          Portfolio / Watchlist
        </h2>
      </div>

      <div className="space-y-3">
        {
          stocks.map((stock) => (
            <div
              key={stock.symbol}
              className="flex items-center justify-between rounded-lg bg-slate-950 p-4"
            >
              <div>
                <p className="font-semibold">
                  {stock.symbol}
                </p>

                <p className="text-sm text-slate-400">
                  {stock.holdings} shares
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  {formatCurrency(stock.price * stock.holdings)}
                </p>

                <p className={`flex items-center justify-end gap-1 text-sm ${
                  stock.change >= 0 ? "text-emerald-300" : "text-rose-300"
                }`}>
                  {stock.change >= 0 ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
                  {stock.change >= 0 ? "+" : ""}{stock.change}%
                </p>
              </div>
            </div>
          ))
        }

        {
          stocks.length === 0 && (
            <p className="rounded-lg bg-slate-950 p-4 text-slate-400">
              Add stocks with the star button to build your watchlist.
            </p>
          )
        }
      </div>
    </section>
  )
}

export default PortfolioPanel
