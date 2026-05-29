import {
  ArrowDownUp,
  Search,
} from "lucide-react"

function StockFilters({
  activeSector,
  query,
  sectors,
  sortMode,
  onQueryChange,
  onSectorChange,
  onSortModeChange,
}) {
  return(
    <section id="search" className="mb-6 space-y-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
        <label className="relative block">
          <Search
            size={19}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search by stock name, symbol, or sector"
            className="h-13 w-full rounded-lg border border-slate-800 bg-slate-900 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
          />
        </label>

        <label className="relative block">
          <ArrowDownUp
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={sortMode}
            onChange={(event) => onSortModeChange(event.target.value)}
            className="h-13 w-full appearance-none rounded-lg border border-slate-800 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none transition focus:border-cyan-300"
          >
            <option value="aiScore">Sort by AI score</option>
            <option value="change">Sort by daily change</option>
            <option value="price">Sort by price</option>
            <option value="symbol">Sort by symbol</option>
          </select>
        </label>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {
          sectors.map((sector) => (
            <button
              key={sector}
              type="button"
              onClick={() => onSectorChange(sector)}
              className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                activeSector === sector
                  ? "border-cyan-300 bg-cyan-300 text-slate-950"
                  : "border-slate-800 bg-slate-900 text-slate-300 hover:border-cyan-300 hover:text-cyan-200"
              }`}
            >
              {sector}
            </button>
          ))
        }
      </div>
    </section>
  )
}

export default StockFilters
