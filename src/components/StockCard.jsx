import {
  Plus,
  Star,
  TrendingDown,
  TrendingUp,
} from "lucide-react"

function StockCard({
  stock,
  active,
  saved,
  onSelect,
  onToggleWatchlist,
}){
  const isPositive = stock.change >= 0

  return(
    <article
      className={`group rounded-lg border p-5 text-left transition ${
        active
          ? "border-cyan-300 bg-slate-800"
          : "border-slate-800 bg-slate-900 hover:border-slate-600"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">
            {stock.symbol}
          </p>

          <h2 className="mt-1 text-xl font-semibold text-white">
            {stock.name}
          </h2>
        </div>

        <span className={`rounded-full p-2 ${
          isPositive ? "bg-emerald-400/10 text-emerald-300" : "bg-rose-400/10 text-rose-300"
        }`}>
          {isPositive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
        </span>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-2xl font-bold text-white">
            ${stock.price.toFixed(2)}
          </p>

          <p className={`mt-1 text-sm font-medium ${
            isPositive ? "text-emerald-300" : "text-rose-300"
          }`}>
            {isPositive ? "+" : ""}{stock.change}% today
          </p>
        </div>

        <span className="text-right text-sm text-slate-400">
          {stock.sector}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
        <span className="text-sm text-slate-400">
          AI score {stock.aiScore}
        </span>

        <button
          type="button"
          onClick={() => onToggleWatchlist(stock.symbol)}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition ${
            saved
              ? "border-amber-300 bg-amber-300/10 text-amber-200"
              : "border-slate-700 text-slate-300 hover:border-cyan-300 hover:text-cyan-200"
          }`}
          title={saved ? "Remove from watchlist" : "Add to watchlist"}
        >
          {saved ? <Star size={17} fill="currentColor" /> : <Plus size={17} />}
        </button>
      </div>

      <button
        type="button"
        onClick={() => onSelect(stock)}
        className="mt-4 h-10 w-full rounded-lg border border-slate-700 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
      >
        Analyze
      </button>
    </article>
  )
}

export default StockCard
